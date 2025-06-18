const express = require('express');
const router = express.Router();
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');

// GET /api/tasks - Obtener todas las tareas con filtros y paginación
router.get('/', getAllTasks);

// GET /api/tasks/:id - Obtener tarea por ID
router.get('/:id', getTaskById);

// POST /api/tasks - Crear nueva tarea
router.post('/', createTask);

// PUT /api/tasks/:id - Actualizar tarea
router.put('/:id', updateTask);

// DELETE /api/tasks/:id - Eliminar tarea
router.delete('/:id', deleteTask);

module.exports = router;