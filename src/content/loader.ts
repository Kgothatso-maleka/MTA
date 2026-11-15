import fm from 'front-matter';
import type { Course, ModuleMeta, Question } from '../types';
import { courseSchema, exerciseFrontmatterSchema, lessonFrontmatterSchema, questionSchema } from './schema';

const files = import.meta.glob('/content/**/*.{md,json}', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const COURSE_RE = /^\/content\/courses\/([^/]+)\/course\.json$/;

export function listCourses(): Course[] {
  return Object.keys(files)
    .map((p) => COURSE_RE.exec(p)?.[1])
    .filter((id): id is string => Boolean(id))
    .sort()
    .map((id) => loadCourse(id));
}

export function loadCourse(courseId: string): Course {
  const raw = files[`/content/courses/${courseId}/course.json`];
  if (!raw) throw new Error(`Unknown course: ${courseId}`);
  return courseSchema.parse(JSON.parse(raw));
}

export interface LoadedModule {
  meta: ModuleMeta;
  lesson: string;
  exercise: string | null;
  exerciseVideo: { youtubeId: string | null; startSeconds?: number };
}

export function loadModule(courseId: string, moduleId: string): LoadedModule {
  const base = `/content/courses/${courseId}/modules/${moduleId}`;
  const lessonRaw = files[`${base}/lesson.md`];
  if (lessonRaw === undefined) throw new Error(`Unknown module: ${courseId}/${moduleId}`);
  const lesson = fm<Record<string, unknown>>(lessonRaw);
  const meta = { id: moduleId, ...lessonFrontmatterSchema.parse(lesson.attributes) } as ModuleMeta;

  const exRaw = files[`${base}/exercise.md`];
  if (exRaw === undefined) {
    return { meta, lesson: lesson.body, exercise: null, exerciseVideo: { youtubeId: null } };
  }
  const ex = fm<Record<string, unknown>>(exRaw);
  const video = exerciseFrontmatterSchema.parse(ex.attributes);
  return { meta, lesson: lesson.body, exercise: ex.body, exerciseVideo: video };
}

export function loadQuestions(courseId: string, moduleId?: string): Question[] {
  const prefix = `/content/courses/${courseId}/questions/`;
  const all = Object.entries(files)
    .filter(([p]) => p.startsWith(prefix) && p.endsWith('.json'))
    .flatMap(([, raw]) => (JSON.parse(raw) as unknown[]).map((q) => questionSchema.parse(q) as Question));
  return moduleId ? all.filter((q) => q.moduleId === moduleId) : all;
}
