module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define("Usuario", {
    IDUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type:DataTypes.STRING,
      allowNull:false
    },
    apellido: {
      type:DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      allowNull:false,
      unique:true
    },
    contrasena: {
      type:DataTypes.STRING,
      allowNull:false
    }
  });

  Usuario.associate = (models) => {
    // Define asociaciones si las hay, por ejemplo:
    // Usuario.hasMany(models.Tarea, { foreignKey: "idusuario" });
  };

  return Usuario;
};