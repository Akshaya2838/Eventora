import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { MdLocationOn, MdEmail, MdPhone } from 'react-icons/md';

const ContactWrapper = styled.div`
  background-color: #f8f9fa;
  padding: 60px 0;
`;

const ContactCard = styled.div`
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin: 0 auto;
  max-width: 1000px;
`;

const ContactRow = styled(Row)`
  display: flex;
  flex-wrap: wrap;
`;

const InfoColumn = styled(Col)`
  background-color: #4169e1; /* Royal Blue */
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const FormColumn = styled(Col)`
  padding: 40px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CompanyInfo = styled.div`
  margin-bottom: 40px;

  h3 {
    font-size: 1.75rem;
    font-weight: bold;
    margin-bottom: 10px;
    color: #fff;
  }

  p {
    font-size: 1.1rem;
    color: #e0e0e0; /* Lighter text for better contrast on blue */
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;

    svg {
      font-size: 1.3rem;
    }
  }
`;

const FormTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  margin-bottom: 30px;
  color: #343a40;
`;

const FormGroup = styled(Form.Group)`
  margin-bottom: 25px;
`;

const FormLabel = styled(Form.Label)`
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 8px;
  font-size: 1.1rem;
`;

const FormInput = styled(Form.Control)`
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 12px;
  width: 100%;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const FormTextarea = styled(Form.Control)`
  border: 1px solid #ced4da;
  border-radius: 6px;
  padding: 12px;
  width: 100%;
  font-size: 1rem;
  rows: 5;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const SubmitButton = styled(Button)`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 14px 30px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const MapContainer = styled.div`
  margin-top: 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  max-width: 1000px; /* Added max-width to match ContactCard */
  margin-left: auto;  /* Center the map */
  margin-right: auto;
`;

const MapTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #343a40;
  text-align: center;
`;

function ContactUs() {
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: '',
  });
  const [phoneValue, setPhoneValue] = useState('');

  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const messageInputRef = useRef(null);

  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.371724655486!2d77.63007787421875!3d12.94975569999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae15e1578951e7%3A0x692551523b69784e!2sElectronic%20City!5e0!3m2!1sen!2sin!4v1708438183060!5m2!1sen!2sin";

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    // Only allow digits
    if (/^\d*$/.test(value)) {
      setPhoneValue(value);
      if (phoneInputRef.current) {
        phoneInputRef.current.value = value;
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: nameInputRef.current?.value,
      email: emailInputRef.current?.value,
      phone: phoneInputRef.current?.value,
      message: messageInputRef.current?.value,
    };

    // Validate phone number to ensure it contains only digits
    if (formData.phone && !/^\d*$/.test(formData.phone)) {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Phone number must contain only digits.',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          submitted: true,
          error: false,
          message: result.message || 'Your message has been sent. We will get back to you soon!',
        });

        // Clear form fields
        if (nameInputRef.current) nameInputRef.current.value = '';
        if (emailInputRef.current) emailInputRef.current.value = '';
        if (phoneInputRef.current) phoneInputRef.current.value = '';
        if (messageInputRef.current) messageInputRef.current.value = '';
        setPhoneValue('');
      } else {
        setFormStatus({
          submitted: true,
          error: true,
          message: result.error || 'Failed to submit enquiry. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error.message);
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Network error: ' + error.message + '. Please check if the server is running.',
      });
    }
  };

  return (
    <ContactWrapper>
      <br />
      <br />
      <br />
      <Container>
        <ContactCard>
          <ContactRow>
            <InfoColumn md={4}>
              <CompanyInfo>
                <h3>Eventora</h3>
                <p><MdLocationOn /> Electronic City, Bangalore</p>
                <p><MdEmail /> contacteventora@gmail.com</p>
                <p><MdPhone /> (+91) 9876543210</p>
              </CompanyInfo>
            </InfoColumn>
            <FormColumn md={8}>
              <FormTitle>Get in touch with Eventora</FormTitle>
              {formStatus.submitted && (
                <Alert variant={formStatus.error ? 'danger' : 'success'} className="mb-4">
                  {formStatus.message}
                </Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <FormLabel>Name</FormLabel>
                  <FormInput type="text" placeholder="Your name" required ref={nameInputRef} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Email</FormLabel>
                  <FormInput type="email" placeholder="Your email address" required ref={emailInputRef} />
                </FormGroup>
                <FormGroup>
                  <FormLabel>Phone Number</FormLabel>
                  <FormInput
                    type="tel"
                    placeholder="Your phone number"
                    pattern="[0-9]*"
                    value={phoneValue}
                    onChange={handlePhoneChange}
                    ref={phoneInputRef}
                  />
                </FormGroup>
                <FormGroup>
                  <FormLabel>How can we help you with your event?</FormLabel>
                  <FormTextarea placeholder="Your message" ref={messageInputRef} />
                </FormGroup>
                <SubmitButton type="submit">Send Enquiry</SubmitButton>
              </Form>
            </FormColumn>
          </ContactRow>
        </ContactCard>
        <br />
        <br />
        <MapTitle>Our Location</MapTitle>
        <MapContainer>
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Eventora Location"
          />
        </MapContainer>
      </Container>
    </ContactWrapper>
  );
}

export default ContactUs;