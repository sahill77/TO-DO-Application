import { useState } from 'react';

function TaskForm({ onAddTask, loading }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAddTask(trimmed);
    setTitle('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-input"
        placeholder="Add ur task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        autoFocus
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={!title.trim() || loading}
      >
        {loading ? 'Adding...' : 'Add Task'}
      </button>
    </form>
  );
}

export default TaskForm;
