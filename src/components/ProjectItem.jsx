import { useState } from "react";
import { Link } from "react-router-dom";
import { apiFetch } from "../utilities/api";

export default function ProjectItem({ project, onProjectUpdated, onProjectDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [error, setError] = useState("");

    async function handleUpdate(e) {
        e.preventDefault();
        try {
            const updated = await apiFetch(`/projects/${project._id}`, {
                method: "PUT",
                body: JSON.stringify({ name, description }),
            });
            onProjectUpdated(updated);
            setIsEditing(false);
        } catch (err) {
            setError(err.message);
        }
    }

    async function handleDelete() {
        try {
            await apiFetch(`/projects/${project._id}`, { method: "DELETE" });
            onProjectDeleted(project._id);
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />

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
            <h3>{project.name}</h3>
            <p>{project.description}</p>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <Link to={`/projects/${project._id}`}>View Details</Link>

            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
}
