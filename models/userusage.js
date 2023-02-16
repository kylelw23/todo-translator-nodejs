//user usage model
module.exports = (sequelize, DataTypes) => {
  const UserUsage = sequelize.define(
    "userusage",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      loginTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      logoutTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      translateTime: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      translateButtonClick: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      todoItemCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: true }
  );
  UserUsage.associate = (models) => {
    UserUsage.belongsTo(models.user);
  };
  return UserUsage;
};
