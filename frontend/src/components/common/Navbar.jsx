import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: var(--royal-blue);
  padding: 1rem 0;
  z-index: 1000;
`;

const NavContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: var(--neutral-light);
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;

  a {
    color: var(--neutral-light);
    font-size: 1rem;
    &:hover {
      color: var(--event-blue);
    }
    &.active {
      font-weight: bold;
    }
  }
`;

function Navbar() {
  const navigate = useNavigate();

  return (
    <StyledNav>
      <NavContainer>
        <Logo>Eventora</Logo>
        <NavLinks>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/events">Events</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Button
            variant="outline-light"
            size="sm"
            onClick={() => navigate('/admin-login')}
          >
            Admin
          </Button>
        </NavLinks>
      </NavContainer>
    </StyledNav>
  );
}

export default Navbar;