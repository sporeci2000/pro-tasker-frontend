import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../utilities/api";
import ProjectItem from "../components/ProjectItem";
import ProjectForm from "../components/forms/ProjectForm";
import "./DashboardPage.css";

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load projects on first render
    useEffect(() => {
        async function loadProjects() {
            try {
                const data = await apiFetch("/projects");
                setProjects(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    // Add new project
    function handleProjectCreated(newProject) {
        setProjects((prev) => [...prev, newProject]);
    }

    // Update existing project
    function handleProjectUpdated(updatedProject) {
        setProjects((prev) =>
            prev.map((p) => (p._id === updatedProject._id ? updatedProject : p))
        );
    }

    // Delete project
    function handleProjectDeleted(projectId) {
        setProjects((prev) => prev.filter((p) => p._id !== projectId));
    }

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <h1>Welcome, {user?.username} 👋</h1>
                <button onClick={logout}>Logout</button>
            </header>

            <section className="projects">
                <h2>Your Projects</h2>

                <ProjectForm onProjectCreated={handleProjectCreated} />

                {error && <p style={{ color: "red" }}>{error}</p>}

                {loading ? (
                    <p>Loading projects...</p>
                ) : projects.length === 0 ? (
                    <p>No projects yet. Create one above.</p>
                ) : (
                    <ul>
                        {projects.map((project) => (
                            <ProjectItem
                                key={project._id}
                                project={project}
                                onProjectUpdated={handleProjectUpdated}
                                onProjectDeleted={handleProjectDeleted}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
