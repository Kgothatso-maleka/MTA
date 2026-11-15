# MTA Learning Platform: Design (MVP1)

Date: 2026-11-15 | Owner: Kgothatso Maleka (Maleka Tech Academy) | Status: DRAFT, awaiting approval

## 1. Intent and why
- MTA teaches Salesforce Administrator and Developer to South African learners.
- Aim: learners pass the exam AND are job-ready in complex orgs.
- Videos live on YouTube, so MTA has no video hosting cost or ops. The site links or embeds them.
- The site is where learning is structured: beginner-first lessons, on-the-job tips, practice exercises, quizzes, and a shuffled exam-style mock that shows exam readiness.

**Approved by owner 2026-11-15.** Owner decision: the YouTube videos carry the step-by-step worked examples and hands-on exercise walkthroughs so learners are never lost. The written lesson therefore focuses on concepts, terminology, exam traps and on-the-job judgement, and each exercise page points to the matching video (with optional timestamps) and holds the scenario, goal and self-check checklist rather than duplicating the click-by-click steps.

Builder calls on the owner's unanswered open questions (section 12), to be revisited if the owner disagrees: Claude drafts full lesson text and questions for owner review; hosting account and domain are deferred until deploy; existing MTA material is reused where the owner supplies it; weights are verified against official guides when the owner can provide them.

## 2. Goals
- G1. Cover every section and objective of the current official exam guide per course. Admin first, then Developer.
- G2. Teach as if the learner is brand new. No assumed Salesforce knowledge.
- G3. Every lesson: embedded YouTube video (which carries the step-by-step examples and exercise walkthroughs), plain-language written lesson, "Exam trap" callouts, "On the job" tips, short check quiz.
- G4. Hands-on practice exercises tied to the Khanyisa Solar case study, for job-readiness beyond exam recall.
- G5. Timed mock exam in the real exam format. Questions and answer options shuffle on every attempt. The result is scored per exam section with weak modules linked.
- G6. Works well on mobile and weak data (SA learners).
- G7. Browser-only for MVP1, with login addable later without rewriting content or the quiz engine.
- G8. Maintainable by one person on ~8 weekend hours a week. When Salesforce changes an exam outline, updating one config file and some content should be enough.

## 3. Non-goals (MVP1)
- No login, accounts, payments, certificates, discussion forums or admin dashboard.
- No auto-grading of hands-on work in a Salesforce org. Exercises use self-check checklists.
- No video hosting or uploading. YouTube only.
- No Developer content until Admin is shipped.

## 4. Anti-goals (a failure even if it technically works)
- Copied or "braindump" exam questions. All questions are original, written from the official outline and Salesforce documentation.
- Content that follows an outdated exam guide without saying which version it matches.
- Lessons that read like exam notes only. They must also teach real-org judgement.
- Mock exams where the questions are too few to shuffle meaningfully (the same ones repeat every attempt).

## 5. Constraints
- One builder (owner) works weekends only. The scope must be built in vertical slices.
- Free or near-free hosting.
- Brand: black and gold, Playfair Display (headings), DM Sans (body).
- Browser-only storage in MVP1. Progress is lost if the learner clears data or switches device. The mitigation is export/import of progress as a file.

## 6. Research findings (exam facts), with confidence
Primary Salesforce pages were not fetchable in this session. Official Trailhead exam guide pages were blocked. The only official PDF retrieved was a Winter '19 Admin guide, which is outdated and was NOT used for current weights. Everything below is from secondary sources and must be verified against the live official guides before content is written.

### Administrator (refreshed, effective 15 Dec 2025)
| Section | Weight |
|---|---|
| Configuration and Setup | 15% |
| Object Manager and Lightning App Builder | 15% |
| Automation | 15% |
| Data and Analytics Management | 17% |
| Sales and Marketing Applications | 10% |
| Service and Support Applications | 10% |
| Productivity and Collaboration | 10% |
| Agentforce AI (new) | 8% |
- Source: SalesforceBen article on the refresh, corroborated in part by two others: ApexHours (Data and Analytics 17%) and admin.salesforce.com (Configuration and Setup 15%). Totals 100%. Confidence: medium-high.
- Format: 60 scored questions (up to 5 unscored), 105 minutes, 65% pass. These figures come from older guides and need to be confirmed for the current guide.

