
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { float32ToInt16Blob, decode, decodeAudioData } from '../services/audioUtils';
import { TranscriptionItem } from '../types';

interface VoiceAssistantProps {
  currentModuleTitle: string;
  onTranscriptionUpdate: (history: TranscriptionItem[]) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ currentModuleTitle, onTranscriptionUpdate }) => {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcriptionHistory, setTranscriptionHistory] = useState<TranscriptionItem[]>([]);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<{ input: AudioContext; output: AudioContext } | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  
  const currentInputTextRef = useRef('');
  const currentOutputTextRef = useRef('');

  const stopAssistant = useCallback(() => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.input.close();
      audioContextRef.current.output.close();
      audioContextRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsActive(false);
    setIsConnecting(false);
  }, []);

  const startAssistant = async () => {
    if (isActive || isConnecting) return;

    setIsConnecting(true);
    const apiKey = (process.env.API_KEY as string);
    const ai = new GoogleGenAI({ apiKey });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextRef.current = { input: inputCtx, output: outputCtx };

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } },
          },
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          systemInstruction: `Eres Edunova, una tutora virtual ecuatoriana para una plataforma Moodle.
          Tu voz es cálida, profesional y con un acento ecuatoriano natural.
          Usas expresiones como "¡Qué chévere!", "¿Cómo te va?", "Muy bien, bacán".
          Tu objetivo es ayudar al estudiante con:
          1. Refuerzo de fundamentos conceptuales en el módulo: "${currentModuleTitle}".
          2. Evaluación de fundamentos mediante preguntas y respuestas.
          3. Evaluación procedimental, guiando paso a paso.
          4. Revisión de informes finales.
          Sé siempre alentadora y clara.`
        },
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setIsConnecting(false);
            
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const pcmBlob = float32ToInt16Blob(inputData);
              sessionPromise.then(session => {
                if (session) session.sendRealtimeInput({ media: pcmBlob });
              });
            };
            
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            // Audio processing
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              const { output: ctx } = audioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const buffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = buffer;
              source.connect(ctx.destination);
              source.onended = () => sourcesRef.current.delete(source);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
            }

            // Transcription processing
            if (message.serverContent?.inputTranscription) {
              currentInputTextRef.current += message.serverContent.inputTranscription.text;
            }
            if (message.serverContent?.outputTranscription) {
              currentOutputTextRef.current += message.serverContent.outputTranscription.text;
            }
            
            if (message.serverContent?.turnComplete) {
              const newItems: TranscriptionItem[] = [];
              if (currentInputTextRef.current) {
                newItems.push({ role: 'user', text: currentInputTextRef.current, timestamp: Date.now() });
              }
              if (currentOutputTextRef.current) {
                newItems.push({ role: 'model', text: currentOutputTextRef.current, timestamp: Date.now() + 1 });
              }
              
              if (newItems.length > 0) {
                setTranscriptionHistory(prev => {
                  const updated = [...prev, ...newItems];
                  onTranscriptionUpdate(updated);
                  return updated;
                });
              }
              currentInputTextRef.current = '';
              currentOutputTextRef.current = '';
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error("Gemini Session Error:", e);
            stopAssistant();
          },
          onclose: () => {
            stopAssistant();
          }
        }
      });
      
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error("Microphone access or connection failed:", err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {isActive && (
        <div className="bg-white rounded-2xl shadow-2xl p-4 w-72 max-h-96 overflow-y-auto border border-blue-100 flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-slate-100">
             <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white animate-pulse">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
             </div>
             <span className="font-semibold text-blue-900">Edunova - Tutora Virtual</span>
          </div>
          {transcriptionHistory.length === 0 ? (
            <p className="text-xs text-slate-500 italic">"¡Hola! Soy Edunova. Cuéntame, ¿qué parte del módulo vamos a revisar hoy?"</p>
          ) : (
            transcriptionHistory.slice(-5).map((t, idx) => (
              <div key={idx} className={`text-xs p-2 rounded-lg ${t.role === 'user' ? 'bg-slate-100 text-slate-700 self-end' : 'bg-blue-50 text-blue-700 self-start'}`}>
                <strong>{t.role === 'user' ? 'Tú' : 'Edunova'}:</strong> {t.text}
              </div>
            ))
          )}
        </div>
      )}

      <button
        onClick={isActive ? stopAssistant : startAssistant}
        disabled={isConnecting}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
      >
        {isConnecting ? (
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : isActive ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
        )}
      </button>
    </div>
  );
};

export default VoiceAssistant;
