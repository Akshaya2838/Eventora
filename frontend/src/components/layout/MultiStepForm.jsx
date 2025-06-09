import { useState } from 'react';
import styled from 'styled-components';
import { Form, Button, Container } from 'react-bootstrap';
import Input from '../ui/Input';

const FormContainer = styled(Container)`
  padding: 2rem;
`;

function MultiStepForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    date: '',
    guests: '',
    budget: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <FormContainer>
      <h2>Create Event - Step {step}</h2>
      <Form>
        {step === 1 && (
          <>
            <Input
              label="Event Type"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
            />
            <Input
              label="Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Input
              label="Number of Guests"
              name="guests"
              type="number"
              value={formData.guests}
              onChange={handleChange}
            />
            <Input
              label="Budget"
              name="budget"
              type="number"
              value={formData.budget}
              onChange={handleChange}
            />
          </>
        )}
        <div className="mt-3">
          {step > 1 && <Button onClick={prevStep} className="me-2">Previous</Button>}
          {step < 2 && <Button onClick={nextStep}>Next</Button>}
          {step === 2 && <Button type="submit">Submit</Button>}
        </div>
      </Form>
    </FormContainer>
  );
}

export default MultiStepForm;