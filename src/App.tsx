import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/shared/context/ThemeContext";
import { LanguageProvider } from "@/shared/context/LanguageContext";
import { GlobalAlertProvider } from "@/shared/context/GlobalAlertContext";
import { GlobalAlert } from "@/shared/components/GlobalAlert/GlobalAlert";
import Index from "./pages/home/home";
import Login from "./pages/login/login";
import Dashboard from "./pages/dashboard/dashboard";
import History from "./pages/history/history";
import Settings from "./pages/settings/settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// ========================================
// PROTECTED ROUTES - NOT ACTIVATED YET
// ========================================
// To activate authentication protection:
// 1. Uncomment the ProtectedRoute component below
// 2. Wrap protected routes with <ProtectedRoute> component
// 3. Delete these comments
// 4. Protected routes are: Dashboard, History, Settings
// ========================================

// const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
//   const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//   return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
// };

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <GlobalAlertProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <GlobalAlert />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                {/* PROTECTED ROUTES - Currently disabled. To activate, wrap with <ProtectedRoute> */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
                {/* Example of activated protection:
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                */}
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </GlobalAlertProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
