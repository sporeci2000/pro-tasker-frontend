import { useState } from "react";
import { apiFetch } from "../utilities/api";

export default function TaskItem({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [priority, setPriority] = useState(task.priority);
    const [error, setError] = useState("");

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const updated = await apiFetch(
                `/projects/${task.project}/tasks/${task._id}`,
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

    async function handleDelete() {
        try {
            await apiFetch(`/projects/${task.project}/tasks/${task._id}`, {
                method: "DELETE",
            });
            onTaskDeleted(task._id);
        } catch (err) {
            setError(err.message);
        }
    }

    if (isEditing) {
        return (
            <li>
                <form onSubmit={handleUpdate}>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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

                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </form>
            </li>
        );
    }

    return (
        <li>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Priority: {task.priority}</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
}