### Platform Developer (formerly "Platform Developer I")
- Sources DISAGREE on weights. Two versions appear across third-party pages:
  - Version A: Developer Fundamentals 27%, Process Automation and Logic 28%, User Interface 25%, Testing/Debugging/Deployment 20%.
  - Version B: 23% / 30% / 25% / 22%.
  - Other pages show a 6-section older structure.
- Format (consistent across sources): 60 scored questions plus up to 5 unscored, 105 minutes, 68% pass. A few pages say 110 minutes and 65%.
- Confidence: LOW on weights, medium on format.
- Action: verify against the official guide before building Developer content. The platform design is unaffected, because weights live in config.

### Platform Developer II
- Five sections reported as: Advanced Developer Fundamentals 15%, Performance 18%, User Interface 20%, Testing/Debugging/Deployment 20%, Process Automation/Logic/Integration 27%. Source: K2 University only.
- Pass mark reported as 65% or 70%, depending on the source. Confidence: low.
- Scope decision: PD2 is later and outside MVP1.

## 7. Approaches considered
- A. Plain HTML/JS site with content in data files. Fast and simple, but hand-rolled routing and state get hard to maintain as the platform grows.
- B. React + Vite static app with content as Markdown/JSON. **Chosen by owner.** Clean structure; a storage layer that can be swapped for login later; one-command deploy to a free static host.
- C. Single HTML artifact. Rejected: it cannot hold dozens of modules and hundreds of questions.

## 8. Architecture (approach B)

### 8.1 Content model (all content is data, not code)
- `courses/<course-id>/course.json`: course name, exam config (see 8.2), ordered module list.
- `courses/<course-id>/modules/<module-id>/lesson.md`: Markdown with frontmatter: `title`, `examSection`, `objectives[]`, `youtubeId` (empty allowed), `estMinutes`, `prerequisites[]`.
  - Lesson body uses fixed callout blocks: **Key terms**, **Exam trap**, **On the job**.
- `courses/<course-id>/modules/<module-id>/exercise.md`: Khanyisa Solar scenario, goal, prerequisites, self-check checklist, and `videoRef` (`youtubeId` plus optional `startSeconds`) pointing to the walkthrough. Click-by-click steps live in the video, not the page. The page may carry a short "what you should see" outcome list so learners can confirm success.
- `courses/<course-id>/questions/<module-id>.json`: question bank for the module.

### 8.2 Exam config (one file per course)
- Sections with names and weights, question count, time limit, pass mark, and `guideVersion` (for example "Admin, effective 2025-12-15").
- The mock exam draws questions by section weight from this file, so an outline update means editing this file.

### 8.3 Question schema
- `id`, `moduleId`, `examSection`, `objective`, `type` (`single` | `multi`), `stem`, `options[{id,text}]`, `correct[]` (ids), `explanation`, `difficulty`, `tags[]`.
- For `multi`, the stem states how many to choose, as the real exam does.

### 8.4 Quiz and mock engine
- Modes:
  - Lesson check: 5-8 questions after a lesson, with instant feedback.
  - Module practice: random draw from the module bank.
  - Section practice: draw across a section.
  - Mock exam: full length, timed, no feedback until the end.
- Shuffling: question order and option order use seeded Fisher-Yates. The seed is stored so a review screen shows exactly what the learner saw.
- Mock exam: stratified draw by section weight. It avoids repeating questions seen in the last attempt where the bank allows.
- Mock features: timer, flag for review, review-before-submit screen, and scoring for multi-select (correct set only, no partial credit, as on the real exam).
- Result screen: overall score vs pass mark, per-section percentage, weakest sections, and links to the modules to revisit. This is the "exam readiness" signal.
- Readiness label thresholds are configurable. Suggested default: ready when the last two full mocks are at least 10 points above the pass mark.

### 8.5 Storage abstraction (enables later login)
- Interface `ProgressStore`: `getProgress()`, `markLessonComplete()`, `saveQuizAttempt()`, `saveMockAttempt()`, `exportAll()`, `importAll()`.
- MVP1 implementation: `LocalStorageStore`.
- Later implementation: `RemoteStore` (e.g. Supabase). No change to content or engine.
- Export/import progress as a JSON file covers device switches and cleared browsers.
- The UI only talks to `ProgressStore`. No direct localStorage calls anywhere else.

