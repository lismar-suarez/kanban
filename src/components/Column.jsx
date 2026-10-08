import TaskCard from "./TaskCard";

export default function Column({ title, tasks }) {
  const validTasks = tasks ? tasks.filter(Boolean) : [];

  return (
    <section className="column">
      <h2>{title} ({validTasks.length})</h2>
      {validTasks.length === 0 && <p>Sin tareas</p>}
      {validTasks.map((t) => (
        <TaskCard key={t.id} task={t} />
      ))}
    </section>
  );
}