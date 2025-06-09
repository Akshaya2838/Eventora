const { createTeamMember, getAllTeamMembers, updateTeamMember, deleteTeamMember } = require('../models/teamMember');

const createTeamMemberHandler = async (req, res) => {
  try {
    const teamMemberData = req.body;
    const newTeamMember = await createTeamMember(teamMemberData);
    res.status(201).json(newTeamMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllTeamMembersHandler = async (req, res) => {
  try {
    const teamMembers = await getAllTeamMembers();
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateTeamMemberHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const teamMemberData = req.body;
    const updatedTeamMember = await updateTeamMember(id, teamMemberData);
    res.status(200).json(updatedTeamMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteTeamMemberHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteTeamMember(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createTeamMemberHandler, getAllTeamMembersHandler, updateTeamMemberHandler, deleteTeamMemberHandler };