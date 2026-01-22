
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CONCEPTUAL = 'CONCEPTUAL',
  PROCEDURAL = 'PROCEDURAL',
  REPORT = 'REPORT'
}

export interface Module {
  id: string;
  title: string;
  description: string;
  progress: number;
}

export interface TranscriptionItem {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
