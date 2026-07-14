# Qyadat Platform

The redesigned Arabic website for the national platform for Omani women leaders.

## Requirements

- Node.js 22
- npm

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production Check

```bash
npm run build
npm test
```

## Deploy To Vercel

1. Upload this project to a Git repository.
2. Import the repository in Vercel.
3. Keep the detected framework as **Next.js**.
4. Keep the root directory as the repository root.
5. Leave the build command and output directory on their Next.js defaults.
6. Deploy.

No environment variables are required.

After deployment, connect the final domain in Vercel. The canonical URL and
social preview URLs are generated from the incoming production hostname.

## Commands

- `npm run dev` starts the development server.
- `npm run build` creates the native Next.js production build.
- `npm run start` serves the production build locally.
- `npm run lint` checks code quality.
- `npm test` builds and validates the deployable project.
