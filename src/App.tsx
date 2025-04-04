import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import AdminDashboard from "./components/AdminDashboard";
import FacultyDashboard from "./components/FacultyDashboard";
import StudentDashboard from "./components/StudentDashboard";
import AttendanceAnalytics from "./components/AttendanceAnalytics";
import StudentCourses from "./components/StudentCourses";
import StudentSchedule from "./components/StudentSchedule";
import StudentAssignments from "./components/StudentAssignments";
import StudentGrades from "./components/StudentGrades";
import StudentFees from "./components/StudentFees";
import StudentMessages from "./components/StudentMessages";
import StudentSettings from "./components/StudentSettings";
import { useAuth } from "./context/AuthContext";

const queryClient = new QueryClient();

// Role-based redirect component
const RoleRedirect = () => {
  const { user } = useAuth();
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  } else if (user?.role === 'faculty') {
    return <Navigate to="/faculty/dashboard" replace />;
  } else {
    return <Navigate to="/student/dashboard" replace />;
  }
};

// Role-based route protection
const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (user.role !== allowedRole) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }
  
  return children;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dashboard" element={<RoleRedirect />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/courses" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/schedule" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/faculty" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/finance" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <ProtectedRoute allowedRole="admin">
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            {/* Faculty routes */}
            <Route path="/faculty/dashboard" element={
              <ProtectedRoute allowedRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/students" element={
              <ProtectedRoute allowedRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/courses" element={
              <ProtectedRoute allowedRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/assessments" element={
              <ProtectedRoute allowedRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/schedule" element={
              <ProtectedRoute allowedRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/messages" element={
              <ProtectedRoute allowedRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            <Route path="/faculty/settings" element={
              <ProtectedRoute allowedRole="faculty">
                <FacultyDashboard />
              </ProtectedRoute>
            } />
            
            {/* Student routes */}
            <Route path="/student/dashboard" element={
              <ProtectedRoute allowedRole="student">
                <StudentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/student/attendance" element={
              <ProtectedRoute allowedRole="student">
                <AttendanceAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/student/courses" element={
              <ProtectedRoute allowedRole="student">
                <StudentCourses />
              </ProtectedRoute>
            } />
            <Route path="/student/schedule" element={
              <ProtectedRoute allowedRole="student">
                <StudentSchedule />
              </ProtectedRoute>
            } />
            <Route path="/student/assignments" element={
              <ProtectedRoute allowedRole="student">
                <StudentAssignments />
              </ProtectedRoute>
            } />
            <Route path="/student/grades" element={
              <ProtectedRoute allowedRole="student">
                <StudentGrades />
              </ProtectedRoute>
            } />
            <Route path="/student/fees" element={
              <ProtectedRoute allowedRole="student">
                <StudentFees />
              </ProtectedRoute>
            } />
            <Route path="/student/messages" element={
              <ProtectedRoute allowedRole="student">
                <StudentMessages />
              </ProtectedRoute>
            } />
            <Route path="/student/settings" element={
              <ProtectedRoute allowedRole="student">
                <StudentSettings />
              </ProtectedRoute>
            } />
            
            {/* Handle 404 and fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
