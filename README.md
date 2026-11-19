# RK7 Business Website

Frontend-only React website built with Vite, React Router, and Lucide icons. The admin demonstration manages tool photos and construction/event photos using browser localStorage.

Supabase's JavaScript client is installed and configured from local Vite environment variables. The client is not currently used by any page, and this setup does not create or access backend resources.

## Run locally

```sh
npm install
npm run dev
```

Build the static production bundle with `npm run build`.

## Supabase client configuration

The local project values belong in `.env.local` (already configured for this workspace). The checked-in `.env.example` documents the required variable names. Restart Vite after changing environment values. Only the URL and publishable key belong in this frontend; never put a Supabase secret or service-role key in a `VITE_` variable.

## Demo administrator

- Email: `admin@rk7.in`
- Password: `rk7demo`

Admin sign-in is a frontend demonstration only. The admin area has three sections: Tools (required image, optional name), Construction (required image, optional site name and description), and Events (required image, optional description).

## Project structure

```text
src/
  App.jsx       Public pages, shared components, and admin screens
  data.js       Central mock data and localStorage access
  main.jsx      React entry point and router
  styles.css    RK7 visual system and responsive layouts
```
