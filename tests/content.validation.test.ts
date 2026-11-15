import { listCourses, loadModule, loadQuestions } from '../src/content/loader';

const courses = listCourses();

test('at least one course is registered', () => expect(courses.length).toBeGreaterThan(0));

describe.each(courses.map((c) => [c.id, c] as const))('course %s', (_id, course) => {
  const sectionIds = course.exam.sections.map((s) => s.id);

  test('weights sum to 100', () => {
    expect(course.exam.sections.reduce((n, s) => n + s.weight, 0)).toBe(100);
  });

  test('every module has a lesson whose examSection exists in the exam config', () => {
    expect(course.moduleIds.length).toBeGreaterThan(0);
    for (const id of course.moduleIds) {
      const m = loadModule(course.id, id);
      expect(m.meta.id).toBe(id);
      expect(sectionIds).toContain(m.meta.examSection);
      expect(m.lesson.trim().length).toBeGreaterThan(0);
    }
  });

  test('youtube ids, when set, are 11 characters', () => {
    for (const id of course.moduleIds) {
      const { meta, exerciseVideo } = loadModule(course.id, id);
      for (const yt of [meta.youtubeId, exerciseVideo.youtubeId]) {
        if (yt) expect(yt).toMatch(/^[\w-]{11}$/);
      }
    }
  });

  test('every question is well formed', () => {
    const qs = loadQuestions(course.id);
    expect(qs.length).toBeGreaterThan(0);
    const ids = new Set<string>();
    for (const q of qs) {
      expect(ids.has(q.id), `duplicate id ${q.id}`).toBe(false);
      ids.add(q.id);
      expect(sectionIds, q.id).toContain(q.examSection);
      expect(course.moduleIds, q.id).toContain(q.moduleId);
      const optionIds = q.options.map((o) => o.id);
      expect(new Set(optionIds).size, q.id).toBe(optionIds.length);
      expect(q.options.length, q.id).toBeGreaterThanOrEqual(3);
      expect(q.options.length, q.id).toBeLessThanOrEqual(6);
      expect(q.correct.length, q.id).toBeGreaterThan(0);
      for (const c of q.correct) expect(optionIds, q.id).toContain(c);
      if (q.type === 'single') expect(q.correct, q.id).toHaveLength(1);
      else expect(q.correct.length, q.id).toBeGreaterThanOrEqual(2);
      expect(q.explanation.trim().length, q.id).toBeGreaterThan(0);
    }
  });
});
