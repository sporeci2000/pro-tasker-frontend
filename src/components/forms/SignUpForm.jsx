import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUpForm() {
    // Local state for input fields
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // For showing error messages
    const [error, setError] = useState("");

    // Access register function from context
    const { register } = useAuth();

    // For navigation after register
    const navigate = useNavigate();

    // Handle form submit
    async function handleSubmit(e) {
        e.preventDefault();

        try {
            // Try registering user
            await register({ username, email, password });

            // If successful → go to dashboard
            navigate("/dashboard");
        } catch (err) {
            // If register fails → show error message
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>

            {/* Error message */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Username field */}
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>

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
            <button type="submit">Register</button>
        </form>
    );
}
