const { createEvent, getAllEvents, updateEvent, deleteEvent } = require('../models/event');

const createEventHandler = async (req, res) => {
  try {
    const eventData = req.body;
    const newEvent = await createEvent(eventData);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllEventsHandler = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateEventHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const eventData = req.body;
    const updatedEvent = await updateEvent(id, eventData);
    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteEventHandler = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteEvent(id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createEventHandler, getAllEventsHandler, updateEventHandler, deleteEventHandler };