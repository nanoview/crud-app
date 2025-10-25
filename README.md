# CRUD App

Simple CRUD example app with a React (Vite) frontend and an Express + MongoDB backend.

Live demo
---------

- Frontend (Vercel): https://crud-app-one-tawny.vercel.app/
- Example backend API (Render): https://crud-app-9rm5.onrender.com/api/books

Overview
--------

This project demonstrates a minimal full-stack CRUD application:
- Frontend: React + Vite
- Backend: Express + Mongoose (MongoDB)

Local development
-----------------

1. Backend

	 - Copy `backend/.env.example` to `backend/.env` and fill in `MONGO_URI`.
	 - From the `backend` folder:
		 ```powershell
		 npm install
		 node server.js
		 ```

	 The backend will attempt to connect to MongoDB using `MONGO_URI`. If a connection can't be established, a development in-memory fallback API is started so the frontend can still be used during local UI development.

2. Frontend

	 - Optionally create `frontend/.env` from `frontend/.env.example`.
	 - For local development set `VITE_API_URL=http://localhost:5000/api/books` (this is the default fallback used by the app).
	 - From the `frontend` folder:
		 ```powershell
		 npm install
		 npm run dev
		 ```

Environment variables
---------------------

- Frontend: `VITE_API_URL` — full API base URL (e.g. `https://your-backend.example.com/api/books`). Vercel/Netlify will bake this into the build if you set it in their UI.
- Backend: `MONGO_URI` — MongoDB connection string. Do not commit real credentials. Use `backend/.env.example` as a template.

Deploying
---------

- Frontend (Vercel): create a Vercel project from this GitHub repo. In Environment Variables set `VITE_API_URL` to your deployed backend URL (for example, the Render URL above). Vercel will build and publish the frontend.
- Backend (Render or similar): create a Web Service, set `MONGO_URI` in the environment, and deploy. Ensure MongoDB Atlas network access allows the host.

Security / housekeeping
----------------------

- If real secrets were committed into the repo historically (e.g. a `.env` file), rotate those credentials immediately and remove the secrets from the repository history.
- `.gitignore` is used to keep local `.env` files out of commits.

Notes
-----

- The frontend defaults to using `VITE_API_URL` when present. When running locally it falls back to `http://localhost:5000/api/books` so the UI works against a locally running backend or the backend fallback.

Enjoy!

