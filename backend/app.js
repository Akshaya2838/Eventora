const express = require('express');
const cors = require('cors');
const bookingRoutes = require('./routes/bookingRoutes');
const eventRoutes = require('./routes/eventRoutes');
const teamMemberRoutes = require('./routes/teamMemberRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/team-members', teamMemberRoutes);
app.use('/api', enquiryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});