'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tareas', {
      IDTarea: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING,
        allowNull:false
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull:true
      },
      estado: {
        type: Sequelize.STRING,
        allowNull:false
      },
      IDUsuario: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Usuarios', // Nombre de la tabla a la que hace referencia
          key: 'IDUsuario',  // Clave primaria de la tabla 'Usuarios'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE', // Elimina las tareas si se elimina el usuario
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tareas');
  }
};