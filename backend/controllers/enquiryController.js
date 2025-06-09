const Enquiry = require('../models/enquiryModel');

exports.createEnquiry = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Basic validation
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Validate email format (Sequelize already does this, but adding for clarity)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Create new enquiry
    const enquiry = await Enquiry.create({
      name,
      email,
      phone,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully',
      data: enquiry,
    });
  } catch (error) {
    console.error('Error creating enquiry:', error.message);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: 'Validation error: ' + error.errors[0].message });
    }
    res.status(500).json({ error: 'Server error: ' + error.message });
  }
};