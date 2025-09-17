import { useEffect, useState } from "react";
import { apiFetch } from "../utilities/api";
import ProjectItem from "../components/ProjectItem";
import ProjectForm from "../components/forms/ProjectForm";

export default function DashboardPage() {
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
        <div>
            <h1>Your Projects</h1>

            {/* Project form at top */}
            <ProjectForm onProjectCreated={handleProjectCreated} />

            {/* Error display */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Loading state or project list */}
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
        </div>
    );
}
