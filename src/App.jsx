import Column from "./components/Column";

const COLUMNS = [
  { id: "todo", title: "Por hacer" },
  { id: "doing", title: "En progreso" },
  { id: "review", title: "Revisión" },
  { id: "done", title: "Hecho" },
];

const tasks = [
  { id: 1, title: "Diseñar la base de datos", status: "done", priority: "alta" },
  { id: 2, title: "Crear el login", status: "done", priority: "media" },
  { id: 3, title: "Escribir pruebas", status: "todo", priority: "baja" },
  { id: 4, title: "Preparar la demo", status: "doing", priority: "alta" },
  { id: 5, title: "Actualizar el README", status: "review", priority: "baja" },
  { id: 6, title: "Revisar el diseño de la interfaz", status: "review", priority: "media" },
  { id: 7, title: "Configurar el despliegue", status: "todo", priority: "alta" },
];

export default function App() {
  return (
    <main>
      <h1>Kanban ({tasks.length} tareas)</h1>
      <div className="board">
        {COLUMNS.map((c) => (
          <Column
            key={c.id}
            title={c.title}
            tasks={tasks.filter((t) => t.status === c.id)}
          />
        ))}
      </div>
    </main>
  );
}