import styled from 'styled-components';
import { Container, Image, Accordion } from 'react-bootstrap';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AboutSection = styled.section`
  padding: 4rem 0;
  background: linear-gradient(145deg, #EFF6FF 0%, #DBEAFE 100%); /* Matching website gradient */
  min-height: 100vh;
`;

const AboutContainer = styled(Container)`
  padding: 2rem 4rem; /* Consistent padding with other pages */
  max-width: 1200px;
  margin: 0 auto;
`;

const StyledImage = styled(Image)`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 15px; /* Rounded corners to match cards */
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1); /* Matching shadow */
  margin-bottom: 4rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.02); /* Slight scale-up on hover */
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
`;

const Heading = styled(motion.h2)`
  font-size: 2.5rem; /* Slightly smaller for consistency */
  font-weight: 700;
  color: #1E3A8A; /* Secondary Blue */
  margin-bottom: 3rem;
  text-align: center;
`;

const SubHeading = styled(motion.h3)`
  font-size: 1.8rem; /* Adjusted for better hierarchy */
  color: #1E3A8A; /* Secondary Blue */
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-weight: 600;
  text-align: center;
`;

const Description = styled(motion.p)`
  color: #718096; /* Matching text color */
  line-height: 1.8;
  margin-bottom: 3rem;
  font-size: 1.15rem;
  max-width: 900px; /* Adjusted for readability */
  text-align: justify;
  margin: 0 auto;
  padding: 2rem;
  border-radius: 15px;
  background: linear-gradient(145deg, #F7FAFC 0%, #EDF2F7 100%); /* Subtle gradient matching forms */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* Subtle shadow */
`;

const FAQContainer = styled(motion.div)`
  margin-top: 5rem;
  text-align: center;
`;

const FAQHeading = styled(motion.h2)`
  font-size: 2.5rem; /* Consistent with Heading */
  font-weight: 700;
  color: #1E3A8A; /* Secondary Blue */
  margin-bottom: 1rem;
`;

const FAQDescription = styled(motion.p)`
  color: #718096; /* Matching text color */
  margin-bottom: 2rem;
  font-size: 1.1rem;
`;

const StyledAccordion = styled(Accordion)`
  max-width: 800px;
  margin: 0 auto;

  .accordion-item {
    border: none;
    border-radius: 15px; /* Rounded corners */
    margin-bottom: 1rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); /* Subtle shadow */
    overflow: hidden;
  }

  .accordion-header {
    button {
      font-weight: 600;
      font-size: 1.2rem;
      color: #1E3A8A; /* Secondary Blue */
      padding: 1rem 1.5rem;
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(145deg, #F7FAFC 0%, #EDF2F7 100%); /* Subtle gradient */
      border: 0;
      border-radius: 15px;
      text-align: left;
      transition: background 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        background: linear-gradient(145deg, #EDF2F7 0%, #F7FAFC 100%); /* Reversed gradient */
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }

      &:focus {
        outline: 0;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1); /* Matching focus style */
      }

      &:not(.collapsed) {
        background: linear-gradient(145deg, #DBEAFE 0%, #EFF6FF 100%); /* Highlight when active */
        color: #3B82F6; /* Primary Blue */
      }
    }
  }

  .accordion-body {
    padding: 1.5rem;
    color: #718096; /* Matching text color */
    line-height: 1.7;
    background: #ffffff; /* White background for contrast */
    border-radius: 0 0 15px 15px;
  }
`;

const FAQData = [
  {
    question: 'What types of events can Eventora help manage?',
    answer:
      'Eventora is versatile and can be used to manage a wide range of events, including conferences, workshops, weddings, parties, corporate gatherings, seminars, and more. Our flexible features adapt to the unique needs of any event type.',
  },
  {
    question: 'How does Eventora handle online registration and ticketing?',
    answer:
      'Our platform offers a seamless online registration and ticketing system. You can easily create custom registration forms, set ticket prices, manage attendee data, and process payments securely. Attendees can register and purchase tickets online with ease.',
  },
  {
    question: 'Can I manage venue details and logistics with Eventora?',
    answer:
      'Yes, Eventora provides tools for efficient venue management. You can store venue information, manage room layouts, track availability, and coordinate logistics related to your event space.',
  },
  {
    question: 'Does Eventora offer marketing tools to promote my event?',
    answer:
      'Absolutely! Eventora includes features to help you market your event effectively. This may include email marketing integration, social media sharing options, and tools to create promotional materials.',
  },
  {
    question: 'Is it possible to communicate with attendees through the platform?',
    answer:
      'Yes, Eventora facilitates communication with attendees through various channels. This can include email notifications, announcements within the platform, and potentially live chat features to keep attendees informed and engaged.',
  },
  {
    question: 'What kind of post-event analytics does Eventora provide?',
    answer:
      'Eventora offers valuable post-event analytics to help you measure the success of your event. You can access data on attendance, ticket sales, attendee engagement, and feedback to gain insights for future events.',
  },
];

function AboutUs() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionToggle = (eventId) => {
    setActiveAccordion(activeAccordion === eventId ? null : eventId);
  };

  return (
    <AboutSection>
      <AboutContainer>
        
        <Heading
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          About Eventora
        </Heading>
        <Description
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Eventora is your dedicated partner in crafting unforgettable event experiences. We understand the intricate details involved in bringing any gathering to life, from the most intimate celebrations to the grandest corporate affairs. Our platform is meticulously designed to streamline every aspect of event management, empowering you to focus on what truly matters – creating meaningful connections and lasting memories.
          Our comprehensive suite of features is engineered for efficiency and ease of use. From seamless online registration and secure ticketing to intuitive venue management tools and dynamic scheduling capabilities, Eventora provides a unified environment to orchestrate every detail. We go beyond logistics, offering robust marketing tools to amplify your event's reach, real-time communication channels to engage attendees, and insightful post-event analytics to drive continuous improvement.
        </Description>

        <SubHeading
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Our Mission
        </SubHeading>
        <Description
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Our mission is to provide an intuitive, comprehensive, and reliable event management solution that simplifies the planning process, enhances attendee engagement, and delivers measurable success for every event, regardless of its scale or complexity. We are committed to empowering event organizers with the tools and insights they need to create remarkable gatherings.
        </Description>

        <Description
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          With Eventora, you gain more than just a platform – you gain a strategic partner dedicated to your event's success. We strive to save you valuable time and resources, allowing you to concentrate on the art of creating truly memorable experiences for your attendees. Let Eventora handle the complexities, so you can focus on the magic.
        </Description>

        <FAQContainer
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
        >
          <FAQHeading
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            Frequently Asked Questions
          </FAQHeading>
          <FAQDescription
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            Here are some common questions about us
          </FAQDescription>
          <StyledAccordion activeKey={activeAccordion}>
            {FAQData.map((faq, index) => (
              <Accordion.Item eventKey={index.toString()} key={index}>
                <Accordion.Header onClick={() => handleAccordionToggle(index.toString())}>
                  {faq.question}
                </Accordion.Header>
                <Accordion.Body>{faq.answer}</Accordion.Body>
              </Accordion.Item>
            ))}
          </StyledAccordion>
        </FAQContainer>
      </AboutContainer>
    </AboutSection>
  );
}

export default AboutUs;