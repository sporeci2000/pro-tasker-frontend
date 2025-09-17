import { useState } from "react";
import { apiFetch } from "../../utilities/api";

export default function ProjectForm({ onProjectCreated }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            const res = await apiFetch("/projects", {
                method: "POST",
                body: JSON.stringify({ name, description }),
            });

            // Call parent callback to refresh list
            onProjectCreated(res.project);

            // Reset form
            setName("");
            setDescription("");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create New Project</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <div>
                <label>Project Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

            <button type="submit">Add Project</button>
        </form>
    );
}
