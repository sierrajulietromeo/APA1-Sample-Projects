const express = require('express');
const router = express.Router();
const { TeamMember } = require('../models');

// GET all team members (Read operation)
router.get('/', async (req, res) => {
  try {
    // Fetch all team members from the database
    const teamMembers = await TeamMember.findAll();
    // Render the team view with the team members data
    res.render('team', { teamMembers });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// POST a new team member (Create operation)
router.post('/', async (req, res) => {
  try {
    // Create a new team member with the data from the request body
    await TeamMember.create(req.body);
    // Redirect to the team page after creating the team member
    res.redirect('/team');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

// DELETE a team member (Delete operation)
router.post('/:id/delete', async (req, res) => {
  try {
    // Find the team member by its primary key (id)
    const teamMember = await TeamMember.findByPk(req.params.id);
    if (teamMember) {
      // Delete the team member from the database
      await teamMember.destroy();
      // Redirect to the team page after deleting the team member
      res.redirect('/team');
    } else {
      res.status(404).send('Team member not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

