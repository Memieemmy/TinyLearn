import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import { AuthProvider, useAuth } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminMembersPage from "./pages/admin/AdminMembersPage";
import AdminPostsPage from "./pages/admin/AdminPostsPage";

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="bottom-right" richColors />
        <Routes>
          {/* Public */}
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<ViewPostPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Admin (protected) */}
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute><AdminDashboardPage /></ProtectedRoute>}
          />
          <Route
            path="/admin/members"
            element={<ProtectedRoute><AdminMembersPage /></ProtectedRoute>}
          />
          <Route
            path="/admin/posts"
            element={<ProtectedRoute><AdminPostsPage /></ProtectedRoute>}
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
