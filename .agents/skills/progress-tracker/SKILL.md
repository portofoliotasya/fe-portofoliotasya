---
name: progress-tracker
description: >-
  Use this skill to inspect, manage, format, and record progress updates in PROGRES.md throughout
  the development lifecycle of the Tasya Portfolio frontend project.
---

# Progress Tracker Skill

This skill defines the standardized protocol for updating and maintaining `PROGRES.md`. Maintaining an accurate, transparent, and up-to-date `PROGRES.md` is mandatory for all agents working on this project.

---

## 1. When to Update `PROGRES.md`

You must update `PROGRES.md`:
1. **At Task Initiation**: When picking up a new feature, phase, or bugfix (set status to `🟡 IN_PROGRESS`).
2. **At Milestone Completion**: Immediately after completing a slice, component, integration, security audit, or test suite (set status to `✅ COMPLETED`).
3. **When Blocked or Failed**: When an unexpected error or API mismatch occurs (set status to `🔴 BLOCKED` with reasons and remediation steps).
4. **Before Concluding Any Turn**: Before returning final answers or reports to the user.

---

## 2. Standard Status Conventions

| Badge | Status Code | Meaning |
| :--- | :--- | :--- |
| ⚪ `TODO` | Pending | Task is scheduled but not yet started. |
| 🟡 `IN_PROGRESS` | Active | Currently being implemented or tested. |
| 🟢 `COMPLETED` | Finished | Completed, verified, and tested with passing status. |
| 🔴 `BLOCKED` | Blocked | Awaiting external input, backend fix, or dependency resolution. |

---

## 3. Progress Update Procedure

### Step 1: Read Current State
Read [PROGRES.md](../../../PROGRES.md) to understand the current completed milestones and find the current phase.

### Step 2: Update Checklist & Status
Modify the task checkbox from `[ ]` to `[x]` for completed tasks, and adjust the badge.

### Step 3: Append Changelog Entry
Add an entry to the **Changelog & Activity History** section using this format:

```markdown
### [YYYY-MM-DD HH:MM] - <Phase / Feature Name>
- **Status**: 🟢 COMPLETED | 🟡 IN_PROGRESS | 🔴 BLOCKED
- **Agent Action**: Brief description of what was done.
- **Files Modified / Created**:
  - `path/to/file1.tsx`
  - `path/to/file2.ts`
- **Verification / Testing**:
  - Command: `npm test` or `npx playwright test`
  - Result: All tests passed (X passed, 0 failed).
- **Next Step**: Description of the next task in queue.
```

### Step 4: KPI Verification Check
Ensure that the updates adhere to the project KPIs outlined in the PRD:
- Google PageSpeed score target >= 85/100
- 100% successful form delivery to backend & database
- Admin CMS operations completed in < 3 minutes
- 100% mobile responsiveness (Android & iOS)
