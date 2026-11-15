import {
  emptyProgress,
  progressSchema,
  type InProgressMock,
  type MockAttempt,
  type Progress,
  type ProgressStore,
  type QuizAttempt,
} from './ProgressStore';

const KEY = 'mta-progress-v1';

/** The only module in the app allowed to touch localStorage. */
export class LocalStorageStore implements ProgressStore {
  private memory: Progress | null = null;
  persistent = true;

  constructor(private readonly storage: Storage | undefined = safeLocalStorage()) {
    if (!storage) this.persistent = false;
  }

  private read(): Progress {
    if (this.memory) return this.memory;
    try {
      const raw = this.storage?.getItem(KEY);
      if (raw) {
        const parsed = progressSchema.safeParse(JSON.parse(raw));
        if (parsed.success) return parsed.data;
      }
    } catch {
      /* corrupt or unavailable: fall through to empty */
    }
    return emptyProgress();
  }

  private write(p: Progress): void {
    this.memory = p;
    if (!this.storage || !this.persistent) return;
    try {
      this.storage.setItem(KEY, JSON.stringify(p));
    } catch {
      this.persistent = false;
    }
  }

  async getProgress(): Promise<Progress> {
    return structuredClone(this.read());
  }

  async markLessonComplete(courseId: string, moduleId: string): Promise<void> {
    const p = this.read();
    const list = p.completedModules[courseId] ?? [];
    if (!list.includes(moduleId)) p.completedModules[courseId] = [...list, moduleId];
    this.write(p);
  }

  async saveQuizAttempt(a: QuizAttempt): Promise<void> {
    const p = this.read();
    this.write({ ...p, quizAttempts: [...p.quizAttempts, a] });
  }

  async saveMockAttempt(a: MockAttempt): Promise<void> {
    const p = this.read();
    this.write({ ...p, mockAttempts: [...p.mockAttempts, a] });
  }

  async saveInProgressMock(m: InProgressMock | null): Promise<void> {
    this.write({ ...this.read(), inProgressMock: m });
  }

  async exportAll(): Promise<string> {
    return JSON.stringify(this.read(), null, 2);
  }

  async importAll(json: string): Promise<void> {
    const parsed = progressSchema.parse(JSON.parse(json)); // throws; existing progress untouched
    this.write(parsed);
  }
}

function safeLocalStorage(): Storage | undefined {
  try {
    return typeof window !== 'undefined' ? window.localStorage : undefined;
  } catch {
    return undefined;
  }
}
