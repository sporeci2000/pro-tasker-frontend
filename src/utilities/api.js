// Gets the base URL of the backend from .env
const BASE_URL = import.meta.env.VITE_SERVER_ORIGIN;

export async function apiFetch(endpoint, options = {}) {

    // Retrieves the token from localStorage if user is logged in
    const token = localStorage.getItem("token");

    const res = await fetch(`${BASE_URL}/api${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...options.headers,
        },
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "API request failed");
    }

    return res.json();
}
