import { createContext, useContext, useState, useEffect } from "react";
import { apiFetch } from "../utilities/api";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load saved auth from localStorage
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken) setToken(savedToken);
        if (savedUser) setUser(JSON.parse(savedUser));

        setLoading(false);
    }, []);

    // Login
    async function login(credentials) {
        try {
            const res = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify(credentials),
            });

            setUser(res.user);
            setToken(res.token);

            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);

            return res;
        } catch (err) {
            throw new Error(err.message || "Login failed");
        }
    }

    // Register
    async function register(data) {
        try {
            const res = await apiFetch("/auth/register", {
                method: "POST",
                body: JSON.stringify(data),
            });

            setUser(res.user);
            setToken(res.token);

            localStorage.setItem("user", JSON.stringify(res.user));
            localStorage.setItem("token", res.token);

            return res;
        } catch (err) {
            throw new Error(err.message || "Registration failed");
        }
    }

    // Logout
    function logout() {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
