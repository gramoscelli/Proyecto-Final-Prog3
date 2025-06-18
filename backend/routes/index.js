const express = require('express');
const router = express.Router();

// Importar rutas
const taskRoutes = require('./taskRoutes');

// Ruta de prueba
router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Rutas de tareas
router.use('/tasks', taskRoutes);

module.exports = router;