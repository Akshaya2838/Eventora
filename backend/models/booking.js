const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  event: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  sub_events: {
    type: DataTypes.JSONB,
  },
  venue: {
    type: DataTypes.JSONB,
  },
  food_packages: {
    type: DataTypes.JSONB,
  },
  employees: {
    type: DataTypes.JSONB,
  },
  user_details: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  date: { // New date field
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'bookings',
  timestamps: false,
});

module.exports = Booking;