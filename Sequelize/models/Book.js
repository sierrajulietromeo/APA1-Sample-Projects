const { DataTypes } = require('sequelize');
const LibraryItem = require('./LibraryItem');

class Book extends LibraryItem {
  static init(sequelize) {
    return super.init({
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      isbn: {
        type: DataTypes.STRING,
        unique: true
      }
    }, {
      sequelize,
      modelName: 'Book'
    });
  }

  static associate(models) {
    this.belongsTo(models.Author);
  }
}

module.exports = Book;

