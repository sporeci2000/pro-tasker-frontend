import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css'

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

export default function App() {

  return (
    <>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/projects/:id"
          element={
            <ProtectedRoute>
              <ProjectDetailsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<h1>404 - Page Not Found</h1>} />

      </Routes>


    </>
  )
}

