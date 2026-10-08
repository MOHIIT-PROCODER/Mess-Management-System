# 🚀 Netlify Deployment Guide for Mess Management System

This guide outlines step-by-step instructions for deploying the frontend React + Vite + Tailwind application to Netlify.

---

## 📋 Configured Deployment Files

1. **[`netlify.toml`](file:///d:/ITERP11/netlify.toml)**: Pre-configured build settings for Netlify:
   - Base Directory: `frontend`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - SPA Rewrite Rule: `/* -> /index.html 200`
2. **[`frontend/public/_redirects`](file:///d:/ITERP11/frontend/public/_redirects)**: Handles single-page application (SPA) routing for `react-router-dom`.

---

## 🌐 Method 1: GitHub / GitLab Netlify Integration (Recommended)

1. Push your project to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Mess Management System"
   git remote add origin https://github.com/yourusername/mess-management-system.git
   git push -u origin main
   ```
2. Open [Netlify Dashboard](https://app.netlify.com).
3. Click **"Add new site"** ➔ **"Import an existing project"**.
4. Select **GitHub** and pick your `mess-management-system` repository.
5. Netlify will auto-detect settings from `netlify.toml`:
   - **Base Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `frontend/dist`
6. Add Environment Variables in Netlify Settings (`Site settings > Environment variables`):
   - `VITE_SUPABASE_URL` = `https://your-project.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = `your-supabase-anon-key`
   - `VITE_BACKEND_URL` = `https://your-express-backend.onrender.com/api`
7. Click **"Deploy site"**.

---

## 💻 Method 2: Netlify CLI Direct Terminal Deploy

```bash
# 1. Build the production dist folder
npm run build:frontend

# 2. Authenticate with Netlify CLI
npx netlify login

# 3. Deploy to Production
npx netlify deploy --dir=frontend/dist --prod
```
