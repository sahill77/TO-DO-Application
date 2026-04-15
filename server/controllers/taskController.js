import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ message: 'Failed to get tasks' });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ 
        message: 'Task name is required'
       });
    }

    const task = await Task.create({
      title: title.trim(),
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error('Creating task giving error:', error.message);
    res.status(500).json({ message: 'Failed to create task' });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        message: 'only authorized person can update task'
       });
    }

    if (req.body.title !== undefined) {
      task.title = req.body.title.trim();
    }
    if (req.body.completed !== undefined) {
      task.completed = req.body.completed;
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    console.error('Updating task giving error:', error.message);
    res.status(500).json({ message: 'Failed to update task' });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'only authorized person can delete task' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Deleting task giving error:', error.message);
    res.status(500).json({ message: 'Failed to delete task' });
  }
};
