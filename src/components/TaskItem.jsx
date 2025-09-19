import { useState } from "react";
import { apiFetch } from "../utilities/api";

export default function TaskItem({ task, projectId, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    const [error, setError] = useState("");

    // Update task
    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const updated = await apiFetch(
                `/projects/${projectId}/tasks/${task._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify({ title, description, status, priority }),
                }
            );
            onTaskUpdated(updated);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    }

    // Delete task
    async function handleDelete() {
        try {
            await apiFetch(`/projects/${projectId}/tasks/${task._id}`, {
                method: "DELETE",
            });
            onTaskDeleted(task._id);
        } catch (err) {
            setError(err.message);
        }
    }

    // EDIT MODE
    if (isEditing) {
        return (
            <li className="task-card editing">
                <form onSubmit={handleUpdate}>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Task title"
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Task description"
                    />

                    <select value={status} onChange={(e) => setStatus(e.target.value)}>
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>

                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>

                    <div className="task-actions">
                        <button type="submit" className="save-btn">Save</button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    // VIEW MODE
    return (
        <li className="task-card">
            <h4>{task.title}</h4>
            <p>{task.description}</p>

            <div className="task-badges">
                <span className={`badge ${task.status.toLowerCase().replace(" ", "")}`}>
                    {task.status}
                </span>
                <span className={`badge ${task.priority.toLowerCase()}`}>
                    {task.priority}
                </span>
            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div className="task-actions">
                <button onClick={() => setIsEditing(true)} className="edit-btn">Edit</button>
                <button onClick={handleDelete} className="delete-btn">Delete</button>
            </div>
        </li>
    );
}
