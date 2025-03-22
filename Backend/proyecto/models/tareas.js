module.exports = (sequelize, DataTypes) => {
  const Tarea = sequelize.define("Tarea", {
    IDTarea:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado_tarea: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
  });

  Tarea.associate = (models) => {
    Tarea.belongsTo(models.Usuario, { foreignKey: "IDUsuario" });
  };

  return Tarea;
};