import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleToggle = () => {
    onToggle(task._id, !task.completed);
  };

  const handleDelete = () => {
    onDelete(task._id);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const trimmed = editTitle.trim();
    if (!trimmed || trimmed === task.title) {
      setIsEditing(false);
      setEditTitle(task.title);
      return;
    }
    onEdit(task._id, trimmed);
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={handleToggle}
        />
      </label>

      {isEditing ? (
        <form onSubmit={handleEditSubmit} style={{ flex: 1, display: 'flex', gap: '8px' }}>
          <input
            type="text"
            className="task-edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-sm">Save</button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={() => {
              setIsEditing(false);
              setEditTitle(task.title);
            }}
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <span className="task-title">{task.title}</span>
          <div className="task-actions">
            <button
              className="task-action-btn"
              onClick={() => setIsEditing(true)}
              title="Edit task"
            >
              Edit
            </button>
            <button
              className="task-action-btn delete"
              onClick={handleDelete}
              title="Delete task"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TaskItem;
