# ShareTaxi.co

ShareTaxi.co is a monorepo prototype for a Kerala-focused ride-sharing platform combining scheduled intercity rides, on-demand shared rides, and recurring commute-sharing flows.

## Workspaces

- `apps/web` — responsive public site and admin dashboard
- `packages/shared` — shared domain types and mock service data
- `packages/validation` — Zod validation schemas for search and booking inputs

## Getting started

```bash
npm install
npm run dev
```

The web app is available at `http://localhost:3000`.

## Mobile app

```bash
cd apps/mobile
npx expo start --android
# or
npx expo start --ios
# or export a production bundle
npx expo export --platform web --clear
```

The mobile prototype is implemented in `apps/mobile` with Expo Router and includes the Home, Bookings, Profile, Settings, Intercity search, On-demand ride, and Daily commute flows.
