const express = require('express');
const router = express.Router();
const { createEventHandler, getAllEventsHandler, updateEventHandler, deleteEventHandler } = require('../controllers/eventController');

router.post('/', createEventHandler);
router.get('/', getAllEventsHandler);
router.put('/:id', updateEventHandler);
router.delete('/:id', deleteEventHandler);

module.exports = router;