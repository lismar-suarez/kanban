import { useState } from "react";
import { useBoard } from "../context/BoardContext";

export default function TaskForm() {
  const { addTask } = useBoard();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("media");

  function handleSubmit(e) {
    e.preventDefault();
    if (title.trim() === "") return;
    addTask(title.trim(), priority);
    setTitle("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="alta">Alta</option>
        <option value="media">Media</option>
        <option value="baja">Baja</option>
      </select>
      <button>Agregar</button>
    </form>
  );
}