const { Task } = require('../models');

// GET /api/tasks - Obtener todas las tareas
const getAllTasks = async (req, res) => {
  try {
    const { status, priority, page = 1, limit = 10 } = req.query;
    
    const where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    
    const offset = (page - 1) * limit;
    
    const { count, rows: tasks } = await Task.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['createdAt', 'DESC']]
    });
    
    res.json({
      tasks,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks', message: error.message });
  }
};

// GET /api/tasks/:id - Obtener tarea por ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task', message: error.message });
  }
};

// POST /api/tasks - Crear nueva tarea
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    
    const task = await Task.create({
      title,
      description,
      status: status || 'pending',
      priority: priority || 'medium',
      dueDate: dueDate ? new Date(dueDate) : null
    });
    
    res.status(201).json({ 
      message: 'Task created successfully',
      task 
    });
  } catch (error) {
    res.status(400).json({ error: 'Error creating task', message: error.message });
  }
};

// PUT /api/tasks/:id - Actualizar tarea
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, priority, dueDate } = req.body;
    
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = await task.update({
      title: title || task.title,
      description: description !== undefined ? description : task.description,
      status: status || task.status,
      priority: priority || task.priority,
      dueDate: dueDate !== undefined ? (dueDate ? new Date(dueDate) : null) : task.dueDate,
      completedAt: status === 'completed' ? new Date() : (status === 'pending' || status === 'in_progress' ? null : task.completedAt)
    });
    
    res.json({
      message: 'Task updated successfully',
      task: updatedTask
    });
  } catch (error) {
    res.status(400).json({ error: 'Error updating task', message: error.message });
  }
};

// DELETE /api/tasks/:id - Eliminar tarea
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByPk(id);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task', message: error.message });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};