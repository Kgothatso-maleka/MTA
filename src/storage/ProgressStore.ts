import { z } from 'zod';

const answers = z.record(z.string(), z.array(z.string()));
const sectionScore = z.object({ correct: z.number(), total: z.number(), percent: z.number() });

export const quizAttemptSchema = z.object({
  courseId: z.string(),
  moduleId: z.string(),
  seed: z.number(),
  answers,
  correct: z.number(),
  total: z.number(),
  takenAt: z.number(),
});

export const mockAttemptSchema = z.object({
  courseId: z.string(),
  seed: z.number(),
  questionIds: z.array(z.string()),
  answers,
  percent: z.number(),
  passed: z.boolean(),
  partial: z.boolean(),
  bySection: z.record(z.string(), sectionScore),
  takenAt: z.number(),
});

export const inProgressMockSchema = z.object({
  courseId: z.string(),
  seed: z.number(),
  questionIds: z.array(z.string()),
  answers,
  flagged: z.array(z.string()),
  deadlineMs: z.number(),
});

export const progressSchema = z.object({
  version: z.literal(1),
  completedModules: z.record(z.string(), z.array(z.string())),
  quizAttempts: z.array(quizAttemptSchema),
  mockAttempts: z.array(mockAttemptSchema),
  inProgressMock: inProgressMockSchema.nullable(),
});

export type QuizAttempt = z.infer<typeof quizAttemptSchema>;
export type MockAttempt = z.infer<typeof mockAttemptSchema>;
export type InProgressMock = z.infer<typeof inProgressMockSchema>;
export type Progress = z.infer<typeof progressSchema>;

export const emptyProgress = (): Progress => ({
  version: 1,
  completedModules: {},
  quizAttempts: [],
  mockAttempts: [],
  inProgressMock: null,
});

/** All methods are async so a remote implementation can replace the local one without UI changes. */
export interface ProgressStore {
  getProgress(): Promise<Progress>;
  markLessonComplete(courseId: string, moduleId: string): Promise<void>;
  saveQuizAttempt(a: QuizAttempt): Promise<void>;
  saveMockAttempt(a: MockAttempt): Promise<void>;
  saveInProgressMock(m: InProgressMock | null): Promise<void>;
  exportAll(): Promise<string>;
  importAll(json: string): Promise<void>;
  /** false when running from memory because storage is unavailable */
  readonly persistent: boolean;
  /** Optional: notified when `persistent` changes. Returns an unsubscribe function. */
  subscribe?(listener: () => void): () => void;
}
