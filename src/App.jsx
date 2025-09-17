import { Routes, Route } from 'react-router-dom';
import './App.css'

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

export default function App() {

  return (
    <>
      
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects/:id" element={<ProjectDetailsPage />} />

        </Routes>
      

    </>
  )
}

