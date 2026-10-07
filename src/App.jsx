import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useEffect, useMemo, useState } from "react";

const initialTasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el login", status: "done", priority: "media" },
  { id: 3, title: "Escribir pruebas", status: "todo", priority: "baja" },
  { id: 4, title: "Preparar la demo", status: "doing", priority: "alta" },
  { id: 5, title: "Actualizar el README", status: "review", priority: "baja" },
  { id: 6, title: "Revisar el diseño de la interfaz", status: "review", priority: "media" },
  { id: 7, title: "Configurar el despliegue", status: "todo", priority: "alta" },
];

export default function App() {
  const [tasks, setTasks] = useLocalStorage("kanban-tasks", initialTasks);
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = `Kanban (${tasks.length} tareas)`;
  }, [tasks]);

  const filteredTasks = useMemo(
    () =>
      tasks.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      ),
    [tasks, query]
  );

  function addTask(title, priority) {
    const exists = tasks.some(
      (t) => t.title.toLowerCase() === title.toLowerCase()
    );
    if (exists) return "Ya existe una tarea con ese título.";
    const newTask = { id: Date.now(), title, status: "todo", priority };
    setTasks([...tasks, newTask]);
    return "";
  }

  function moveTask(id, newStatus) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
  }

  function removeTask(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function editTaskTitle(id, newTitle) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t))
    );
  }

  function clearDone() {
    setTasks(tasks.filter((t) => t.status !== "done"));
  }

  return (
    <main>
      <h1>Kanban ({tasks.length} tareas)</h1>
      <TaskForm onAdd={addTask} />
      <input
        className="search"
        placeholder="Buscar tareas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={filteredTasks.filter((t) => t.status === c.id)}
            onMove={moveTask}
            onRemove={removeTask}
            onEdit={editTaskTitle}
          />
        ))}
      </div>
      <button className="clear-done" onClick={clearDone}>
        Vaciar columna Hecho
      </button>
    </main>
  );
}