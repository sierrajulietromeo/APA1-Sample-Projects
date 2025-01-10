const { DataTypes } = require('sequelize');
const LibraryItem = require('./LibraryItem');

class Magazine extends LibraryItem {
  static init(sequelize) {
    return super.init({
      issueNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'Magazine'
    });
  }
}

module.exports = Magazine;

