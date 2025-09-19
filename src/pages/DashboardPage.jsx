import { useEffect, useState, useRef } from "react";
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
    const [selectedProjectId, setSelectedProjectId] = useState(null);

    // Ref map for project cards
    const projectRefs = useRef({});

    // Load projects 
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

    // Auto-select first project if none
    useEffect(() => {
        if (projects.length > 0 && !selectedProjectId) {
            setSelectedProjectId(projects[0]._id);
        }
    }, [projects, selectedProjectId]);

    // Scroll to selected project card
    useEffect(() => {
        if (selectedProjectId && projectRefs.current[selectedProjectId]) {
            projectRefs.current[selectedProjectId].scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }, [selectedProjectId]);

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
            {/* Sidebar */}
            <aside className="sidebar">
                <h2 className="sidebar-title">Hi, {user?.username}!</h2>

                {/* Project Form */}
                <ProjectForm onProjectCreated={handleProjectCreated} />

                {/* Projects List  */}
                <div className="sidebar-projects">
                    <h3>Your Projects</h3>
                    {loading ? (
                        <p>Loading...</p>
                    ) : projects.length === 0 ? (
                        <p>No projects yet.</p>
                    ) : (
                        <ul className="project-names">
                            {projects.map((project) => (
                                <li
                                    key={project._id}
                                    className={selectedProjectId === project._id ? "active" : ""}
                                    onClick={() => setSelectedProjectId(project._id)}
                                >
                                    {project.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Logout */}
                <button onClick={logout} className="logout-btn">
                    Logout
                </button>
            </aside>

            {/* Main Content */}
            <main className="dashboard-main">
                <h1>Welcome to your Dashboard</h1>
                <p>Select a project or create a new one.</p>

                {/* Full project cards */}
                <section className="projects">
                    {error && <p className="error-text">{error}</p>}

                    {loading ? (
                        <p>Loading projects...</p>
                    ) : projects.length === 0 ? (
                        <p>No projects yet. Create one from the sidebar.</p>
                    ) : (
                        <ul className="projects-list">
                            {projects.map((project) => (
                                <li
                                    key={project._id}
                                    ref={(el) => (projectRefs.current[project._id] = el)}
                                    className={selectedProjectId === project._id ? "project-card active" : "project-card"}
                                >
                                    <ProjectItem
                                        project={project}
                                        onProjectUpdated={handleProjectUpdated}
                                        onProjectDeleted={handleProjectDeleted}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </div>
    );
}
