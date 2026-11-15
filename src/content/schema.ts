import { z } from 'zod';

export const optionSchema = z.object({ id: z.string().min(1), text: z.string().min(1) });

export const questionSchema = z.object({
  id: z.string().min(1),
  moduleId: z.string().min(1),
  examSection: z.string().min(1),
  objective: z.string(),
  type: z.enum(['single', 'multi']),
  stem: z.string().min(1),
  options: z.array(optionSchema),
  correct: z.array(z.string()),
  explanation: z.string(),
  difficulty: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  tags: z.array(z.string()),
});

export const examConfigSchema = z.object({
  guideVersion: z.string(),
  questionCount: z.number().int().positive(),
  timeLimitMinutes: z.number().positive(),
  passPercent: z.number(),
  readyMarginPoints: z.number(),
  sections: z.array(z.object({ id: z.string(), name: z.string(), weight: z.number() })),
});

export const courseSchema = z.object({
  id: z.string(),
  name: z.string(),
  exam: examConfigSchema,
  moduleIds: z.array(z.string()),
});

export const lessonFrontmatterSchema = z.object({
  title: z.string(),
  examSection: z.string(),
  objectives: z.array(z.string()).default([]),
  youtubeId: z.string().nullable().default(null),
  estMinutes: z.number().default(30),
  prerequisites: z.array(z.string()).default([]),
});

export const exerciseFrontmatterSchema = z.object({
  youtubeId: z.string().nullable().default(null),
  startSeconds: z.number().optional(),
});
