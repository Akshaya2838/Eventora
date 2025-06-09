-- Table for Events
CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    status VARCHAR(50) DEFAULT 'Draft',
    price VARCHAR(50),
    date DATE,
    location VARCHAR(255),
    attendees INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for Team Members
CREATE TABLE team_members (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Modified Table for Bookings
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    event JSONB NOT NULL, -- Store event details as JSON
    sub_events JSONB, -- Store selected sub-events as JSON
    venue JSONB, -- Store selected venue as JSON
    food_packages JSONB, -- Store selected food packages as JSON
    employees JSONB, -- Store selected employees as JSON
    user_details JSONB NOT NULL, -- Store user details (name, contact, email, guests, customization)
    date DATE NOT NULL, -- New date column
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for faster queries
CREATE INDEX idx_bookings_created_at ON bookings (created_at);

-- Table for Contact Us
CREATE TABLE enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);