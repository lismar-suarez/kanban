import { useEffect, useMemo, useState } from "react";
import Column from "./components/Column";
import TaskForm from "./components/TaskForm";
import { COLUMNS } from "./columns";
import { useBoard } from "./context/BoardContext";

export default function App() {
  const { tasks, resetBoard } = useBoard();
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

  return (
    <main>
      <h1>Kanban</h1>
      <TaskForm />
      <input
        className="search"
        placeholder="Buscar tareas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="reset-board" onClick={resetBoard}>
        Restablecer tablero
      </button>
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={filteredTasks.filter((t) => t.status === c.id)}
          />
        ))}
      </div>
    </main>
  );
}