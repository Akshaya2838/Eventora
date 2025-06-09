import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';

const BookingSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%);
  min-height: 100vh;
`;

const StepContainer = styled(Container)`
  max-width: 1400px;
  padding: 2rem 4rem;
`;

const StepHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  padding: 1.5rem;
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const StepTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1E3A8A;
  margin-bottom: 0.5rem;
`;

const StepSubtitle = styled.p`
  font-size: 1.2rem;
  color: #4a5568;
`;

const OptionCard = styled(motion(Card))`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  background: #ffffff;
  margin: 1.5rem 0;
  transition: transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
  border: 2px solid transparent;

  &.selected {
    border-color: #3B82F6;
    background: #DBEAFE;
    box-shadow: 0 8px 25px rgba(59, 130, 246, 0.2);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const SubEventContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const OptionImage = styled(Card.Img)`
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

const VenueImage = styled(Card.Img)`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 10px;
`;

const FoodPackageImage = styled(Card.Img)`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
`;

const EmployeeImage = styled(Card.Img)`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
`;

const OptionDetails = styled.div`
  flex: 1;
  padding: 1.5rem;
`;

const OptionTitle = styled(Card.Title)`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1E3A8A;
  margin-bottom: 0.75rem;
`;

const OptionDescription = styled.p`
  font-size: 1.2rem;
  color: #718096;
  margin-bottom: 0.75rem;
`;

const OptionPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  color: #3B82F6;
  margin-bottom: 0.75rem;
