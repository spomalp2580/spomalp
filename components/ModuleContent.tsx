
import React, { useState } from 'react';
import { Module, AppView } from '../types';

interface ModuleContentProps {
  module: Module;
  onBack: () => void;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module, onBack }) => {
  const [activeTab, setActiveTab] = useState<AppView>(AppView.CONCEPTUAL);

  return (
    <div className="p-6">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors mb-6">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Volver al Panel
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">{module.title}</h1>
          <p className="text-slate-500 mb-8">{module.description}</p>

          <nav className="flex gap-4 border-b border-slate-200 mb-8">
            <button
              onClick={() => setActiveTab(AppView.CONCEPTUAL)}
              className={`pb-4 px-2 font-medium transition-colors border-b-2 ${activeTab === AppView.CONCEPTUAL ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Fundamentos
            </button>
            <button
              onClick={() => setActiveTab(AppView.PROCEDURAL)}
              className={`pb-4 px-2 font-medium transition-colors border-b-2 ${activeTab === AppView.PROCEDURAL ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Evaluación Procedimental
            </button>
            <button
              onClick={() => setActiveTab(AppView.REPORT)}
              className={`pb-4 px-2 font-medium transition-colors border-b-2 ${activeTab === AppView.REPORT ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
            >
              Informe Final
            </button>
          </nav>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 min-h-[400px]">
            {activeTab === AppView.CONCEPTUAL && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800">Refuerzo Conceptual</h2>
                <div className="prose prose-slate max-w-none">
                  <p>En este apartado revisamos los conceptos básicos. Activa a Edunova para discutir puntos específicos o para que te haga un examen rápido de fundamentos.</p>
                  <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-600">
                    <li>Definición de variables clave.</li>
                    <li>Leyes físicas involucradas.</li>
                    <li>Modelado matemático del fenómeno.</li>
                  </ul>
                </div>
                <div className="mt-8 p-4 bg-yellow-50 border border-yellow-100 rounded-xl flex items-start gap-3">
                  <svg className="w-6 h-6 text-yellow-600 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-sm text-yellow-800"><strong>Tip de Edunova:</strong> "No te limites a leer, pregúntame por ejemplos prácticos de la vida real en Ecuador para entender mejor Bernoulli".</p>
                </div>
              </div>
            )}

            {activeTab === AppView.PROCEDURAL && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800">Evaluación de Procedimientos</h2>
                <p className="text-slate-600 italic">Sigue los pasos de la simulación. Edunova te corregirá si cometes errores en el orden de las operaciones.</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                    <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">1</span>
                    <span className="flex-1 text-slate-700">Calibración de instrumentos de medición.</span>
                    <button className="text-blue-600 font-bold text-sm">Iniciar</button>
                  </div>
                  <div className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors opacity-50">
                    <span className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">2</span>
                    <span className="flex-1 text-slate-700">Registro de datos en tiempo real.</span>
                    <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                  </div>
                </div>
              </div>
            )}

            {activeTab === AppView.REPORT && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-800">Carga de Informe Final</h2>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  </div>
                  <p className="text-slate-600 font-medium">Arrastra tu PDF aquí o haz clic para subir</p>
                  <p className="text-slate-400 text-sm mt-2">Máximo 20MB (.pdf, .docx)</p>
                  <input type="file" className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-xl font-medium cursor-pointer hover:bg-blue-700 transition-colors">
                    Seleccionar Archivo
                  </label>
                </div>

                <div className="p-4 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-blue-600 shadow-sm font-bold">E</div>
                  <div className="flex-1">
                    <p className="text-sm text-blue-900 font-medium">Revisión de Edunova disponible</p>
                    <p className="text-xs text-blue-700">"Pásame el borrador por aquí antes de subirlo y te daré mis comentarios sobre el formato APA y la redacción."</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <aside className="w-full lg:w-80 space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Checklist del Módulo
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" checked readOnly className="rounded text-blue-600" />
                <span>Lectura de conceptos clave</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" checked readOnly className="rounded text-blue-600" />
                <span>Video de introducción</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>Quiz de fundamentos</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>Práctica simulada</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" className="rounded text-blue-600" />
                <span>Envío de informe final</span>
              </li>
            </ul>
          </div>

          <div className="bg-indigo-900 p-6 rounded-2xl shadow-lg text-white">
            <h3 className="font-bold mb-2">Estado del Alumno</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold">14</span>
              <span className="text-indigo-300 text-sm">/ 20 promedio</span>
            </div>
            <p className="text-xs text-indigo-200">¡Puedes mejorar! Edunova sugiere practicar más la Parte II del procedimiento.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ModuleContent;
