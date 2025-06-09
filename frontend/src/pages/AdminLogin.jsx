import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import Input from '../components/ui/Input';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 80vh;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
`;

const LoginContainer = styled(Container)`
  max-width: 500px;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  border: 1px solid blue;
    margin: 2rem auto;
`;

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #007bff;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* Adds spacing between form elements */
`;

const CenteredButton = styled(Button)`
  display: block;
  width: 100%; /* Make the button take full width of the container */
  margin-top: 1rem; /* Add some top margin to the button */
`;

const Message = styled(Alert)`
  margin-top: 1rem;
  text-align: center;
`;

function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Simulate an API call with a delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Static credentials check
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/admin');
      }, 1500);
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <PageContainer>
      <LoginContainer>
        <LoginTitle>Admin Login</LoginTitle>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Message variant="success">{message}</Message>}
        <StyledForm onSubmit={handleSubmit}>
          <Input
            label="Username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <Input
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <CenteredButton variant="primary" type="submit">
            Login
          </CenteredButton>
        </StyledForm>
      </LoginContainer>
    </PageContainer>
  );
}

export default AdminLogin;