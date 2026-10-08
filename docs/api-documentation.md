# API Documentation

The backend REST API runs on Express.js (default port `5000`) and serves as the intermediary for complex actions, QR token generation, Groq AI insights, Cloudinary image uploads, and report generation.

## Base URL
`http://localhost:5000/api`

---

## Endpoints Summary

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Create student or admin account
- `POST /api/auth/login` - Authenticate with email/password and obtain Supabase token
- `POST /api/auth/forgot-password` - Request password reset email
- `GET /api/auth/me` - Fetch logged in user profile

### Food Menu (`/api/menu`)
- `GET /api/menu/today?hostel_id={id}` - Get today's meal schedule
- `GET /api/menu/weekly?hostel_id={id}` - Get 7-day food menu
- `POST /api/menu` - Create or update meal items (Mess Admin)
- `DELETE /api/menu/:id` - Delete menu slot

### Attendance & QR Verification (`/api/attendance`)
- `POST /api/attendance/generate-qr` - Generate encrypted QR token for current meal
- `POST /api/attendance/scan-qr` - Verify QR token at counter and mark present
- `GET /api/attendance/live?hostel_id={id}` - Fetch real-time dining room counter stats
- `GET /api/attendance/history` - Fetch student attendance history

### Feedback & Ratings (`/api/feedback`)
- `POST /api/feedback` - Submit star rating, comment, and meal photo
- `GET /api/feedback/summary?hostel_id={id}` - Get rating aggregates & sentiment distribution

### Complaints (`/api/complaints`)
- `POST /api/complaints` - Lodge new mess complaint
- `GET /api/complaints` - List complaints (filtered by student or hostel)
- `PATCH /api/complaints/:id/status` - Update status & add admin response

### AI Insights & Recommendations (`/api/ai`)
- `POST /api/ai/recommendations` - Run Groq LLM model to analyze feedback & recommend weekly menu optimizations
- `GET /api/ai/waste-prediction` - Estimate meal consumption and potential surplus waste

### File Uploads (`/api/upload`)
- `POST /api/upload/image` - Upload photo to Cloudinary (returns image URL)

### Reports (`/api/reports`)
- `GET /api/reports/attendance/pdf` - Download PDF attendance report
- `GET /api/reports/food/excel` - Download Excel meal stats
