# Editorial Chronology

A Vite + React + TypeScript frontend challenge build inspired by the provided wall-calendar references.

## Stack

- Vite 8
- React 19
- TypeScript 6
- Tailwind CSS 4
- Motion
- Day.js
- Lucide React

## Features

- Editorial wall-calendar hero layout inspired by the supplied screens
- Interactive day range selection across the month grid
- Notes panel tied to the selected date range
- Notes archive view with search and styled cards
- Add note / event modal
- Client-side persistence with `localStorage`
- Responsive sidebar and mobile-friendly layout

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Notes

- Data persistence is frontend-only and stored in the browser.
- The current implementation combines the provided calendar, notes, and modal references into one cohesive React app shell.
