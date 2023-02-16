//todo model
module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define(
    "todo",
    {
      task: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      translation: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      targetLanguague: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    { timestamps: true }
  );
  Todo.associate = (models) => {
    Todo.belongsTo(models.user);
  };
  return Todo;
};
