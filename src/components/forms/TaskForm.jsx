import { useState } from "react";
import { apiFetch } from "../../utilities/api";

export default function TaskForm({ projectId, onTaskCreated }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await apiFetch(`/projects/${projectId}/tasks`, {
                method: "POST",
                body: JSON.stringify({ title, description }),
            });

            onTaskCreated(res.task);

            setTitle("");
            setDescription("");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add Task</h3>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label>Description:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button type="submit">Add Task</button>
        </form>
    );
}