`;

const DetailsForm = styled(Form)`
  background: linear-gradient(145deg, #F7FAFC 0%, #EDF2F7 100%);
  padding: 3rem;
  border-radius: 15px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 1.5rem;

  label {
    font-size: 1.2rem;
    font-weight: 600;
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    border-radius: 8px;
    padding: 0.75rem;
    border: 1px solid #CBD5E1;
    background: #ffffff;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      border-color: #A0AEC0;
    }

    &:focus {
      border-color: #3B82F6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  }

  textarea {
    min-height: 150px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1.5rem;
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

  &.secondary {
    background: linear-gradient(90deg, #718096, #4a5568);
    &:hover {
      background: linear-gradient(90deg, #4a5568, #718096);
      box-shadow: 0 5px 15px rgba(113, 128, 150, 0.3);
    }
  }
`;

function EventBooking() {
  const { state } = useLocation();
  const { event } = state || {};
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedSubEvents, setSelectedSubEvents] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [selectedFoodPackages, setSelectedFoodPackages] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    contact: '',
    email: '',
    guests: '',
    date: '',
    customization: '',
  });

  useEffect(() => {
    if (!event) {
      console.error('No event data found in state. Redirecting to /events.');
    } else {
      console.log('Event data received:', event);
    }
  }, [event]);

  const steps = [
    'Select Sub-Events',
    'Choose Venue',
    'Select Food Packages',
    'Choose Employees',
    'Enter Details',
  ];

  const handleSubEventToggle = (subEventId) => {
    setSelectedSubEvents((prev) =>
      prev.includes(subEventId)
        ? prev.filter((id) => id !== subEventId)
        : [...prev, subEventId]
    );
  };

  const handleVenueChange = (venueId) => {
    setSelectedVenue(venueId);
  };

  const handleFoodPackageToggle = (packageId) => {
    setSelectedFoodPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleEmployeeToggle = (employeeId) => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((id) => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    if (name === 'guests') {
      const numGuests = parseInt(value);
      if (value === '' || (numGuests > 0 && Number.isInteger(numGuests))) {
        setUserDetails({ ...userDetails, [name]: value });
      }
    } else if (name === 'contact') {
      // Only allow digits
      if (/^\d*$/.test(value)) {
        setUserDetails({ ...userDetails, [name]: value });
      }
    } else {
      setUserDetails({ ...userDetails, [name]: value });
    }
  };

  const handleNextStep = () => {
    if (step === 1 && selectedSubEvents.length === 0) {
      alert('Please select at least one sub-event.');
      return;
    }
    if (step === 2 && !selectedVenue) {
      alert('Please select a venue.');
      return;
    }
    if (step === 3 && selectedFoodPackages.length === 0) {
      alert('Please select at least one food package.');
      return;
    }
    if (step === 4 && selectedEmployees.length === 0) {
      alert('Please select at least one specialized employee.');
      return;
    }
    if (step === 5) {
      if (!userDetails.name || !userDetails.contact || !userDetails.email || !userDetails.guests || !userDetails.date) {
        alert('Please fill in all required fields (Name, Contact, Email, Number of Guests, Date).');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userDetails.email)) {
        alert('Please enter a valid email address.');
        return;
      }
      const numGuests = parseInt(userDetails.guests);
      if (!Number.isInteger(numGuests) || numGuests <= 0) {
        alert('Please enter a valid number of guests (positive integer).');
        return;
      }
      const selectedDate = new Date(userDetails.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time for comparison
      if (selectedDate < today) {
        alert('Please select a future date for the event.');
        return;
      }
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleBookNow = async () => {
    const bookingDetails = {
      event,
      sub_events: event.subEvents.filter((se) => selectedSubEvents.includes(se.id)),
      venue: event.venues.find((v) => v.id === selectedVenue),
      food_packages: event.foodPackages.filter((fp) => selectedFoodPackages.includes(fp.id)),
      employees: event.employees.filter((e) => selectedEmployees.includes(e.id)),
      user_details: {
        name: userDetails.name,
        contact: userDetails.contact,
        email: userDetails.email,
        guests: userDetails.guests,
        customization: userDetails.customization,
      },
      date: userDetails.date,
    };

    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });

      if (!response.ok) {
        throw new Error('Failed to create booking');
      }

      const result = await response.json();
      console.log('Booking created:', result);

      // Navigate to confirmation page with booking details
      navigate('/confirmation', { state: { bookingDetails } });
    } catch (error) {
      console.error('Error during booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  if (!event) {
    return (
      <Container>
        <h2>No Event Selected</h2>
        <p>Please select an event to proceed with booking.</p>
        <Button variant="primary" onClick={() => navigate('/events')}>
          Back to Events
        </Button>
      </Container>
    );
  }

  return (
    <BookingSection>
      <StepContainer>
        <StepHeader>
          <StepTitle>Book Your {event.name}</StepTitle>
          <StepSubtitle>
            Step {step} of {steps.length}: {steps[step - 1]}
          </StepSubtitle>
        </StepHeader>

        {step === 1 && (
          <Row>
            {event.subEvents.map((subEvent, index) => {
              const isImageLeft = index % 2 === 0;
              return (
                <Col md={12} key={subEvent.id}>
                  <OptionCard
                    className={selectedSubEvents.includes(subEvent.id) ? 'selected' : ''}
                    onClick={() => handleSubEventToggle(subEvent.id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <SubEventContainer>
                      {isImageLeft ? (
                        <>
                          <OptionImage
                            src={subEvent.image || '/logo.png'}
                            alt={subEvent.name}
                          />
                          <OptionDetails>
                            <OptionTitle>{subEvent.name}</OptionTitle>
                            <OptionDescription>{subEvent.description}</OptionDescription>
                            <OptionPrice>
                              ₹{subEvent.price.toLocaleString()}
                            </OptionPrice>
                          </OptionDetails>
                        </>
                      ) : (
                        <>
                          <OptionDetails>
                            <OptionTitle>{subEvent.name}</OptionTitle>
                            <OptionDescription>{subEvent.description}</OptionDescription>
                            <OptionPrice>
                              ₹{subEvent.price.toLocaleString()}
                            </OptionPrice>
                          </OptionDetails>
                          <OptionImage
                            src={subEvent.image || '/logo.png'}
                            alt={subEvent.name}
                          />
                        </>
                      )}
                    </SubEventContainer>
                  </OptionCard>
                </Col>
              );
            })}
          </Row>
        )}

        {step === 2 && (
          <Row>
            {event.venues.map((venue) => (
              <Col md={6} key={venue.id}>
                <OptionCard
                  className={selectedVenue === venue.id ? 'selected' : ''}
                  onClick={() => handleVenueChange(venue.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <VenueImage src={venue.image || '/logo.png'} />
                  <Card.Body style={{ padding: '2rem' }}>
                    <OptionTitle>{venue.name}</OptionTitle>
                    <OptionDescription>{venue.description}</OptionDescription>
                    <OptionDetails>
                      <p>Address: {venue.address}</p>
                      <OptionPrice>₹{venue.price.toLocaleString()}</OptionPrice>
                    </OptionDetails>
                  </Card.Body>
                </OptionCard>
              </Col>
            ))}
          </Row>
        )}

        {step === 3 && (
          <Row>
            {event.foodPackages.map((foodPackage) => (
              <Col md={6} key={foodPackage.id}>
                <OptionCard
                  className={
                    selectedFoodPackages.includes(foodPackage.id) ? 'selected' : ''
                  }
                  onClick={() => handleFoodPackageToggle(foodPackage.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FoodPackageImage src={foodPackage.image || '/logo.png'} />
                  <Card.Body style={{ padding: '2rem' }}>
                    <OptionTitle>{foodPackage.name}</OptionTitle>
                    <OptionDescription>{foodPackage.description}</OptionDescription>
                    <OptionDetails>
                      <p>Items: {foodPackage.items.join(', ')}</p>
                      <OptionPrice>₹{foodPackage.price.toLocaleString()}</OptionPrice>
                    </OptionDetails>
                  </Card.Body>
                </OptionCard>
              </Col>
            ))}
          </Row>
        )}

        {step === 4 && (
          <Row>
            {event.employees.map((employee) => (
              <Col md={6} key={employee.id}>
                <OptionCard
                  className={
                    selectedEmployees.includes(employee.id) ? 'selected' : ''
                  }
                  onClick={() => handleEmployeeToggle(employee.id)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <EmployeeImage src={employee.image || '/logo.png'} />
                  <Card.Body style={{ padding: '2rem' }}>
                    <OptionTitle>{employee.name}</OptionTitle>
                    <OptionDescription>{employee.description}</OptionDescription>
                    <OptionPrice>₹{employee.price.toLocaleString()}</OptionPrice>
                  </Card.Body>
                </OptionCard>
              </Col>
            ))}
          </Row>
        )}

        {step === 5 && (
          <DetailsForm>
            <FormGroup>
              <Form.Label>Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleDetailsChange}
                placeholder="Enter your full name"
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Contact Number *</Form.Label>
              <Form.Control
                type="tel"
                name="contact"
                value={userDetails.contact}
                onChange={handleDetailsChange}
                placeholder="Enter your contact number"
                pattern="[0-9]*"
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleDetailsChange}
                placeholder="Enter your email address"
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Number of Guests *</Form.Label>
              <Form.Control
                type="number"
                name="guests"
                value={userDetails.guests}
                onChange={handleDetailsChange}
                placeholder="Enter the number of guests"
                min="1"
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Event Date *</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={userDetails.date}
                onChange={handleDetailsChange}
                required
              />
            </FormGroup>
            <FormGroup>
              <Form.Label>Event Customization (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                name="customization"
                value={userDetails.customization}
                onChange={handleDetailsChange}
                placeholder="Any special requests or customizations for your event?"
              />
            </FormGroup>
          </DetailsForm>
        )}

        <ButtonGroup>
          {step > 1 && (
            <ActionButton
              variant="secondary"
              className="secondary"
              onClick={handlePreviousStep}
            >
              Previous
            </ActionButton>
          )}
          {step < 5 && (
            <ActionButton variant="primary" onClick={handleNextStep}>
              Next
            </ActionButton>
          )}
          {step === 5 && (
            <ActionButton variant="success" onClick={handleBookNow}>
              Book Now
            </ActionButton>
          )}
        </ButtonGroup>
      </StepContainer>
    </BookingSection>
  );
}

export default EventBooking;