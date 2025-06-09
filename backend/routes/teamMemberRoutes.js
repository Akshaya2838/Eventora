const express = require('express');
const router = express.Router();
const { createTeamMemberHandler, getAllTeamMembersHandler, updateTeamMemberHandler, deleteTeamMemberHandler } = require('../controllers/teamMemberController');

router.post('/', createTeamMemberHandler);
router.get('/', getAllTeamMembersHandler);
router.put('/:id', updateTeamMemberHandler);
router.delete('/:id', deleteTeamMemberHandler);

module.exports = router;