### 8.6 Video
- `youtubeId` per lesson. Embedded with `youtube-nocookie.com` and lazy loaded (a thumbnail until clicked, to save data).
- Always show an "Open on YouTube" link as a fallback.
- Missing `youtubeId` shows a "Video coming soon" state, so the site ships before every video is recorded.

### 8.7 UI and pages
- Home → Course page (module map grouped by exam section, with a progress bar) → Lesson page (video, lesson, exercise, check quiz) → Practice hub → Mock exam → Results → Progress/export.
- Branding: black and gold, Playfair Display and DM Sans.
- Mobile-first, accessible (keyboard navigation, contrast).
- Hosting: static host (Netlify, Vercel or Cloudflare Pages).

## 9. Content plan
### 9.1 Teaching standard (every lesson)
- Starts from zero: define each term the first time it appears.
- Uses a real-world analogy, then the Salesforce feature, then a worked example.
- Ends with "On the job": how it behaves in a large, messy org.
- Includes Exam trap notes (common wrong answers).
- Lesson length is sized for about 20-40 minutes of study.

### 9.2 Admin module map (draft, mapped to the Dec 2025 outline; every objective must be checked against the official guide before writing)
- Configuration and Setup (15%): platform basics and org tour, company settings, users, licences, profiles, permission sets and permission set groups, roles, OWD, sharing rules, login/session/password security, data access debugging.
- Object Manager and Lightning App Builder (15%): standard and custom objects, fields, relationships (lookup, master-detail, junction), validation rules, record types, page layouts, Lightning pages, apps, tabs, list views.
- Automation (15%): Flow Builder (record-triggered, screen, scheduled, autolaunched), approval processes, choosing the right tool, flow debugging and error handling, migration from Workflow and Process Builder.
- Data and Analytics Management (17%): data import and export (Data Import Wizard, Data Loader), duplicate management, data quality, reports and report types, dashboards, subscriptions, report/dashboard folders and sharing.
- Sales and Marketing Applications (10%): leads, accounts, contacts, opportunities, products and price books, campaigns, forecasts.
- Service and Support Applications (10%): cases, queues, assignment and escalation rules, email-to-case, Knowledge, Omni-Channel basics.
- Productivity and Collaboration (10%): activities, Chatter, email integration, mobile app, AppExchange, change management and sandboxes.
- Agentforce AI (8%): AI/Einstein/Agentforce fundamentals, Prompt Builder, trust and data considerations.
- Cross-cutting job-readiness track: working in a complex org (reading an existing org, impact analysis, sandboxes and deployment, naming conventions, governance, stakeholder requirements, troubleshooting playbooks).

### 9.3 Question bank targets
- Admin: at least 12 questions per module for practice, and a total bank of 400 or more, so mocks differ between attempts. Written to the weights in section 6.
- All questions original. Each has an explanation covering why the right answer is right and why the others are wrong.

## 10. Delivery plan (vertical slices)
- Slice 1: the platform shell, content model, quiz and mock engine, storage layer, and branding, using 2 fully written Admin modules and about 60 questions. This proves the full learner experience end to end.
- Slice 2: complete the Admin content in outline-weight order (highest-weight and hardest first).
- Slice 3: complete the Admin mock bank and readiness reporting. Verify against the official guide.
- Slice 4: Developer course (verify outline first), then optionally PD2.
- Later: login (RemoteStore), certificates, cohort dashboard.

## 11. Risks
- Exam outline drift: mitigated by `guideVersion` and config-driven weights. Review each Salesforce release.
- Question quality and legality: original questions only; owner spot-checks.
- Single-builder bandwidth: mitigated by slices and a content pipeline that is data-only.
- Browser-only progress loss: export/import plus a clear in-app notice.

## 12. Open questions for the owner
1. Who writes lessons: should Claude write full lesson text and questions for you to review, or just outlines that you flesh out?
2. Domain and hosting account: do you have a domain, and a host account (Netlify/Vercel/Cloudflare)?
3. Does any existing MTA material (Admin Cohort I slides, notes) need to be reused as the base for the Admin lessons?
4. Verification: are you able to paste or send the current official Admin and Developer exam guide text, since the official pages could not be fetched here?

## 13. Left to the builder
- Choice of Markdown renderer and component library, routing library, test setup (the engine must have unit tests for shuffling, scoring and the stratified draw), exact UI layout details.
