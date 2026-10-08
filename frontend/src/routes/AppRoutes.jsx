import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ProtectedRoute } from './ProtectedRoute';

// Layouts
import { StudentLayout } from '../layouts/StudentLayout';
import { MessAdminLayout } from '../layouts/MessAdminLayout';
import { HostelAdminLayout } from '../layouts/HostelAdminLayout';
import { SuperAdminLayout } from '../layouts/SuperAdminLayout';

// Auth Pages
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';
import { ForgotPassword } from '../pages/auth/ForgotPassword';
import { ResetPassword } from '../pages/auth/ResetPassword';

// Student Pages
import { StudentHome } from '../pages/student/StudentHome';
import { WeeklyMenuPage } from '../pages/student/WeeklyMenuPage';
import { Attendance } from '../pages/student/Attendance';
import { Feedback } from '../pages/student/Feedback';
import { Complaints } from '../pages/student/Complaints';
import { Achievements } from '../pages/student/Achievements';
import { Statistics } from '../pages/student/Statistics';
import { Profile } from '../pages/student/Profile';

// Hostel Admin (Warden) Pages
import { HostelAdminDashboard } from '../pages/hostelAdmin/HostelAdminDashboard';
import { HostelStudents } from '../pages/hostelAdmin/HostelStudents';
import { HostelMessOverview } from '../pages/hostelAdmin/HostelMessOverview';
import { HostelComplaints } from '../pages/hostelAdmin/HostelComplaints';
import { HostelRebates } from '../pages/hostelAdmin/HostelRebates';

// Mess Admin Pages
import { MessAdminDashboard } from '../pages/messAdmin/MessAdminDashboard';
import { MenuManagement } from '../pages/messAdmin/MenuManagement';
import { AttendanceManagement } from '../pages/messAdmin/AttendanceManagement';
import { FeedbackManagement } from '../pages/messAdmin/FeedbackManagement';
import { ComplaintManagement } from '../pages/messAdmin/ComplaintManagement';
import { StudentManagement } from '../pages/messAdmin/StudentManagement';
import { Analytics } from '../pages/messAdmin/Analytics';
import { Reports } from '../pages/messAdmin/Reports';
import { Settings } from '../pages/messAdmin/Settings';

import { SuperAdminDashboard } from '../pages/superAdmin/SuperAdminDashboard';
import { HostelManagement } from '../pages/superAdmin/HostelManagement';
import { MessAdminManagement } from '../pages/superAdmin/MessAdminManagement';
import { SuperAdminFeedback } from '../pages/superAdmin/SuperAdminFeedback';
import { SystemSettings } from '../pages/superAdmin/SystemSettings';

// Dynamic Role Home Redirection
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'super_admin') return <Navigate to="/superadmin" replace />;
  if (user.role === 'hostel_admin') return <Navigate to="/hostel-admin" replace />;
  if (user.role === 'mess_admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/student" replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Root / Default Redirect based on logged-in role */}
      <Route path="/" element={<RoleBasedRedirect />} />

      {/* Student Portal Routes (Restricted strictly to Student and Super Admin) */}
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={['student', 'super_admin']}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<StudentHome />} />
        <Route path="menu" element={<WeeklyMenuPage />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="feedback" element={<Feedback />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="compliments" element={<Complaints />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="statistics" element={<Statistics />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Hostel Admin (Warden) Portal Routes */}
      <Route
        path="/hostel-admin"
        element={
          <ProtectedRoute allowedRoles={['hostel_admin', 'super_admin']}>
            <HostelAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<HostelAdminDashboard />} />
        <Route path="students" element={<HostelStudents />} />
        <Route path="mess-overview" element={<HostelMessOverview />} />
        <Route path="complaints" element={<HostelComplaints />} />
        <Route path="rebates" element={<HostelRebates />} />
      </Route>

      {/* Mess Admin Portal Routes (Restricted strictly to Mess Admin, Hostel Admin and Super Admin) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['mess_admin', 'hostel_admin', 'super_admin']}>
            <MessAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<MessAdminDashboard />} />
        <Route path="menu" element={<MenuManagement />} />
        <Route path="attendance" element={<AttendanceManagement />} />
        <Route path="feedback" element={<FeedbackManagement />} />
        <Route path="complaints" element={<ComplaintManagement />} />
        <Route path="compliments" element={<ComplaintManagement />} />
        <Route path="students" element={<StudentManagement />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Super Admin Portal Routes (Restricted strictly to Super Admin) */}
      <Route
        path="/superadmin"
        element={
          <ProtectedRoute allowedRoles={['super_admin']}>
            <SuperAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="hostels" element={<HostelManagement />} />
        <Route path="admins" element={<MessAdminManagement />} />
        <Route path="feedback" element={<SuperAdminFeedback />} />
        <Route path="settings" element={<SystemSettings />} />
      </Route>

      {/* Default Catch-all */}
      <Route path="*" element={<RoleBasedRedirect />} />
    </Routes>
  );
};
