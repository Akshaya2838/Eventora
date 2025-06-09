const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createEvent = async (eventData) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO events (title, category, status, price, date, location, attendees)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `;
    const values = [
      eventData.title,
      eventData.category || null,
      eventData.status,
      eventData.price ? parseInt(eventData.price) : null,
      eventData.date || null,
      eventData.location || null,
      eventData.attendees ? parseInt(eventData.attendees) : null,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getAllEvents = async () => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM events ORDER BY created_at DESC';
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

const updateEvent = async (id, eventData) => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE events
      SET title = $1, category = $2, status = $3, price = $4, date = $5, location = $6, attendees = $7
      WHERE id = $8
      RETURNING *
    `;
    const values = [
      eventData.title,
      eventData.category || null,
      eventData.status,
      eventData.price ? parseInt(eventData.price) : null,
      eventData.date || null,
      eventData.location || null,
      eventData.attendees ? parseInt(eventData.attendees) : null,
      id,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteEvent = async (id) => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM events WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

module.exports = { createEvent, getAllEvents, updateEvent, deleteEvent };