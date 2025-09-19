import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../utilities/api";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/forms/TaskForm";
import "./ProjectDetailsPage.css";

export default function ProjectDetailsPage() {
    const { id } = useParams(); // projectId from URL
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false);

    // Load project and tasks
    useEffect(() => {
        async function loadData() {
            try {
                const projectData = await apiFetch(`/projects/${id}`);
                setProject(projectData);

                const taskData = await apiFetch(`/projects/${id}/tasks`);
                setTasks(taskData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, [id]);

    function handleTaskCreated(newTask) {
        setTasks((prev) => [...prev, newTask]);
        setShowForm(false); // hide form after adding
    }

    function handleTaskUpdated(updatedTask) {
        setTasks((prev) =>
            prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
    }

    function handleTaskDeleted(taskId) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
    }

    if (loading) return <p className="loading-text">Loading project...</p>;
    if (error) return <p className="error-text">{error}</p>;

    return (
        <div className="project-details">
            {/* Project Info */}
            <div className="project-header">
                <h1>{project.name}</h1>
                <p>{project.description || "No description provided."}</p>
                <div className="project-meta">
                    <span>📅 Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                    <span>⏱ Updated: {new Date(project.updatedAt).toLocaleDateString()}</span>
                </div>
            </div>

            {/* Tasks Section */}
            <section className="tasks-section">
                <div className="tasks-header">
                    <h2>Tasks</h2>
                    <button
                        className="toggle-form-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? "➖ Cancel" : "➕ Add Task"}
                    </button>
                </div>

                {showForm && (
                    <TaskForm projectId={id} onTaskCreated={handleTaskCreated} />
                )}

                {tasks.length === 0 ? (
                    <p className="empty-state"> No tasks yet. Add your first task!</p>
                ) : (
                    <ul className="tasks-list">
                        {tasks.map((task) => (
                            <TaskItem
                                key={task._id}
                                task={task}
                                projectId={id}
                                onTaskUpdated={handleTaskUpdated}
                                onTaskDeleted={handleTaskDeleted}
                            />
                        ))}
                    </ul>
                )}
            </section>
        </div>
    );
}
