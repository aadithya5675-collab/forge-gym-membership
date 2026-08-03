---
name: performance-web-onboarding
description: Best practices, architecture patterns, and design system rules for creating high-performance, accessible 3-step membership onboarding applications with React 18, Tailwind CSS v4, and Motion.
---

# Performance Web Onboarding Skill

This skill documents key design, state architecture, and motion graphics principles for building production-quality web application onboarding flows.

## Core Design Principles

1. **Editorial Athletic Aesthetic**:
   - Dark background base (`#070806`), surface cards (`#111310`), elevated panels (`#181B16`), and intentional acid-lime accents (`#C7FF3D`).
   - High-contrast typography combining condensed display fonts (e.g. Barlow Condensed) for headings & pricing with clean sans-serif (Inter) for controls.

2. **3-Step State Architecture**:
   - **Step 1 (Plan Selection)**: Billing cycle toggle (Monthly vs Annual with total billed & savings), clear tier comparison, and included benefits.
   - **Step 2 (Profile & Goals)**: Primary training goal selection, accessible form input group with live validation on blur/navigation.
   - **Step 3 (Review & Confirmation)**: Grouped summary sections with inline `Edit` handlers, accessible legal policy modals, and prototype submission handling.

3. **Accessibility Standards**:
   - Native `<fieldset>` and `<legend>` for radio group plan cards and billing selectors.
   - Explicit `label` - `input` association with `htmlFor` and `id`.
   - `aria-invalid` and `aria-describedby` pointing to error alerts (`<p role="alert">`).
   - Focus management: Invalid form submissions automatically focus the first invalid input.
   - Dialog semantics (`role="dialog"`, `aria-modal="true"`, focus trapping, Escape key listener, body scroll locking, and focus restoration).

4. **Kinetic Motion Graphics**:
   - Canvas particle mesh for subtle background ambient graphics (`KineticMotionCanvas`).
   - Direction-aware step transitions using `motion/react` `AnimatePresence`.
   - Respect `prefers-reduced-motion` across CSS transitions and JavaScript canvas render loops.

## Shared Utility References

- **Pricing**: `calculateMonthlyRate`, `calculateBilledAmount`, `calculateAnnualSavings`, `formatCurrency`.
- **Validation**: `validateStep1`, `validateStep2`, `validateStep3`, `normalizeIndianPhone`.
