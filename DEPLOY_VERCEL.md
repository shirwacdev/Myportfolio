# Vercel Deployment Guide (Shirwac Dev)

This project is already configured for Vercel with:
- Frontend: `frontend/` (Vite build)
- Backend API: `api/index.js` -> Express app in `backend/src/app.js`
- API route prefix: `/api`

## 1) Push to GitHub
From project root:

```bash
git add .
git commit -m "Prepare Vercel deployment"
git push origin master
```

## 2) Import to Vercel
1. Open Vercel dashboard.
2. Click **Add New Project**.
3. Import this GitHub repository.
4. Keep root directory as project root.
5. Deploy once.

## 3) Set Environment Variables in Vercel
In Project -> Settings -> Environment Variables, add:

- `MONGO_URI`
- `MONGO_DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `ADMIN_USERNAME`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CLIENT_URL`

Set `CLIENT_URL` to your Vercel domain, e.g.:
- `https://myportfolio.vercel.app`

Then redeploy.

## 4) Verify
After deploy:
- `https://<your-domain>/api/health` should return success JSON.
- Login at `/admin/login` should work with your admin credentials.
- Contact form should submit and save to MongoDB.

## Notes
- Frontend uses `VITE_API_URL=/api` (already set), so API calls work on same domain.
- Local development still works via Vite proxy (`frontend/vite.config.js`).
