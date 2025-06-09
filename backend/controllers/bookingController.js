const Booking = require('../models/booking');

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      order: [['created_at', 'DESC']],
    });
    res.status(200).json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    console.log('Received booking data:', req.body);
    if (!req.body.event) {
      console.error('Event details are missing in the request body');
      return res.status(400).json({ message: 'Event details are required' });
    }
    if (!req.body.user_details) {
      console.error('User details are missing in the request body');
      return res.status(400).json({ message: 'User details are required' });
    }
    if (!req.body.date) {
      console.error('Date is missing in the request body');
      return res.status(400).json({ message: 'Event date is required' });
    }

    const bookingData = {
      event: req.body.event,
      sub_events: req.body.sub_events || [],
      venue: req.body.venue || null,
      food_packages: req.body.food_packages || [],
      employees: req.body.employees || [],
      user_details: req.body.user_details,
      date: req.body.date, // Store date separately
      created_at: new Date(),
      updated_at: new Date(),
    };

    console.log('Booking data to be saved:', bookingData);

    const booking = await Booking.create(bookingData);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};