import SignUpForm from "../components/forms/SignUpForm";
import "./RegisterPage.css";

export default function RegisterPage() {
    return (
        <div className="register-page">
            <div className="register-left">
                <h1 className="register-title">Pro-Tasker</h1>
                <p className="register-tagline">Manage your projects with ease!</p>
            </div>

            <div className="register-right">
                <h2>Create Account</h2>
                <p className="form-subtitle">Start managing your projects today!</p>

                <SignUpForm />

                <p className="form-footer">
                    Already have an account?{" "}
                    <a href="/login" className="register-link">
                        Login here
                    </a>
                </p>
            </div>
        </div>
    );
}
