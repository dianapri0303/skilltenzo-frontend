# Skilltenzo — Frontend

Skilltenzo is a course marketplace where users can browse practical courses, add them to a cart, complete a purchase and track their learning progress.

This repository contains the frontend of the application. The backend lives in a separate repository (see below).

**Live app:** https://skilltenzo-frontend.vercel.app

## Features

- Home page with a hero section, trending courses and category tiles
- Course catalog with category filter, search, sorting and pagination, all synced with the URL
- Course details page with instructor info, course facts and a purchase panel with three states: available, in cart, already owned
- Cart with checkout form, validation and order placement
- My Learning page with in-progress and completed tabs, progress counters and course completion
- Registration and login with JWT authentication and session restore on app start
- Custom toast notifications for success, error and info states
- 404 and 500 pages, in-page error and empty states
- Responsive layout for mobile (375px), tablet (768px) and desktop (1280px+)

## Tech stack

- **Next.js 16** (App Router)
- **TypeScript**
- **CSS Modules**
- **React Context** for auth and cart state
- **axios** with request and response interceptors
- **react-hook-form** + **yup** for form validation
- **react-toastify** for notifications
- `next/image` and `next/font` for image and font optimization

## Getting started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

```bash
git clone https://github.com/dianapri0303/skilltenzo-frontend.git
cd skilltenzo-frontend
npm install
```

### Environment variables

Create a `.env.local` file in the project root, using `.env.example` as a template:

```
NEXT_PUBLIC_API_URL=https://skilltenzo-backend.onrender.com/api
```

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_API_URL` | Base URL of the Skilltenzo API, including the `/api` prefix |

### Running the app

```bash
npm run dev
```

The app will be available at http://localhost:3000

### Other scripts

```bash
npm run build
npm run start
npm run lint
```

## Project structure

```
src/
  app/            route segments, layouts, error and not-found pages
  components/     UI components, each with its own CSS module
  context/        global auth and cart state
  lib/            axios instance, formatters, toast helpers
  styles/         design tokens and shared styles
  types/          shared TypeScript types for API data
public/
  icons.svg       SVG sprite used by the Icon component
```

## Backend

- Repository: https://github.com/dianapri0303/skilltenzo-backend
- API: https://skilltenzo-backend.onrender.com

The backend is hosted on a free Render plan, so the first request after a period of inactivity may take up to a minute while the service wakes up.

## Design and specification

- Figma mockup: https://www.figma.com/design/W7dtWpgPOZxLfKmlHOM02V/Skilltenzo
- Technical specification: https://docs.google.com/spreadsheets/d/1UkmUxliSYW8tqJg_CtHJkpFdM2r6MNs-vqX5sF6IJds/edit?gid=0#gid=0
