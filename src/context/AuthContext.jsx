import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../utilities/api";

// This will store user info, token, and auth functions
const AuthContext = createContext();

// Custom hook
export function useAuth() {
    return useContext(AuthContext);
}

// Wrap the app and give access to the auth state
export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Runs once when the app loads
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) setToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser));

        setLoading(false);
    }, []);

    // Login
    async function login(credentials) {
        const res = await apiFetch("/auth/login", {
            method: "POST",
            body: JSON.stringify(credentials),
        });

        setUser(res.user);
        setToken(res.token);

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
    }

    // Register
    async function register(data) {
        const res = await apiFetch("/auth/register", {
            method: "POST",
            body: JSON.stringify(data),
        });

        setUser(res.user);
        setToken(res.token);

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
    }

    // Logout
    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    // Makes the context data available to the entire app
    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
