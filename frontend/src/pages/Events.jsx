import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { EVENT_TYPES, EVENTS } from '../utils/constants';

const EventsSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%); /* Soft Blue to Light Blue */
  min-height: 100vh;
`;

const EventsContainer = styled(Container)`
  max-width: 1400px;
  padding: 2rem 4rem; /* Consistent side padding */
`;

const SearchForm = styled(Form)`
  background: linear-gradient(145deg, #F7FAFC 0%, #EDF2F7 100%); /* Subtle gradient for form */
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 3rem;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;

  label {
    font-size: 1.2rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  select {
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid #CBD5E1; /* Visible border for dropdowns */
    background: #ffffff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      border-color: #A0AEC0; /* Slate-500 on hover */
    }

    &:focus {
      border-color: #3B82F6; /* Primary Blue */
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      outline: none;
    }
  }
`;

const SearchButton = styled(Button)`
  background: linear-gradient(90deg, #3B82F6, #1E3A8A); /* Blue Gradient */
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #1E3A8A, #3B82F6); /* Reversed Blue Gradient */
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  }
`;

const ResetButton = styled(Button)`
  background: linear-gradient(90deg, #718096, #4a5568);
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  margin-left: 1rem;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #4a5568, #718096);
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(113, 128, 150, 0.3);
  }
`;

const EventCard = styled(motion(Card))`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin: 1.5rem 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const EventContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const EventImage = styled(Card.Img)`
  width: 100%;
  max-width: 400px;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
  margin: 0 2rem;

  @media (max-width: 768px) {
    margin: 0 0 1.5rem 0;
    max-width: 100%;
    height: 200px;
  }
`;

const EventDetails = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

const EventTitle = styled(Card.Title)`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1E3A8A; /* Secondary Blue */
  margin-bottom: 0.75rem;
`;

const EventDescription = styled(Card.Text)`
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 0.75rem;
`;

const EventPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3B82F6; /* Primary Blue */
  margin-bottom: 0.75rem;
`;

const BookButton = styled(Button)`
  background: linear-gradient(90deg, #3B82F6, #1E3A8A); /* Blue Gradient */
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #1E3A8A, #3B82F6); /* Reversed Blue Gradient */
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  margin: 2rem 0;

  h3 {
    font-size: 1.8rem;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1.2rem;
    color: #718096;
  }
`;

function Events() {
  const navigate = useNavigate();
  const [eventType, setEventType] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(EVENTS);

  const handleSearch = (e) => {
    e.preventDefault();
    let filtered = EVENTS;

    if (eventType) {
      filtered = filtered.filter((event) => event.type === eventType);
    }

    setFilteredEvents(filtered);
  };

  const handleReset = () => {
    setEventType('');
    setFilteredEvents(EVENTS);
  };

  const handleBookNow = (event) => {
    navigate('/event-booking', { state: { event } });
  };

  return (
    <EventsSection>
      <EventsContainer>
        <SearchForm onSubmit={handleSearch}>
          <Row className="justify-content-center">
            <Col md={6}>
              <FormGroup controlId="eventType">
                <Form.Label>Type of Event</Form.Label>
                <Form.Select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                >
                  <option value="">All Event Types</option>
                  {EVENT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </FormGroup>
            </Col>
            <Col md={3} className="d-flex align-items-end">
              <SearchButton type="submit">Search</SearchButton>
              <ResetButton variant="secondary" onClick={handleReset}>
                Reset
              </ResetButton>
            </Col>
          </Row>
        </SearchForm>

        {filteredEvents.length === 0 ? (
          <NoResults>
            <h3>No Events Found</h3>
            <p>Try adjusting your filters to find more events.</p>
          </NoResults>
        ) : (
          <Row>
            {filteredEvents.map((event, index) => {
              const isImageLeft = index % 2 === 0; // Image on left for even indices (0, 2, ...)
              return (
                <Col md={12} key={event.id}>
                  <EventCard
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <EventContainer>
                      {isImageLeft ? (
                        <>
                          <EventImage
                            src={event.image || '/logo.png'}
                            alt={event.name}
                          />
                          <EventDetails>
                            <EventTitle>{event.name}</EventTitle>
                            <EventDescription>{event.description}</EventDescription>
                            <EventPrice>₹{event.price.toLocaleString()}</EventPrice>
                            <BookButton onClick={() => handleBookNow(event)}>
                              Book Now
                            </BookButton>
                          </EventDetails>
                        </>
                      ) : (
                        <>
                          <EventDetails>
                            <EventTitle>{event.name}</EventTitle>
                            <EventDescription>{event.description}</EventDescription>
                            <EventPrice>₹{event.price.toLocaleString()}</EventPrice>
                            <BookButton onClick={() => handleBookNow(event)}>
                              Book Now
                            </BookButton>
                          </EventDetails>
                          <EventImage
                            src={event.image || '/logo.png'}
                            alt={event.name}
                          />
                        </>
                      )}
                    </EventContainer>
                  </EventCard>
                </Col>
              );
            })}
          </Row>
        )}
      </EventsContainer>
    </EventsSection>
  );
}

export default Events;