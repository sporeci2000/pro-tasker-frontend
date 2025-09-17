import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignInForm() {
    // Local state for input fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // For showing error messages
    const [error, setError] = useState("");

    // Access login function from context
    const { login } = useAuth();

    // For navigation after login
    const navigate = useNavigate();

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault(); // stop page refresh

        try {
            // Try logging in with context
            await login({ email, password });

            // If successful → go to dashboard
            navigate("/dashboard");
        } catch (err) {
            // If login fails → show error message
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>

            {/* Error message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Email field */}
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {/* Password field */}
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            {/* Submit button */}
            <button type="submit">Login</button>
        </form>
    );
}
