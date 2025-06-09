import styled from 'styled-components';
import { Container, Button } from 'react-bootstrap';

const BookingContainer = styled(Container)`
  padding: 2rem 0;
  text-align: center;
`;

function FinalBooking() {
  return (
    <BookingContainer>
      <h2>Booking Confirmed!</h2>
      <p>Your event has been successfully booked.</p>
      <Button variant="primary" href="/dashboard">
        Go to Dashboard
      </Button>
    </BookingContainer>
  );
}

export default FinalBooking;