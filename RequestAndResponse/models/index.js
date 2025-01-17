const { Sequelize } = require('sequelize');
const Task = require('./Task');
const TeamMember = require('./TeamMember');

// Initialize Sequelize with SQLite database
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite' // Store the database in this file
});

// Initialize models
const models = {
  Task: Task.init(sequelize),
  TeamMember: TeamMember.init(sequelize)
};

// Run .associate if it exists to create relationships between models
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

module.exports = {
  ...models,
  sequelize
};

