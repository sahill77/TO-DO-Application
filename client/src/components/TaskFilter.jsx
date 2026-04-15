function TaskFilter({ current, onChange, counts }) {
  const filters = [
    { key: 'all', label: 'All', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  return (
    <div className="task-filters">
      {filters.map((f) => (
        <button
          key={f.key}
          className={`filter-btn ${current === f.key ? 'active' : ''}`}
          onClick={() => onChange(f.key)}
        >
          {f.label} ({f.count})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
