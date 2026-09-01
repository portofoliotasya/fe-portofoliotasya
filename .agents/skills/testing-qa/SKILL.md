---
name: testing-qa
description: >-
  Use this skill to execute automated testing suites (Unit, Component, Integration, E2E),
  visual regression verification, and security testing for the Tasya Portfolio frontend.
---

# Testing & Quality Assurance (QA) Skill

This skill outlines the testing methodology, test suites, execution commands, and verification criteria for the Tasya Portfolio frontend application.

---

## 1. Testing Pyramid & Test Architecture

```text
       /  E2E Tests  \       -> Playwright (Complete User & Admin Journeys)
      / Integration   \      -> API mock tests / Hook integration tests
     / Component/Unit  \     -> Vitest + React Testing Library + Zod tests
    ---------------------
```

---

## 2. Test Suites Overview

### A. Unit & Validation Tests (Vitest)
Location: `src/**/__tests__/*.test.ts(x)`
- **Zod Schema Tests**: Verify `inquirySchema` and `projectSchema` accept valid inputs and reject malformed emails, short texts, or invalid phone numbers.
- **Component Unit Tests**:
  - `ContactForm`: Test submit button disable during loading, error message appearance when required fields are omitted, honeypot triggering.
  - `ProjectCard`: Test props rendering, badge display, and link paths.
  - `ToastNotification`: Test timer dismiss and display states.

### B. Integration Tests
- **API Client Interceptor**: Test that `Authorization: Bearer <token>` is added when token exists.
- **Error Handling**: Test that `400` validation errors and `401` unauthorized responses trigger expected state updates and redirection.

### C. End-to-End (E2E) Test Scenarios (Playwright)
Location: `e2e/*.spec.ts`

#### Scenario 1: Visitor Exploration Journey
1. Navigate to `/`.
2. Verify hero text "Welcome to Tasya Portfolio" and CTA buttons are visible.
3. Click on the first featured project card.
4. Verify URL transitions to `/projects/[id]`.
5. Verify project title, 3-image gallery, "The Goal", "Challenges", "My Role", and "Tech Stack" pills are displayed.
6. Click "Back to Projects" button.
7. Verify return to the landing page.

#### Scenario 2: Contact Form Inquiry Submission
1. Navigate to `/contact`.
2. Fill in Name, Email, WhatsApp, Company, Project Type, Estimated Budget, and Description.
3. Click "Send Message".
4. Assert that the submit button shows loading state.
5. Intercept `POST /api/inquiries` and verify payload matches `InquiryInput`.
6. Verify success toast notification appears and form fields are cleared.

#### Scenario 3: Admin CMS Lifecycle (CRUD & Media)
1. Navigate to `/admin/login`.
2. Enter email and password. Click "Login".
3. Verify redirected to `/admin/dashboard` upon receiving JWT token.
4. Click "Add New Project" button -> modal opens.
5. Upload a mock image file -> verify `/api/media/upload` returns image URL.
6. Fill in Title, Description, Goal, Challenges, Role, Tech Stack -> submit form.
7. Verify new project appears in the projects table.
8. Click "Edit" -> update Title -> submit -> verify updated title in table.
9. Click "Delete" -> confirm popup dialog -> verify project is removed or marked deleted.

#### Scenario 4: Security Route Protection
1. Clear all cookies and storage.
2. Attempt direct navigation to `/admin/dashboard`.
3. Assert that user is redirected to `/admin/login?redirect=/admin/dashboard`.

---

## 3. Test Commands & Tooling

```bash
# Run unit & component tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:coverage

# Run Playwright E2E tests
npx playwright test

# Run Playwright in UI mode
npx playwright test --ui

# Run responsive layout tests across viewports
npx playwright test --project=mobile-chrome
```

---

## 4. Visual & Responsive QA Criteria

Every page must be inspected across three standard viewports:
1. **Mobile (375px x 812px - iPhone X / Android)**:
   - Header collapses to hamburger or compact layout.
   - Hero text scales down (`text-3xl`).
   - Featured project grid stacks into single column.
   - Contact Form fields stack into single column.
   - No horizontal scrollbars.
2. **Tablet (768px x 1024px - iPad)**:
   - Two-column layouts flow naturally.
   - Card images maintain correct aspect ratios.
3. **Desktop (1440px x 900px)**:
   - Max container width constrained (`max-w-7xl mx-auto`).
   - Padding and whitespace match mockups.

---

## 5. QA Verification Checklist Before Milestone Completion

- [ ] All Vitest unit tests pass (`0 errors`).
- [ ] Playwright E2E tests pass for Public & Admin flows.
- [ ] No unhandled console errors or hydration errors in browser console.
- [ ] Lighthouse / PageSpeed score >= 85 for Mobile & Desktop.
- [ ] Results and test execution logs documented in `PROGRES.md`.
