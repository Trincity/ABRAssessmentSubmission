# ABR Assessment Submission React App

## Overview

This is a React + TypeScript web application for exploring fish species data. It provides a searchable, filterable, and sortable table of fish, with detailed modal views and navigation by species alias.

## Features

- **Home Page**: Welcome and introduction.
- **Search Page**:
  - Search by species name
  - Filter by species dropdown (alphabetically sorted)
  - Sort table by species name (A–Z or Z–A)
  - Paginate results (10 or 25 rows per page, dropdown right-aligned)
  - Click a row to view fish details in a modal
  - View images, scientific names, habitat, and more
  - Navigate to related species via alias links
- **Species Alias Page**: View fish details by alias, with clickable alias navigation.
- **About Page**: Explains the Search page and its features.

## Styling

- All styles are managed in `src/index.css` using className-based selectors.
- Navigation and layout are styled for a modern, clean look.

## API & Secrets

- API URL and key are managed via environment variables in `.env` and `src/secrets.ts`.
- Example `.env`:
  ```env
  REACT_APP_API_BASE_URL=http://localhost:5001/myfishroute
  REACT_APP_API_KEY=mykey
  ```

## Getting Started

1. Clone the repository
2. Run `npm install`
3. Create a `.env` file as above (if not present)
4. Run `npm start` to launch the app

## Project Structure

- `abr-assessment/src/App.tsx` – Main app, routes, and navigation
- `abr-assessment/src/Search.tsx` – Search page logic and UI
- `abr-assessment/src/FishModal.tsx` – Modal for fish details
- `abr-assessment/src/SpeciesAliasPage.tsx` – Alias navigation and details
- `abr-assessment/src/About.tsx` – About page
- `abr-assessment/src/index.css` – All global and component styles
- `abr-assessment/src/secrets.ts` – API URL/key management
