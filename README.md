<h1 align="center">FORGE – Gym Membership</h1>

<p align="center">
  A bold, animated membership website for FORGE Performance Club, Coimbatore: compare plans, pick a goal and build your membership in three steps.
</p>

<p align="center">
  <a href="https://forge-gym-membership.vercel.app"><img src="https://img.shields.io/badge/Live_Demo-forge--gym--membership.vercel.app-70a5fd?style=for-the-badge&logo=vercel&logoColor=white&labelColor=1a1b27" alt="Live demo"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-70a5fd?style=for-the-badge&logo=react&logoColor=white&labelColor=1a1b27" alt="React 18">
  <img src="https://img.shields.io/badge/TypeScript-5-70a5fd?style=for-the-badge&logo=typescript&logoColor=white&labelColor=1a1b27" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-6-bf91f3?style=for-the-badge&logo=vite&logoColor=white&labelColor=1a1b27" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-70a5fd?style=for-the-badge&logo=tailwindcss&logoColor=white&labelColor=1a1b27" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Motion-12-bf91f3?style=for-the-badge&logo=framer&logoColor=white&labelColor=1a1b27" alt="Motion">
  <img src="https://img.shields.io/badge/Vitest-tested-70a5fd?style=for-the-badge&logo=vitest&logoColor=white&labelColor=1a1b27" alt="Vitest">
</p>

---

## Table of contents

- [Overview](#overview)
- [Features](#features)
- [Membership plans](#membership-plans)
- [Tech stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Author](#author)

## Overview

FORGE is a front-end membership experience for a performance gym. Visitors browse the club's facilities, classes and coaches, then walk through a guided three-step flow to choose a plan, enter their details and review their membership. Everything runs in the browser: there is no backend, and the final submission is simulated.

## Features

- **Six views** – Home, Facilities, Classes, Coaches, Membership and Contact, switched with animated page transitions and synced to the URL hash (`#membership`, `#classes`, …).
- **Three-step membership flow**
  1. **Plan** – monthly or annual billing, three tiers, a training goal (build muscle, lose fat, improve strength, general fitness) and a "Compare all tiers" matrix dialog.
  2. **Profile** – first and last name, email, Indian mobile number (normalises `+91` / leading `0`) and password, with inline validation on blur.
  3. **Review** – a summary of the selection and a required terms checkbox.
- **Success pass** – a confirmation screen with a printable membership pass and a "start over" reset.
- **Progress saving** – non-sensitive progress is kept in `sessionStorage`; the password is never persisted.
- **Policy dialogs** – terms, health and privacy policies opened from the flow and the footer.
- **Kinetic canvas** – an interactive HTML5 canvas hero animation that respects `prefers-reduced-motion`.
- **Accessibility** – labelled fields, focus moved to each step heading, and reduced-motion styles.
- **Unit tests** – Vitest suites for pricing and validation logic.

## Membership plans

Prices are defined in [`src/data/membershipPlans.ts`](src/data/membershipPlans.ts) (INR):

| Plan | Monthly billing | Annual billing (per month) | Annual total |
| --- | --- | --- | --- |
| Essential | ₹1,499 | ₹1,199 | ₹14,388 |
| Performance (recommended) | ₹2,499 | ₹1,999 | ₹23,988 |
| Elite | ₹4,499 | ₹3,599 | ₹43,188 |

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 18, TypeScript, Tailwind CSS 4, Lucide React icons, Barlow Condensed and Inter fonts |
| Animation | Motion (`motion/react`), HTML5 canvas |
| Testing | Vitest |
| Tooling | Vite 6, Vercel |

## Project structure

```text
forge-gym-membership/
├── index.html
├── src/
│   ├── components/
│   │   ├── brand/          # logo, hero panel, kinetic motion canvas
│   │   ├── layout/         # navbar, footer
│   │   └── ui/             # comparison matrix, policy dialog, field, step indicator, toast
│   ├── data/               # membership plans and goal options
│   ├── features/
│   │   ├── home/
│   │   ├── facilities/
│   │   ├── classes/
│   │   ├── trainers/
│   │   ├── membership/     # 3-step flow, plan / profile / review steps, success state
│   │   └── contact/
│   ├── lib/                # pricing and validation helpers + tests
│   └── types/
└── vite.config.ts
```

## Getting started

**Prerequisites:** Node.js and npm.

```bash
git clone https://github.com/aadithya5675-collab/forge-gym-membership.git
cd forge-gym-membership
npm install
npm run dev
```

No environment variables are needed.

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run typecheck` / `npm run lint` | Run `tsc` |
| `npm test` | Run the Vitest suites once |

## Author

**Aadithya G** – [@aadithya5675-collab](https://github.com/aadithya5675-collab)
