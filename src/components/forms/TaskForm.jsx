import { useState } from "react";
import { apiFetch } from "../../utilities/api";

export default function TaskForm({ projectId, onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("To Do");
    const [priority, setPriority] = useState("Medium");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await apiFetch(`/projects/${projectId}/tasks`, {
                method: "POST",
                body: JSON.stringify({ title, description, status, priority }),
            });

            onTaskCreated(res.task);

            setTitle("");
            setDescription("");
            setStatus("To Do");
            setPriority("Medium");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h3>Add Task</h3>

            <label>Title</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                required
            />

            <label>Description</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
            />

            <label>Status</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option>To Do</option>
                <option>In Progress</option>
                <option>Done</option>
            </select>

            <label>Priority</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button type="submit" className="add-btn">Add Task</button>
        </form>
    );
}
