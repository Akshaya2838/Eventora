const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createTeamMember = async (teamMemberData) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO team_members (name, role, email, phone)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [
      teamMemberData.name,
      teamMemberData.role || null,
      teamMemberData.email,
      teamMemberData.phone || null,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const getAllTeamMembers = async () => {
  const client = await pool.connect();
  try {
    const query = 'SELECT * FROM team_members ORDER BY created_at DESC';
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
};

const updateTeamMember = async (id, teamMemberData) => {
  const client = await pool.connect();
  try {
    const query = `
      UPDATE team_members
      SET name = $1, role = $2, email = $3, phone = $4
      WHERE id = $5
      RETURNING *
    `;
    const values = [
      teamMemberData.name,
      teamMemberData.role || null,
      teamMemberData.email,
      teamMemberData.phone || null,
      id,
    ];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
};

const deleteTeamMember = async (id) => {
  const client = await pool.connect();
  try {
    const query = 'DELETE FROM team_members WHERE id = $1';
    await client.query(query, [id]);
  } finally {
    client.release();
  }
};

module.exports = { createTeamMember, getAllTeamMembers, updateTeamMember, deleteTeamMember };