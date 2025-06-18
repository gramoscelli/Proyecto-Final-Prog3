'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Configurar entorno de desarrollo',
        description: 'Instalar y configurar todas las herramientas necesarias para el proyecto',
        status: 'completed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Diseñar base de datos',
        description: 'Crear el modelo de datos y las relaciones entre tablas',
        status: 'in_progress',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Implementar API REST',
        description: 'Desarrollar todos los endpoints necesarios para el CRUD de tareas',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Escribir documentación',
        description: 'Crear documentación técnica del proyecto y guía de uso',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Hacer pruebas unitarias',
        description: 'Implementar tests para validar el funcionamiento de la aplicación',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Optimizar rendimiento',
        description: 'Revisar y mejorar la velocidad de respuesta de la API',
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};