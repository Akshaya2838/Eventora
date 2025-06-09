import styled from 'styled-components';
import { Container, Row, Col } from 'react-bootstrap';
import { BsTwitter, BsFacebook, BsInstagram, BsLinkedin } from 'react-icons/bs';
import { MdPhone, MdEmail } from 'react-icons/md';

const StyledFooter = styled.footer`
  background-color: var(--royal-blue); /* Using your global royal blue color */
  color: var(--neutral-light, #f8f9fa); /* Keeping the light text */
  padding: 2rem 0;
  margin-top: 3rem; /* Added some top margin for separation */
`;

const FooterContainer = styled(Container)`
  text-align: center;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 1rem;

  a {
    color: var(--neutral-light, #f8f9fa);
    font-size: 1.5rem;
    transition: color 0.3s ease;

    &:hover {
      color: var(--event-blue, #1E90FF); /* Using another global color for hover */
    }
  }
`;

const QuickLinks = styled.div`
  margin-bottom: 1rem;

  a {
    color: var(--neutral-light, #f8f9fa);
    margin: 0 10px;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--event-blue, #1E90FF); /* Using another global color for hover */
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 1rem;

  p {
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0;
    font-size: 1rem;
  }

  a {
    color: var(--neutral-light, #f8f9fa);
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: var(--event-blue, #1E90FF);
    }
  }

  svg {
    font-size: 1.2rem;
  }
`;

const Copyright = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0;
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <SocialIcons>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><BsTwitter /></a>
          <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer"><BsFacebook /></a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer"><BsInstagram /></a>
        </SocialIcons>

        <QuickLinks>
          <a href="/about">About Us</a>
          <span>|</span>
          <a href="/contact">Contact Us</a>
          <span>|</span>
          <a href="/events">Events</a>
        </QuickLinks>

        <ContactInfo>
          <p>
            <a href="tel:+919876543210" rel="noopener noreferrer">
              <MdPhone /> (+91) 9876543210
            </a>
          </p>
          <p>
            <a href="mailto:contacteventora@gmail.com" rel="noopener noreferrer">
              <MdEmail /> contacteventora@gmail.com
            </a>
          </p>
        </ContactInfo>
        <Copyright>© 2025 Eventora. All rights reserved.</Copyright>
      </FooterContainer>
    </StyledFooter>
  );
}

export default Footer;