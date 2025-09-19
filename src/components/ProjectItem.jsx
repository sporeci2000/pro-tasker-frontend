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
            <li className="project-card editing">
                <form onSubmit={handleUpdate}>
                    {error && <p className="error-text">{error}</p>}

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

                    <div className="project-actions">
                        <button type="submit" className="save-btn">💾 Save</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="cancel-btn">
                            ❌ Cancel
                        </button>
                    </div>
                </form>
            </li>
        );
    }

    return (
        <li className="project-card">
            <div className="project-info">
                <h3>{project.name}</h3>
                <p>{project.description || "No description provided."}</p>
            </div>

            {error && <p className="error-text">{error}</p>}

            <div className="project-actions">
                <Link to={`/projects/${project._id}`} className="details-link">🔎 View</Link>
                <button onClick={() => setIsEditing(true)} className="edit-btn">✏️ Edit</button>
                <button onClick={handleDelete} className="delete-btn">🗑️ Delete</button>
            </div>
        </li>
    );
}
