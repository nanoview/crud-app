Deployment guide
----------------

This repository contains a React (Vite) frontend and an Express backend.

Environment
- Frontend expects VITE_API_URL (for Vercel use) that points to the backend API, e.g. https://api.example.com/api/books
- Backend expects MONGO_URI in environment (don't commit `.env`).

Vercel (frontend)
- In Vercel project settings -> Environment Variables, set `VITE_API_URL` to your backend URL (e.g. https://my-app.onrender.com/api/books).
- Vercel will build the frontend and the env variable will be baked into the static bundle.

Render or any Node host (backend)
- Create a Web Service on Render and set the environment variable `MONGO_URI`.
- Ensure network access for the MongoDB user (Atlas whitelist) or use a private network.

Local development
- Backend: copy `backend/.env.example` to `backend/.env` and fill values, then from `backend` run:
  ```powershell
  npm install
  node server.js
  ```

- Frontend: copy `frontend/.env.example` to `frontend/.env` (optional) and set `VITE_API_URL` to `http://localhost:5000/api/books` if running backend locally. Then from `frontend` run:
  ```powershell
  npm install
  npm run dev
  ```

Notes
- We added a fallback in the backend to run an in-memory API if Mongo fails — convenient for frontend testing but not for production.
- Rotate any credentials that were previously committed.
