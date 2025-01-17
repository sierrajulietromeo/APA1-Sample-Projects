const express = require('express');
const router = express.Router();
const { Task, TeamMember } = require('../models');

// GET all tasks (Read operation)
router.get('/', async (req, res) => {
  try {
    // Fetch all tasks including associated TeamMember data
    const tasks = await Task.findAll({ include: TeamMember });
    // Fetch all team members for the task assignment dropdown
    const teamMembers = await TeamMember.findAll();
    // Render the index view with tasks and team members data
    res.render('index', { tasks, teamMembers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST a new task (Create operation)
router.post('/tasks', async (req, res) => {
  try {
    // Create a new task with the data from the request body
    await Task.create(req.body);
    // Redirect to the home page after creating the task
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// GET form to edit a task (Read operation for update)
router.get('/tasks/:id/edit', async (req, res) => {
  try {
    // Find the task by its primary key (id)
    const task = await Task.findByPk(req.params.id);
    // Fetch all team members for the task assignment dropdown
    const teamMembers = await TeamMember.findAll();
    if (task) {
      // Render the edit task view with the task and team members data
      res.render('editTask', { task, teamMembers });
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// PUT (update) a task (Update operation)
router.post('/tasks/:id', async (req, res) => {
  try {
    // Find the task by its primary key (id)
    const task = await Task.findByPk(req.params.id);
    if (task) {
      // Update the task with the data from the request body
      await task.update(req.body);
      // Redirect to the home page after updating the task
      res.redirect('/');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE a task (Delete operation)
router.post('/tasks/:id/delete', async (req, res) => {
  try {
    // Find the task by its primary key (id)
    const task = await Task.findByPk(req.params.id);
    if (task) {
      // Delete the task from the database
      await task.destroy();
      // Redirect to the home page after deleting the task
      res.redirect('/');
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

