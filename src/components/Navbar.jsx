import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                backgroundColor: "#f4f4f4",
            }}
        >
            <div>
                <Link to="/dashboard" style={{ marginRight: "1rem" }}>
                    Dashboard
                </Link>
            </div>

            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: "1rem" }}>
                            Logged in as <b>{user.username}</b>
                        </span>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ marginRight: "1rem" }}>
                            Login
                        </Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
