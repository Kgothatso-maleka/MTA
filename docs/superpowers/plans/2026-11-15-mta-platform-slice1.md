# MTA Learning Platform, Slice 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a browser-only learning platform shell with a quiz and mock-exam engine, a swappable progress store, and 2 fully written Admin modules (about 60 original questions) to prove the learner experience end to end.

**Architecture:** React + Vite static SPA. All course content is data (Markdown lessons, JSON questions, JSON exam config) loaded at build time. Pure TypeScript engine modules (shuffle, scoring, mock builder) hold all exam logic. The UI talks to progress only through an async `ProgressStore` interface, implemented in Slice 1 by `LocalStorageStore`.

**Tech Stack:** React 18, TypeScript, Vite, react-router-dom, Vitest + React Testing Library, zod, front-matter, react-markdown + remark-gfm + remark-directive.

**Spec:** `docs/superpowers/specs/2026-11-15-mta-platform-design.md` (read it together with this plan)

## Global Constraints
- Brand: black and gold; Playfair Display for headings, DM Sans for body. Colour tokens (builder's call, not in spec): `--mta-black: #0B0B0B`, `--mta-gold: #C9A227`, defined once in `src/theme.css`.
- Mobile-first and keyboard accessible.
- All course content is data under `content/`, never hard-coded in components.
- No code outside `src/storage/LocalStorageStore.ts` may touch `localStorage`.
- `ProgressStore` methods are all async, so a remote store can replace the local one without UI changes.
- Shuffling uses seeded Fisher-Yates over a mulberry32 PRNG. The seed is stored with each attempt so a review screen reproduces what the learner saw.
- Multi-select scoring is all-or-nothing (correct set exactly, no partial credit).
- YouTube embeds use `youtube-nocookie.com`, load lazily (thumbnail until clicked), and always show an "Open on YouTube" link. A missing `youtubeId` renders "Video coming soon".
- Exam weights live only in `content/courses/<id>/course.json`. Admin config: `guideVersion` "Admin, effective 2025-12-15"; sections and weights Configuration and Setup 15, Object Manager and Lightning App Builder 15, Automation 15, Data and Analytics Management 17, Sales and Marketing Applications 10, Service and Support Applications 10, Productivity and Collaboration 10, Agentforce AI 8; `questionCount` 60, `timeLimitMinutes` 105, `passPercent` 65 (these three are UNVERIFIED against the current official guide, so they are config only).
- All questions are original. No copied exam content.
- Lesson callout syntax (content depends on it): `:::key-terms`, `:::exam-trap`, `:::on-the-job`, each closed with `:::`.
- Written lessons carry concepts, terms, exam traps and on-the-job judgement. Click-by-click steps live in the YouTube video. Exercise pages hold scenario, goal, a "what you should see" list, a self-check checklist, and `videoRef`.
- Hosting is a static host with SPA fallback (`public/_redirects`: `/* /index.html 200`).

## Review Focus
1. Mock built when a section has fewer questions than its quota (or the bank is empty): no crash, shortfall filled from other sections, shortfalls reported, UI shows a "preview mock, question bank incomplete" notice. (Task 4, Task 10)
2. Corrupt, wrong-version or non-JSON data in localStorage: app starts with empty progress instead of a blank screen. Imported file that is not valid progress JSON is rejected with an error and existing progress is untouched. (Task 5)
3. `localStorage` unavailable or quota exceeded (private mode): the app still works from memory and shows a one-time "progress will not be saved" warning. (Task 5)
4. Mock timer: refresh or backgrounded tab mid-exam must resume from a stored deadline timestamp, never restart, and auto-submit on expiry. (Task 10)
5. Learner submits with unanswered questions, or with too many or too few options on a multi-select: counted wrong and reported as unanswered, never throws. (Task 3, Task 10)

---

## File Structure
- `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `public/_redirects`
- `src/theme.css`: tokens and fonts
- `src/types.ts`: all shared types
- `src/engine/shuffle.ts`, `scoring.ts`, `mock.ts`, `readiness.ts`: pure logic, no React
- `src/storage/ProgressStore.ts` (interface and types), `LocalStorageStore.ts`
- `src/content/schema.ts` (zod), `loader.ts`
- `src/components/`: `Markdown.tsx`, `VideoEmbed.tsx`, `QuizRunner.tsx`, `Timer.tsx`
- `src/pages/`: `Home.tsx`, `CoursePage.tsx`, `LessonPage.tsx`, `PracticeHub.tsx`, `MockExam.tsx`, `Results.tsx`, `ProgressPage.tsx`
- `src/App.tsx`, `src/main.tsx`
- `content/courses/admin/course.json`, `modules/<id>/lesson.md`, `exercise.md`, `questions/<id>.json`
- Tests sit beside sources as `*.test.ts(x)`; content validation in `tests/content.validation.test.ts`

---

### Task 1: Scaffold, theme and shared types

**Files:** Create `package.json`, `vite.config.ts` (Vitest with jsdom), `tsconfig.json`, `index.html`, `public/_redirects`, `src/theme.css`, `src/types.ts`, `src/App.tsx`, `src/main.tsx`, `src/App.test.tsx`

**Interfaces:**
- Produces (`src/types.ts`):
```ts
export type QuestionType = 'single' | 'multi';
export interface Option { id: string; text: string }
export interface Question { id: string; moduleId: string; examSection: string; objective: string;
  type: QuestionType; stem: string; options: Option[]; correct: string[];
  explanation: string; difficulty: 1 | 2 | 3; tags: string[] }
export interface ExamSection { id: string; name: string; weight: number }
export interface ExamConfig { guideVersion: string; questionCount: number; timeLimitMinutes: number;
  passPercent: number; readyMarginPoints: number; sections: ExamSection[] }
export interface ModuleMeta { id: string; title: string; examSection: string; objectives: string[];
  youtubeId: string | null; estMinutes: number; prerequisites: string[] }
export interface Course { id: string; name: string; exam: ExamConfig; moduleIds: string[] }
```

- [ ] **Step 1:** `git init` in `/home/claude/mta-platform`; scaffold Vite React-TS; add the dependencies listed in Tech Stack.
- [ ] **Step 2: Write failing test** `App.test.tsx`: renders `<App />` inside a `MemoryRouter`; asserts a heading with text "Maleka Tech Academy" is present.
- [ ] **Step 3:** Run `npx vitest run` and expect FAIL.
- [ ] **Step 4:** Implement `App` with a router shell and header. Load the two fonts in `index.html`; define tokens in `theme.css`.
- [ ] **Step 5:** Run `npx vitest run` and `npx tsc --noEmit` and expect PASS and no errors.
- [ ] **Step 6:** Commit `feat: scaffold app, theme and shared types`.

### Task 2: Seeded shuffle

**Files:** Create `src/engine/shuffle.ts`; Test `src/engine/shuffle.test.ts`

**Interfaces:**
- Produces: `makeRng(seed: number): () => number` (mulberry32, values in [0,1)); `shuffle<T>(items: readonly T[], seed: number): T[]` (does not mutate input).

- [ ] **Step 1: Write failing tests:** `same seed gives identical order`; `different seeds give different order for a 20-item array`; `result is a permutation (same sorted items)`; `input array is not mutated`; `empty and single-item arrays return unchanged`.
- [ ] **Step 2:** Run `npx vitest run src/engine/shuffle.test.ts` and expect FAIL.
- [ ] **Step 3:** Implement Fisher-Yates driven by `makeRng`.
- [ ] **Step 4:** Run and expect PASS. Commit `feat: seeded shuffle`.

### Task 3: Scoring

**Files:** Create `src/engine/scoring.ts`; Test `src/engine/scoring.test.ts`

**Interfaces:**
- Consumes: `Question`, `ExamConfig`.
- Produces:
```ts
export function scoreQuestion(q: Question, selected: string[]): boolean;
export interface SectionScore { correct: number; total: number; percent: number }
export interface AttemptResult { correct: number; total: number; percent: number; passed: boolean;
  unanswered: number; bySection: Record<string, SectionScore> }
export function scoreAttempt(questions: Question[], answers: Record<string, string[]>, exam: ExamConfig): AttemptResult;
```

- [ ] **Step 1: Write failing tests:** `single correct`; `single wrong`; `multi exact set is correct regardless of order`; `multi missing one option is wrong`; `multi with an extra option is wrong`; `unknown option ids are wrong, no throw`; `unanswered counts as wrong and increments unanswered`; `percent is rounded to 1 decimal and passed uses >= passPercent`; `bySection totals match question counts`; `empty questions list returns 0 percent, passed false`.
- [ ] **Step 2:** Run and expect FAIL.
- [ ] **Step 3:** Implement. Compare selected and correct as sets.
- [ ] **Step 4:** Run and expect PASS. Commit `feat: scoring`.

### Task 4: Mock exam builder and readiness

**Files:** Create `src/engine/mock.ts`, `src/engine/readiness.ts`; Test `src/engine/mock.test.ts`, `src/engine/readiness.test.ts`

**Interfaces:**
- Consumes: `shuffle`, `Question`, `ExamConfig`.
- Produces:
```ts
export interface Mock { seed: number; questions: Question[]; shortfalls: Record<string, number> }
// Questions come back with options already shuffled and question order shuffled.
export function buildMock(bank: Question[], exam: ExamConfig, seed: number, recentlySeen: string[]): Mock;
export interface AttemptSummary { percent: number; partial: boolean; takenAt: number }
export type Readiness = 'not-started' | 'building' | 'ready';
export function readiness(attempts: AttemptSummary[], exam: ExamConfig): Readiness;
```

- [ ] **Step 1: Write failing tests (mock):** `quotas follow section weights using largest-remainder so they sum to questionCount`; `same seed gives the same mock`; `option order differs from bank order for some question given a seed`; `prefers questions not in recentlySeen when the bank is large enough`; `section with too few questions: shortfall recorded and filled from other sections, no crash`; `empty bank returns empty questions and shortfalls equal to the quotas`; `no duplicate question ids`.
- [ ] **Step 2: Write failing tests (readiness):** `no full attempts is not-started`; `one full attempt below the bar is building`; `last two full attempts at least passPercent + readyMarginPoints is ready`; `partial attempts are ignored`; `a later low score drops ready to building`.
- [ ] **Step 3:** Run both test files and expect FAIL.
- [ ] **Step 4:** Implement. Draw each section's quota from unseen questions first, then seen ones; redistribute shortfall to the sections with the most remaining questions.
- [ ] **Step 5:** Run and expect PASS. Commit `feat: mock builder and readiness`.

### Task 5: Progress store

**Files:** Create `src/storage/ProgressStore.ts`, `src/storage/LocalStorageStore.ts`; Test `src/storage/LocalStorageStore.test.ts`

**Interfaces:**
- Produces (`ProgressStore.ts`):
```ts
export interface QuizAttempt { moduleId: string; courseId: string; seed: number; answers: Record<string,string[]>; correct: number; total: number; takenAt: number }
export interface MockAttempt { courseId: string; seed: number; questionIds: string[]; answers: Record<string,string[]>;
  percent: number; passed: boolean; partial: boolean; bySection: Record<string,{correct:number;total:number;percent:number}>; takenAt: number }
export interface InProgressMock { courseId: string; seed: number; questionIds: string[]; answers: Record<string,string[]>; flagged: string[]; deadlineMs: number }
export interface Progress { version: 1; completedModules: Record<string,string[]>; quizAttempts: QuizAttempt[]; mockAttempts: MockAttempt[]; inProgressMock: InProgressMock | null }
export interface ProgressStore {
  getProgress(): Promise<Progress>;
  markLessonComplete(courseId: string, moduleId: string): Promise<void>;
  saveQuizAttempt(a: QuizAttempt): Promise<void>;
  saveMockAttempt(a: MockAttempt): Promise<void>;
  saveInProgressMock(m: InProgressMock | null): Promise<void>;
  exportAll(): Promise<string>;
  importAll(json: string): Promise<void>;
  readonly persistent: boolean; // false when running from memory
}
```
- `LocalStorageStore` constructor: `new LocalStorageStore(storage?: Storage)` (default `window.localStorage`); key `mta-progress-v1`.

- [ ] **Step 1: Write failing tests:** `empty store returns version 1 empty progress`; `markLessonComplete is idempotent`; `saved attempts persist across a new store instance on the same Storage`; `corrupt JSON in storage returns empty progress`; `wrong version returns empty progress`; `exportAll then importAll round-trips`; `importAll rejects invalid JSON and wrong shape, leaving existing progress intact`; `storage whose setItem throws: store keeps working in memory and persistent is false`; `saveInProgressMock(null) clears it`.
- [ ] **Step 2:** Run and expect FAIL.
- [ ] **Step 3:** Implement with zod validation of the stored/imported shape; fall back to an in-memory object when `Storage` throws.
- [ ] **Step 4:** Run and expect PASS. Commit `feat: progress store`.

### Task 6: Content schema, loader and validation test

**Files:** Create `src/content/schema.ts`, `src/content/loader.ts`, `tests/content.validation.test.ts`, `content/courses/admin/course.json` (the Global Constraints config; `moduleIds` lists the two modules from Task 12)

**Interfaces:**
- Consumes: types from Task 1.
- Produces:
```ts
export function listCourses(): Course[];
export function loadCourse(courseId: string): Course;
export function loadModule(courseId: string, moduleId: string): { meta: ModuleMeta; lesson: string; exercise: string | null; exerciseVideo: { youtubeId: string | null; startSeconds?: number } };
export function loadQuestions(courseId: string, moduleId?: string): Question[];
```
Content is read with `import.meta.glob('/content/**', { eager: true, query: '?raw', import: 'default' })`; lesson and exercise frontmatter is parsed with `front-matter`.

- [ ] **Step 1: Write failing validation test** that loads every course and asserts: weights sum to 100; every module's `examSection` exists in the config; every question has unique `id`, `examSection` in config, `correct` is a non-empty subset of option ids, `single` has exactly one correct, `multi` has 2 or more, 3 to 6 options, non-empty explanation; every module in `moduleIds` has `lesson.md`; any `youtubeId` that is set matches `/^[\w-]{11}$/`.
- [ ] **Step 2:** Run `npx vitest run tests/content.validation.test.ts` and expect FAIL (no loader or content).
- [ ] **Step 3:** Implement the zod schemas and loader.
- [ ] **Step 4:** Run after Task 12 content exists and expect PASS (until then use a minimal fixture module). Commit `feat: content schema and loader`.

### Task 7: Markdown with callouts and video embed

**Files:** Create `src/components/Markdown.tsx`, `src/components/VideoEmbed.tsx`; Test beside each

**Interfaces:**
- Produces: `<Markdown source: string />` renders GFM plus `:::key-terms`, `:::exam-trap`, `:::on-the-job` as styled callout `aside` elements with a visible label ("Key terms", "Exam trap", "On the job"). `<VideoEmbed youtubeId: string | null, title: string, startSeconds?: number />`.

- [ ] **Step 1: Write failing tests:** `each callout type renders its label and content`; `unknown directive name renders as plain text, no throw`; `VideoEmbed with an id shows a thumbnail button and no iframe until clicked`; `clicking inserts an iframe whose src starts with https://www.youtube-nocookie.com/embed/<id>`; `startSeconds adds ?start=`; `an "Open on YouTube" link is always present when an id exists`; `null or malformed id renders "Video coming soon" and no iframe`.
- [ ] **Step 2:** Run and expect FAIL.
- [ ] **Step 3:** Implement with `remark-directive` plus a small remark plugin mapping container directives to `aside` nodes.
- [ ] **Step 4:** Run and expect PASS. Commit `feat: markdown callouts and video embed`.

### Task 8: Routing, course page and lesson page

**Files:** Create `src/pages/Home.tsx`, `CoursePage.tsx`, `LessonPage.tsx`; modify `src/App.tsx`; Test `src/pages/pages.test.tsx`

**Interfaces:**
- Consumes: loader, `ProgressStore` (provided through a `StoreContext`, see below), `Markdown`, `VideoEmbed`.
- Produces: routes `/`, `/c/:courseId`, `/c/:courseId/m/:moduleId`, `/c/:courseId/practice`, `/c/:courseId/mock`, `/c/:courseId/results/:attemptIndex`, `/progress`. `src/storage/StoreContext.tsx` exports `StoreProvider({store, children})` and `useStore(): ProgressStore`.

- [ ] **Step 1: Write failing tests:** `course page groups modules under their exam section with the section weight shown`; `completed modules show a done marker and the progress bar percentage`; `lesson page shows video, rendered lesson, exercise section and a "Mark complete" button`; `Mark complete calls store.markLessonComplete`; `unknown course or module id shows a not-found message`.
- [ ] **Step 2:** Run and expect FAIL.
- [ ] **Step 3:** Implement pages. The exercise section shows the exercise Markdown and its own `VideoEmbed` using `exerciseVideo`.
- [ ] **Step 4:** Run and expect PASS. Commit `feat: course and lesson pages`.

### Task 9: Quiz runner and practice hub

**Files:** Create `src/components/QuizRunner.tsx`, `src/pages/PracticeHub.tsx`; Test `src/components/QuizRunner.test.tsx`

**Interfaces:**
- Produces: `<QuizRunner questions: Question[] seed: number mode: 'check'|'practice' onFinish: (answers: Record<string,string[]>) => void />`. Questions and options are shuffled by `seed` inside the component (using `shuffle`). Single-choice uses radios; multi uses checkboxes with a "Choose N" hint. Instant feedback and explanation after each answer. Practice hub offers module practice and section practice with a random seed.

- [ ] **Step 1: Write failing tests:** `option order is stable for a given seed and differs for another seed`; `single shows radios, multi shows checkboxes with the "Choose N" hint`; `answering shows correct/incorrect and the explanation`; `finish calls onFinish with all answers`; `a question with no selection cannot be submitted`.
- [ ] **Step 2:** Run and expect FAIL.
- [ ] **Step 3:** Implement. Save a `QuizAttempt` through the store on finish (in the page that hosts the runner).
- [ ] **Step 4:** Run and expect PASS. Commit `feat: quiz runner and practice hub`.

### Task 10: Mock exam, timer and results

**Files:** Create `src/components/Timer.tsx`, `src/pages/MockExam.tsx`, `src/pages/Results.tsx`; Test `src/pages/MockExam.test.tsx`

**Interfaces:**
- Consumes: `buildMock`, `scoreAttempt`, `readiness`, `ProgressStore`, `InProgressMock`.
- Behaviour: starting a mock builds it with a fresh seed (excluding question ids seen in the last mock attempt), stores `InProgressMock` with `deadlineMs = now + timeLimitMinutes * 60000`. No feedback until submit. Flag-for-review, a review-before-submit list (answered, flagged, unanswered), submit stores a `MockAttempt` (`partial = shortfalls non-empty or questions.length < exam.questionCount`) and navigates to results. Results show overall score vs pass mark, per-section percentages, weakest sections with links to their modules, readiness label, and a "preview mock, question bank incomplete" banner when `partial`.

- [ ] **Step 1: Write failing tests (use fake timers):** `starting stores an in-progress mock with a deadline`; `remounting resumes the same questions, answers and remaining time (does not restart)`; `when the deadline passes the exam auto-submits`; `no correctness feedback is visible before submit`; `review list shows answered, flagged and unanswered counts`; `submit with unanswered questions succeeds and results report unanswered`; `results show per-section percent and link weakest section to its module`; `partial mock shows the incomplete-bank banner`; `submitting clears the in-progress mock`.
- [ ] **Step 2:** Run and expect FAIL.
- [ ] **Step 3:** Implement. The timer derives remaining time from `deadlineMs - Date.now()` on each tick.
- [ ] **Step 4:** Run and expect PASS. Commit `feat: mock exam, timer and results`.

### Task 11: Progress page, export/import and storage warning

**Files:** Create `src/pages/ProgressPage.tsx`; modify `src/App.tsx`; Test `src/pages/ProgressPage.test.tsx`

**Interfaces:**
- Consumes: `ProgressStore.exportAll/importAll/persistent`.

- [ ] **Step 1: Write failing tests:** `export triggers a download of a JSON file named mta-progress.json`; `importing a valid file updates the displayed progress`; `importing an invalid file shows an error and keeps current progress`; `when store.persistent is false a banner says progress will not be saved`; `page lists mock attempts with date, score and passed state`.
- [ ] **Step 2:** Run and expect FAIL.
- [ ] **Step 3:** Implement. Show a one-time notice that progress is stored only in this browser.
- [ ] **Step 4:** Run and expect PASS. Commit `feat: progress page with export and import`.

### Task 12: Admin sample content (2 modules, about 60 questions) and deploy config

**Files:** Create `content/courses/admin/modules/objects-and-fields/{lesson.md,exercise.md}`, `content/courses/admin/modules/profiles-and-permission-sets/{lesson.md,exercise.md}`, `content/courses/admin/questions/objects-and-fields.json`, `content/courses/admin/questions/profiles-and-permission-sets.json`, `README.md`

**Interfaces:**
- Module `objects-and-fields`: `examSection` = the Object Manager and Lightning App Builder section id; objectives cover standard vs custom objects, field types, relationships (lookup, master-detail, junction), validation rules, record types, page layouts.
- Module `profiles-and-permission-sets`: `examSection` = Configuration and Setup section id; objectives cover profiles vs permission sets vs permission set groups, OWD, roles, sharing rules, and when each applies.
- Each module: lesson written from zero knowledge using all three callout types; exercise on the Khanyisa Solar scenario with `videoRef` (`youtubeId` null for now); at least 30 original questions, a mix of single and multi, each with an explanation and `difficulty`.
- Topics must be checked against current Salesforce documentation before writing. Mark any point that depends on a release or the exam guide with a `<!-- verify -->` comment for the owner.

- [ ] **Step 1:** Draft both lessons and exercises following the teaching standard (define terms on first use, analogy, feature, example, "On the job", "Exam trap").
- [ ] **Step 2:** Write the two question banks.
- [ ] **Step 3:** Run `npx vitest run` (the Task 6 validation test must now pass against real content) and expect all PASS.
- [ ] **Step 4:** Run `npm run build` and expect a successful build. Run `npm run preview` and manually walk: home, course, a lesson, a practice quiz, a mock (the partial-bank banner should appear), results, progress export and import.
- [ ] **Step 5:** Write `README.md` (run, test, add a module, add questions, update exam config, deploy to a static host with the `_redirects` fallback).
- [ ] **Step 6:** Commit `feat: sample admin content and docs`.

---

## Self-Review
- **Spec coverage:** G1-G2 content standard (Task 12 plus later slices); G3 and G4 (Tasks 7, 8, 12); G5 mock, shuffling, section scoring (Tasks 2-4, 10); G6 mobile and lazy video (Tasks 1, 7); G7 store abstraction (Task 5, 8); G8 config-driven weights (Task 6). Spec items outside Slice 1: remaining Admin content, Developer, login. They are covered by later plans.
- **Type consistency:** `Question`, `ExamConfig`, `AttemptResult`, `Mock`, `Progress`, `MockAttempt` are defined once (Tasks 1, 3, 4, 5) and reused unchanged. `AttemptSummary` is a structural subset of `MockAttempt`.
- **Review Focus:** each of the five items has its test in Tasks 3, 4, 5 and 10.
- **Proportion:** code blocks are limited to type signatures; bodies are left to the implementer.
