import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();

    // Still checking localStorage => show nothing for a moment
    if (loading) {
        return <p>Loading...</p>;
    }

    // If no user => redirect to login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Otherwise, show the requested page
    return children;
}