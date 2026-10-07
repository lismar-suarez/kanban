import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") {
      setError("El título no puede estar vacío.");
      return;
    }
    const errorMessage = onAdd(title.trim(), priority);
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setError("");
    setTitle("");
  }

  return (
    <>
      <form className="task-form" onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError("");
          }}
          placeholder="Nueva tarea..."
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button>Agregar</button>
      </form>
      {error && <p className="form-error">{error}</p>}
    </>
  );
}