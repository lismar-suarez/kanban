import { useState } from "react";
import { COLUMNS } from "../columns";

export default function TaskCard({ task, onMove, onRemove, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  function startEdit() {
    setDraft(task.title);
    setEditing(true);
  }

  function saveEdit() {
    if (draft.trim() !== "") onEdit(task.id, draft.trim());
    setEditing(false);
  }

  return (
    <article className={`card prio-${task.priority}`}>
      {editing ? (
        <input
          className="card-edit"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={saveEdit}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveEdit();
            if (e.key === "Escape") setEditing(false);
          }}
          autoFocus
        />
      ) : (
        <strong onDoubleClick={startEdit}>{task.title}</strong>
      )}
      <small>Prioridad: {task.priority}</small>
      <div className="card-actions">
        <select
          value={task.status}
          onChange={(e) => onMove(task.id, e.target.value)}
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <button onClick={() => onRemove(task.id)}>Eliminar</button>
      </div>
    </article>
  );
}