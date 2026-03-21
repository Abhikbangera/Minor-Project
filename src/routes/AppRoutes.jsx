import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import StudentDashboard from "../pages/student/StudentDashboard";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminLogin from "../pages/auth/AdminLogin";
import StudentSignup from "../pages/auth/StudentSignup";
import StudentLogin from "../pages/auth/StudentLogin";
import TeacherSignup from "../pages/auth/TeacherSignup";
import TeacherLogin from "../pages/auth/TeacherLogin";
import StudentSetup from "../pages/student/StudentSetup";
import SubjectPage from "../pages/student/SubjectPage";
import TeacherSetup from "../pages/teacher/TeacherSetup";
import ChapterPage from "../pages/student/ChapterPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/student-signup" element={<StudentSignup />} />
        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/student-setup" element={<StudentSetup />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/subject/:subject" element={<SubjectPage />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/teacher-setup" element={<TeacherSetup />} />
        <Route path="/subject/:subject/chapter/:chapter" element={<ChapterPage />} />
        <Route path="/chapter/:subject/:chapter" element={<ChapterPage />} />

      </Routes>
    </BrowserRouter>
  );
}