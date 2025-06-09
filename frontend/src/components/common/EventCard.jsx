import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Card, Button } from 'react-bootstrap';

const StyledCard = styled(motion(Card))`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  margin: 1.5rem 0;
  background: linear-gradient(145deg, #ffffff, #f0f4f8);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const EventImage = styled(Card.Img)`
  height: 250px;
  object-fit: cover;
  border-bottom: 4px solid #3B82F6; /* Primary Blue */
`;

const EventTitle = styled(Card.Title)`
  font-size: 1.8rem;
  font-weight: 700;
  color: #1E3A8A; /* Secondary Blue */
  margin-bottom: 0.5rem;
`;

const EventCategory = styled.p`
  font-size: 0.9rem;
  color: #718096;
  margin-bottom: 0.5rem;
  font-style: italic;
`;

const EventPrice = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #3B82F6; /* Primary Blue */
  margin-bottom: 1rem;
`;

const EventDescription = styled(Card.Text)`
  font-size: 1rem;
  color: #4a5568;
  line-height: 1.6;
`;

const StyledButton = styled(Button)`
  background: linear-gradient(90deg, #3B82F6, #1E3A8A); /* Blue Gradient */
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #1E3A8A, #3B82F6); /* Reversed Blue Gradient */
    transform: scale(1.05);
  }
`;

function EventCard({ event, onChoose }) {
  return (
    <StyledCard
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <EventImage variant="top" src={event.image || '/logo.png'} />
      <Card.Body>
        <EventTitle>{event.name}</EventTitle>
        <EventCategory>{event.category}</EventCategory>
        <EventPrice>₹{event.price.toLocaleString()}</EventPrice>
        <EventDescription>{event.description}</EventDescription>
        <StyledButton onClick={() => onChoose(event)}>
          Choose Package
        </StyledButton>
      </Card.Body>
    </StyledCard>
  );
}

export default EventCard;