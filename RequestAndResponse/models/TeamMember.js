const { Model, DataTypes } = require('sequelize');

class TeamMember extends Model {
  static init(sequelize) {
    return super.init({
      // Define the structure of the TeamMember model
      name: {
        type: DataTypes.STRING,
        allowNull: false // Name is required
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email must be unique
        validate: {
          isEmail: true // Validate that the email is in correct format
        }
      },
      role: {
        type: DataTypes.STRING
      }
    }, {
      sequelize,
      modelName: 'TeamMember'
    });
  }

  static associate(models) {
    // Define the relationship between TeamMember and Task
    TeamMember.hasMany(models.Task, { foreignKey: 'assignedTo' });
  }
}

module.exports = TeamMember;

