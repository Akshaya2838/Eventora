import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Button, Card } from 'react-bootstrap';

const ConfirmationSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmationContainer = styled(Container)`
  max-width: 800px;
  padding: 2rem 4rem;
`;

const ConfirmationCard = styled(motion(Card))`
  border: none;
  border-radius: 15px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #F7FAFC 0%, #EDF2F7 100%);
  padding: 2rem;
`;

const ConfirmationTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #1E3A8A;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const ConfirmationSubtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
  text-align: center;
  margin-bottom: 2rem;
`;

const DetailSection = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 0.75rem;
  border-bottom: 2px solid #DBEAFE;
  padding-bottom: 0.25rem;
`;

const DetailText = styled.p`
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 0.5rem;
`;

const DetailPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3B82F6;
  margin-bottom: 0.5rem;
  text-align: center;
`;

const DetailList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;

  li {
    font-size: 1.2rem;
    color: #718096;
    margin-bottom: 0.5rem;
    padding-left: 1.5rem;
    position: relative;

    &:before {
      content: '•';
      color: #3B82F6;
      font-size: 1.5rem;
      position: absolute;
      left: 0;
      top: -2px;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
`;

const ActionButton = styled(Button)`
  background: linear-gradient(90deg, #3B82F6, #1E3A8A);
  border: none;
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 25px;
  transition: background 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background: linear-gradient(90deg, #1E3A8A, #3B82F6);
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.3);
  }
`;

function Confirmation() {
  const { state } = useLocation();
  const { bookingDetails } = state || {};
  const navigate = useNavigate();

  console.log('Confirmation page - bookingDetails:', bookingDetails);

  if (!bookingDetails) {
    return (
      <ConfirmationSection>
        <ConfirmationContainer>
          <ConfirmationCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ConfirmationTitle>No Booking Found</ConfirmationTitle>
            <ConfirmationSubtitle>
              Please book an event to see the confirmation details.
            </ConfirmationSubtitle>
          </ConfirmationCard>
          <ActionButton onClick={() => navigate('/events')}>
            Back to Events
          </ActionButton>
        </ConfirmationContainer>
      </ConfirmationSection>
    );
  }

  const { event, sub_events, venue, food_packages, employees, user_details, date } = bookingDetails;

  if (!event || !user_details) {
    console.error('Missing required fields in bookingDetails:', bookingDetails);
    return (
      <ConfirmationSection>
        <ConfirmationContainer>
          <ConfirmationCard
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ConfirmationTitle>Invalid Booking Data</ConfirmationTitle>
            <ConfirmationSubtitle>
              Some required booking details are missing. Please try booking again.
            </ConfirmationSubtitle>
          </ConfirmationCard>
          <ActionButton onClick={() => navigate('/events')}>
            Back to Events
          </ActionButton>
        </ConfirmationContainer>
      </ConfirmationSection>
    );
  }

  const numGuests = parseInt(user_details.guests) || 0;
  const foodCostPerPerson = (food_packages || []).reduce((sum, fp) => sum + (fp.price || 0), 0);
  const totalFoodCost = numGuests * foodCostPerPerson;
  const baseCost =
    (event.price || 0) +
    (sub_events || []).reduce((sum, se) => sum + (se.price || 0), 0) +
    (venue ? (venue.price || 0) : 0) +
    (employees || []).reduce((sum, emp) => sum + (emp.price || 0), 0);
  const subtotal = baseCost + totalFoodCost;
  const taxRate = 0.05;
  const taxAmount = subtotal * taxRate;
  const finalTotal = subtotal + taxAmount;

  const handleDownload = () => {
    // Use the browser's print functionality to save as PDF
    window.print();
  };

  return (
    <ConfirmationSection>
      <ConfirmationContainer>
        <ConfirmationCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ConfirmationTitle>Booking Confirmation</ConfirmationTitle>
          <ConfirmationSubtitle>
            Thank you for your booking! Here are your event details.
          </ConfirmationSubtitle>

          <DetailSection>
            <SectionTitle>Event</SectionTitle>
            <DetailText>{event.name || 'N/A'} - ₹{(event.price || 0).toLocaleString()}</DetailText>
          </DetailSection>

          {sub_events && sub_events.length > 0 && (
            <DetailSection>
              <SectionTitle>Sub-Events</SectionTitle>
              <DetailList>
                {sub_events.map((subEvent) => (
                  <li key={subEvent.id}>
                    {subEvent.name || 'N/A'} - ₹{(subEvent.price || 0).toLocaleString()}
                  </li>
                ))}
              </DetailList>
            </DetailSection>
          )}

          {venue && (
            <DetailSection>
              <SectionTitle>Venue</SectionTitle>
              <DetailText>{venue.name || 'N/A'} - ₹{(venue.price || 0).toLocaleString()}</DetailText>
            </DetailSection>
          )}

          {food_packages && food_packages.length > 0 && (
            <DetailSection>
              <SectionTitle>Food Packages</SectionTitle>
              <DetailText>
                Number of Guests: {numGuests}
              </DetailText>
              <DetailList>
                {food_packages.map((foodPackage) => (
                  <li key={foodPackage.id}>
                    {foodPackage.name || 'N/A'} - ₹{(foodPackage.price || 0).toLocaleString()} per person
                  </li>
                ))}
              </DetailList>
              <DetailText>
                Total Food Cost: ₹{totalFoodCost.toLocaleString()} ({numGuests} × ₹{foodCostPerPerson.toLocaleString()})
              </DetailText>
            </DetailSection>
          )}

          {employees && employees.length > 0 && (
            <DetailSection>
              <SectionTitle>Employees</SectionTitle>
              <DetailList>
                {employees.map((employee) => (
                  <li key={employee.id}>
                    {employee.name || 'N/A'} - ₹{(employee.price || 0).toLocaleString()}
                  </li>
                ))}
              </DetailList>
            </DetailSection>
          )}

          <DetailSection>
            <SectionTitle>User Details</SectionTitle>
            <DetailText>Name: {user_details.name || 'N/A'}</DetailText>
            <DetailText>Contact: {user_details.contact || 'N/A'}</DetailText>
            <DetailText>Email: {user_details.email || 'N/A'}</DetailText>
            <DetailText>Event Date: {date || 'N/A'}</DetailText>
            <DetailText>Number of Guests: {user_details.guests || 'N/A'}</DetailText>
            {user_details.customization && (
              <DetailText>Customization: {user_details.customization}</DetailText>
            )}
          </DetailSection>

          <DetailSection>
            <SectionTitle>Pricing Breakdown</SectionTitle>
            <DetailText>Subtotal: ₹{subtotal.toLocaleString()}</DetailText>
            <DetailText>Tax (5%): ₹{taxAmount.toLocaleString()}</DetailText>
            <DetailPrice>Final Total: ₹{finalTotal.toLocaleString()}</DetailPrice>
          </DetailSection>
        </ConfirmationCard>

        <ButtonGroup>
          <ActionButton onClick={handleDownload}>
            Download Confirmation (PDF)
          </ActionButton>
          <ActionButton onClick={() => navigate('/events')}>
            Back to Events
          </ActionButton>
        </ButtonGroup>
      </ConfirmationContainer>
    </ConfirmationSection>
  );
}

export default Confirmation;