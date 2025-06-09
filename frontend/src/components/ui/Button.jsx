import styled from 'styled-components';
import { Button as BootstrapButton } from 'react-bootstrap';

const StyledButton = styled(BootstrapButton)`
  background-color: var(--royal-blue);
  border: none;
  &:hover {
    background-color: var(--event-blue);
  }
`;

function Button(props) {
  return <StyledButton {...props} />;
}

export default Button;