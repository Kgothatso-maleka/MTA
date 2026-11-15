# Maleka Tech Academy learning platform

Browser-only learning platform for Salesforce exam prep and job-readiness. Videos live on YouTube; this site holds the structured lessons, practice quizzes and a timed, shuffled mock exam.

## Run

```bash
npm install
npm run dev        # local dev server
npm test           # full test suite
npm run build      # type-check and production build into dist/
npm run preview    # serve the production build locally
```

## How content works

All course content is data under `content/courses/<course-id>/`:

- `course.json`: course name, **exam config** (sections, weights, question count, time limit, pass mark, `guideVersion`) and the ordered `moduleIds`.
- `modules/<module-id>/lesson.md`: frontmatter (`title`, `examSection`, `objectives`, `youtubeId`, `estMinutes`, `prerequisites`) plus the lesson body.
- `modules/<module-id>/exercise.md`: frontmatter (`youtubeId`, optional `startSeconds`) plus the scenario, goal, "what you should see" and self-check.
- `questions/<module-id>.json`: the question bank for the module.

Lesson callouts: `:::key-terms`, `:::exam-trap`, `:::on-the-job`, each closed with `:::`.

### Add a YouTube video
Set `youtubeId` (the 11-character id from the video URL) in the lesson frontmatter. Set the exercise walkthrough video the same way in `exercise.md`. Until an id is set, the page shows "Video coming soon".

### Add a module
1. Create `content/courses/<course>/modules/<id>/lesson.md` (and `exercise.md`).
2. Create `content/courses/<course>/questions/<id>.json` (aim for 12 or more questions).
3. Add `<id>` to `moduleIds` in `course.json`.
4. Run `npm test`. The content validation test checks section ids, question shape, option ids and YouTube ids.

### Question format
```json
{ "id": "oaf-01", "moduleId": "objects-and-fields", "examSection": "object-manager",
  "objective": "…", "type": "single | multi", "stem": "…",
  "options": [{ "id": "a", "text": "…" }], "correct": ["a"],
  "explanation": "…", "difficulty": 1, "tags": [] }
```
`multi` questions need 2 or more correct options and the stem should say how many to choose. Write original questions only.

### Update an exam outline
When Salesforce changes an exam, edit the `exam` block in `course.json` (weights must sum to 100) and update `guideVersion`. The mock exam draws questions by these weights.

## Progress and login later
Progress is saved in the browser only (`LocalStorageStore`). Learners can export and import it from the My progress page. All UI code uses the `ProgressStore` interface in `src/storage/ProgressStore.ts`; to add accounts later, write a remote implementation and pass it to `StoreProvider` in `src/main.tsx`. Content and the quiz engine do not change.

## Deploy
`npm run build`, then publish `dist/` to a static host (Netlify, Vercel or Cloudflare Pages). `public/_redirects` provides the single-page-app fallback (`/* /index.html 200`) for hosts that read it. On Vercel add an equivalent rewrite.

## Known gaps (Slice 1)
- Only two sample Admin modules are written. The mock exam is flagged as a "preview mock" until every exam section has enough questions.
- Admin exam facts in `course.json` (60 questions, 105 minutes, 65% pass mark) are unverified against the current official guide.
- The mock results page does not yet show a per-question review.
