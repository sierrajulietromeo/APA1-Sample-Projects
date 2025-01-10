const { Sequelize } = require('sequelize');
const LibraryItem = require('./LibraryItem');
const Book = require('./Book');
const Magazine = require('./Magazine');
const Author = require('./Author');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './library.sqlite'
});

const models = {
  LibraryItem: LibraryItem.init(sequelize),
  Book: Book.init(sequelize),
  Magazine: Magazine.init(sequelize),
  Author: Author.init(sequelize)
};

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

module.exports = {
  ...models,
  sequelize
};

