import SignInForm from "../components/forms/SignInForm";
import "./LoginPage.css";

export default function LoginPage() {
    return (
        <div className="login-page">
            <div className="login-left">
                <h1 className="app-title">Pro-Tasker</h1>
                <p className="app-tagline">Manage all your tasks in one place!</p>
            </div>

            <div className="login-right">
                <h2>Welcome Back!</h2>
                <p className="form-subtitle">Keep all your credentials safe!</p>

                <SignInForm />

                <p className="form-footer">
                    Don’t have an account?{" "}
                    <a href="/register" className="register-link">Register here</a>
                </p>
            </div>
        </div>
    );
}
