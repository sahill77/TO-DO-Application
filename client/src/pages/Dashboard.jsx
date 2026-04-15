import { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import TaskFilter from '../components/TaskFilter';
import { fetchTasks, createTask, updateTask, deleteTask } from '../services/api';

function Dashboard({ user }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');


  const loadTasks = useCallback(async () => {
    try {
      setError('');
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Load tasks error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = async (title) => {
    setAdding(true);
    try {
      const { data } = await createTask({ title });
      setTasks((prev) => [data, ...prev]);
    } catch (err) {
      setError('Failed to add task');
      console.error('Add task error:', err);
    } finally {
      setAdding(false);
    }
  };

  const handleToggle = async (id, completed) => {
    try {
      const { data } = await updateTask(id, { completed });
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      setError('Failed to update task');
      console.error('Toggle task error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Delete task error:', err);
    }
  };

  const handleEdit = async (id, title) => {
    try {
      const { data } = await updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t._id === id ? data : t)));
    } catch (err) {
      setError('Failed to update task');
      console.error('Edit task error:', err);
    }
  };

  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <>
      <Navbar user={user} />
      <main className="dashboard">
        <div className="dashboard-header">
          <h1>My Tasks</h1>
        </div>

        <div className="dashboard-content">
          <div className="task-stats">
            <div className="stat-card total">
              <div className="stat-value">{counts.all}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-card done">
              <div className="stat-value">{counts.completed}</div>
              <div className="stat-label">Done</div>
            </div>
            <div className="stat-card pending">
              <div className="stat-value">{counts.pending}</div>
              <div className="stat-label">Pending</div>
            </div>
          </div>

          <TaskForm onAddTask={handleAddTask} loading={adding} />

          <TaskFilter current={filter} onChange={setFilter} counts={counts} />

          {error && (
            <div className="alert alert-error">
              {error}
              <button
                className="btn btn-ghost btn-sm"
                style={{ marginLeft: '8px' }}
                onClick={() => setError('')}
              >
                Cancel
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading-container">
              <div className="spinner"></div>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'completed' ? 'No completed tasks' : filter === 'pending' ? 'All clear' : 'No tasks'}
              </div>
              <p>
                {filter === 'completed'
                  ? 'No completed tasks yet'
                  : filter === 'pending'
                  ? 'All caught up! No pending tasks'
                  : 'No tasks yet. Add one above!'}
              </p>
              <p className="empty-hint">
                {filter === 'all' && 'Type a task and hit "Add Task" to get started'}
              </p>
            </div>
          ) : (
            <div className="task-list">
              {filteredTasks.map((task) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggle={handleToggle}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Dashboard;
