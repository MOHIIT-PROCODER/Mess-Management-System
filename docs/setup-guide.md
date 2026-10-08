# Mess Management System - Setup & Deployment Guide

This guide covers step-by-step instructions for running the application locally and deploying to production services.

---

## 1. Local Prerequisites
Ensure you have the following tools installed:
- Node.js >= 18.x
- Git
- Access to a Supabase project instance

---

## 2. Setting Up Supabase Database
1. Log in to [Supabase Dashboard](https://supabase.com).
2. Create a new project named `mess-management`.
3. Open the **SQL Editor** tab.
4. Execute the migration scripts in numerical order from `supabase/migrations/`:
   - `001_profiles.sql`
   - `002_hostels.sql`
   - `003_food_menus.sql`
   - `004_attendance.sql`
   - `005_feedback.sql`
   - `006_complaints.sql`
   - `007_trophies.sql`
   - `008_student_trophies.sql`
   - `009_notifications.sql`
   - `010_bug_reports.sql`
   - `011_mess_admins.sql`
5. Execute `supabase/seed.sql` to populate initial hostels and meal data.

---

## 3. Environment Variable Configuration

### Backend Setup (`backend/.env`)
```env
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-key
CLOUDINARY_API_SECRET=your-cloudinary-secret
GROQ_API_KEY=gsk_your_groq_key
```

### Frontend Setup (`frontend/.env`)
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_BACKEND_URL=http://localhost:5000/api
```

---

## 4. Installation & Execution
From the root directory:

```bash
# 1. Install all dependencies
npm run setup

# 2. Start Backend Express API (Runs on http://localhost:5000)
npm run dev:backend

# 3. Start Frontend Vite Dev Server (Runs on http://localhost:5173)
npm run dev:frontend
```

---

## 5. Production Build & Deployment
- **Frontend**: Deploy to Vercel / Netlify using build command `npm run build` in `frontend/`.
- **Backend**: Deploy to Render / Railway / AWS ECS using start command `node src/server.js` in `backend/`.
