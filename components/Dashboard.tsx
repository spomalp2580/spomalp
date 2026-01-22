
import React from 'react';
import { Module } from '../types';

interface DashboardProps {
  onSelectModule: (m: Module) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onSelectModule }) => {
  const modules: Module[] = [
    { id: '1', title: 'Fundamentos de Mecánica Fluidos', description: 'Revisión de leyes de Pascal y Bernoulli.', progress: 75 },
    { id: '2', title: 'Termodinámica Aplicada', description: 'Ciclos de potencia y refrigeración.', progress: 30 },
    { id: '3', title: 'Sistemas Hidráulicos', description: 'Evaluación procedimental de bombas.', progress: 0 },
  ];

  return (
    <div className="p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Panel del Estudiante</h1>
        <p className="text-slate-500">Bienvenido de nuevo. Edunova está lista para ayudarte hoy.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelectModule(m)}>
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">{m.progress}%</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{m.title}</h3>
            <p className="text-sm text-slate-500 mb-4">{m.description}</p>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-600 h-full" style={{ width: `${m.progress}%` }}></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between shadow-lg">
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold mb-2">Refuerza tu aprendizaje con Edunova</h2>
          <p className="text-blue-100">Activa el asistente de voz en cualquier momento para resolver dudas conceptuales o practicar procedimientos.</p>
        </div>
        <div className="flex -space-x-4">
           <img src="https://picsum.photos/seed/edu1/100/100" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Student" />
           <img src="https://picsum.photos/seed/edu2/100/100" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Student" />
           <img src="https://picsum.photos/seed/edu3/100/100" className="w-12 h-12 rounded-full border-2 border-white shadow-sm" alt="Student" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
