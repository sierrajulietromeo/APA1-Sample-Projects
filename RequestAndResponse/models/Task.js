const { Model, DataTypes } = require('sequelize');

class Task extends Model {
  static init(sequelize) {
    return super.init({
      // Define the structure of the Task model
      title: {
        type: DataTypes.STRING,
        allowNull: false // Title is required
      },
      description: {
        type: DataTypes.TEXT // Description can be longer text
      },
      status: {
        type: DataTypes.ENUM('To Do', 'In Progress', 'Done'), // Status can only be one of these three values
        defaultValue: 'To Do' // Default status is 'To Do'
      },
      dueDate: {
        type: DataTypes.DATE // Due date is stored as a date
      }
    }, {
      sequelize,
      modelName: 'Task'
    });
  }

  static associate(models) {
    // Define the relationship between Task and TeamMember
    Task.belongsTo(models.TeamMember, { foreignKey: 'assignedTo' });
  }
}

module.exports = Task;

