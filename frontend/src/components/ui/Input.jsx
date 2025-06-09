import styled from 'styled-components';
import { Form, Alert } from 'react-bootstrap';

const StyledInput = styled(Form.Control)`
  border-color: var(--royal-blue);
  border-radius: 5px;
  padding: 0.75rem;
  &:focus {
    border-color: var(--event-blue);
    box-shadow: 0 0 5px rgba(30, 144, 255, 0.3);
  }
`;

function Input({ label, error, ...props }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <StyledInput {...props} />
      {error && <Alert variant="danger">{error}</Alert>}
    </Form.Group>
  );
}

export default Input;