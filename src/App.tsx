
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin routes */}
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<Dashboard />} />
            <Route path="/admin/courses" element={<Dashboard />} />
            <Route path="/admin/schedule" element={<Dashboard />} />
            <Route path="/admin/reports" element={<Dashboard />} />
            <Route path="/admin/faculty" element={<Dashboard />} />
            <Route path="/admin/finance" element={<Dashboard />} />
            <Route path="/admin/settings" element={<Dashboard />} />
            
            {/* Faculty routes */}
            <Route path="/faculty/dashboard" element={<Dashboard />} />
            <Route path="/faculty/students" element={<Dashboard />} />
            <Route path="/faculty/courses" element={<Dashboard />} />
            <Route path="/faculty/assessments" element={<Dashboard />} />
            <Route path="/faculty/schedule" element={<Dashboard />} />
            <Route path="/faculty/messages" element={<Dashboard />} />
            <Route path="/faculty/settings" element={<Dashboard />} />
            
            {/* Student routes */}
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/student/courses" element={<Dashboard />} />
            <Route path="/student/schedule" element={<Dashboard />} />
            <Route path="/student/assignments" element={<Dashboard />} />
            <Route path="/student/grades" element={<Dashboard />} />
            <Route path="/student/fees" element={<Dashboard />} />
            <Route path="/student/messages" element={<Dashboard />} />
            <Route path="/student/settings" element={<Dashboard />} />
            
            {/* Handle 404 and fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
