const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Users, {
        foreignKey: 'user_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKeyConstraint: true,
      });
      Comment.belongsTo(models.trips, {
        foreignKey: 'request_id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        foreignKeyConstraint: true,
      });
    }
  }
  Comment.init({
    user_id: DataTypes.STRING,
    request_id: DataTypes.STRING,
    comment: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
