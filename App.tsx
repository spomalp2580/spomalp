
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import ModuleContent from './components/ModuleContent';
import VoiceAssistant from './components/VoiceAssistant';
import { Module, TranscriptionItem } from './types';

const App: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [transcription, setTranscription] = useState<TranscriptionItem[]>([]);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Sidebar - Desktop Only */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-white flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold italic">E</div>
            <span className="text-xl font-bold tracking-tight">EducaAI</span>
          </div>
          
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-slate-800 text-white rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
              Panel Principal
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              Mis Cursos
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              Calendario
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Configuración
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-800">
           <div className="flex items-center gap-3">
              <img src="https://picsum.photos/seed/user123/40/40" className="w-10 h-10 rounded-full border border-slate-700" alt="Avatar" />
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">Juan Pérez</p>
                <p className="text-xs text-slate-500 truncate">Estudiante Ingeniería</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col bg-slate-50">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <div className="flex items-center gap-2 lg:hidden">
             <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold italic text-white">E</div>
             <span className="font-bold">EducaAI</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
              <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </div>
            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
            <span className="hidden sm:block text-sm font-medium text-slate-700">UCE - Ecuador</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          {selectedModule ? (
            <ModuleContent module={selectedModule} onBack={() => setSelectedModule(null)} />
          ) : (
            <Dashboard onSelectModule={(m) => setSelectedModule(m)} />
          )}
        </div>
      </main>

      {/* Persistent Voice Assistant */}
      <VoiceAssistant 
        currentModuleTitle={selectedModule?.title || "Aprendizaje General"} 
        onTranscriptionUpdate={(history) => setTranscription(history)}
      />
    </div>
  );
};

export default App;
