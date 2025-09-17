import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "../utilities/api";
import TaskItem from "../components/TaskItem";
import TaskForm from "../components/forms/TaskForm";

export default function ProjectDetailsPage() {
    const { id } = useParams(); // projectId from URL
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load project + tasks when page loads
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

    // Add new task to state
    function handleTaskCreated(newTask) {
        setTasks((prev) => [...prev, newTask]);
    }

    // Update task in state
    function handleTaskUpdated(updatedTask) {
        setTasks((prev) =>
            prev.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
    }

    // Remove task from state
    function handleTaskDeleted(taskId) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
    }

    if (loading) return <p>Loading project...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;

    return (
        <div>
            <h1>{project.name}</h1>
            <p>{project.description}</p>

            <h2>Tasks</h2>
            <TaskForm projectId={id} onTaskCreated={handleTaskCreated} />

            {tasks.length === 0 ? (
                <p>No tasks yet.</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <TaskItem
                            key={task._id}
                            task={task}
                            onTaskUpdated={handleTaskUpdated}
                            onTaskDeleted={handleTaskDeleted}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
}
