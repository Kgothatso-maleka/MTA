export type QuestionType = 'single' | 'multi';

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  moduleId: string;
  examSection: string;
  objective: string;
  type: QuestionType;
  stem: string;
  options: Option[];
  correct: string[];
  explanation: string;
  difficulty: 1 | 2 | 3;
  tags: string[];
}

export interface ExamSection {
  id: string;
  name: string;
  weight: number;
}

export interface ExamConfig {
  guideVersion: string;
  questionCount: number;
  timeLimitMinutes: number;
  passPercent: number;
  readyMarginPoints: number;
  sections: ExamSection[];
}

export interface ModuleMeta {
  id: string;
  title: string;
  examSection: string;
  objectives: string[];
  youtubeId: string | null;
  estMinutes: number;
  prerequisites: string[];
}

export interface Course {
  id: string;
  name: string;
  exam: ExamConfig;
  moduleIds: string[];
}
