import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { FaStar, FaCheckCircle, FaMapMarkerAlt, FaClock, FaHeadset, FaCoins, FaHandshake } from 'react-icons/fa'; // Added new icons

// Hero Section Styles
const Banner = styled(motion.div)`
  position: relative;
  height: 90vh;
  background-image: url('https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #ffffff;
  padding: 3rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)); /* Lightened the shade */
  }
`;

const BannerContent = styled(motion.div)`
  position: relative;
  z-index: 1;
  max-width: 900px;
`;

const Title = styled(motion.h1)`
  font-size: 4.5rem;
  font-weight: 900;
  margin-bottom: 1.5rem;
  text-shadow: 4px 4px 12px rgba(0, 0, 0, 0.6);
  position: relative;
  display: inline-block;
  color: #ffffff; /* Changed to white */
  
  &::before,
  &::after {
    content: '✨'; /* Sparkle icon for a more attractive look */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #ffffff; /* Changed to white to match title */
    font-size: 2.5rem;
  }

  &::before {
    left: -3.5rem;
  }

  &::after {
    right: -3.5rem;
  }

  @media (max-width: 768px) {
    font-size: 3rem;

    &::before,
    &::after {
      font-size: 2rem;
      left: -2.5rem;
      right: -2.5rem;
    }
  }

  @media (max-width: 576px) {
    font-size: 2.2rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.8rem;
  margin-bottom: 2.5rem;
  font-style: italic;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.5);
  color: #ffffff; /* Changed to white */

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 576px) {
    font-size: 1.2rem;
  }
`;

const StyledButton = styled(motion.a)`
  font-size: 1.3rem;
  padding: 1rem 3rem;
  background: linear-gradient(90deg, #1a3c6e, #3b82f6);
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 6px 20px rgba(59, 130, 246, 0.5);
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
  margin: 0 auto;

  &:hover {
    transform: translateY(-5px) scale(1.05);
    box-shadow: 0 12px 25px rgba(59, 130, 246, 0.6);
    background: linear-gradient(90deg, #3b82f6, #1a3c6e);
  }

  @media (max-width: 576px) {
    font-size: 1.1rem;
    padding: 0.75rem 2rem;
  }
`;

// Section Styles - Consistent styling across sections
const StyledSection = styled.section`
  padding: 6rem 0;
  position: relative;
  overflow: hidden;
`;

// Consistent Section Headers
const SectionSubHeading = styled.h4`
  font-size: 1.2rem;
  color: #3b82f6;
  margin-bottom: 0.5rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.8rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  position: relative;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

// About Section Styles
const AboutSection = styled(StyledSection)`
  background: #f5f5f5;
  position: relative;
`;

const AboutImage = styled.div`
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
`;

const AboutContent = styled.div`
  padding: 2rem;
  text-align: left;
`;

const AboutDescription = styled(motion.p)`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.8;
  margin-bottom: 2rem;
  text-align: left;
`;

// Services Section Styles
const ServicesSection = styled(StyledSection)`
  background-color: #f9f9f9;
  text-align: center;
  position: relative;
`;

const ServiceCard = styled(motion.div)`
  border: none;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  height: 100%;
  transition: all 0.4s ease;
  background: white;
  position: relative;

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.15);
  }

  &:hover img {
    transform: scale(1.1);
  }
`;

const ServiceImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
  }
`;

const ServiceContent = styled.div`
  padding: 1.8rem;
  text-align: left;
`;

const ServiceTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
`;

const ServiceDescription = styled.p`
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
`;

// Why Choose Us Section Styles - Updated for 2x2 grid
const WhyChooseUsSection = styled(StyledSection)`
  background: #f0f4f8;
  position: relative;
  padding: 5rem 0;
`;

const WhyUsSectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: #fff;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  height: 100%;
  margin-bottom: 1.5rem;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureIconWrapper = styled.div`
  width: 70px;
  height: 70px;
  background: #e0f2fe;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  color: #3b82f6;
  font-size: 2rem;
  flex-shrink: 0;
`;

const FeatureTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
`;

const FeatureDescription = styled.p`
  color: #777;
  font-size: 1rem;
  line-height: 1.6;
`;

// Reviews Section Styles - Updated with border
const ReviewsSection = styled(StyledSection)`
  background-color: #f5f5f5;
  text-align: center;
  position: relative;
  padding: 7rem 0;
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  border: 2px solid #3b82f6; /* Added border as requested */
`;

const TestimonialText = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 800px;
  margin: 0 auto 1.5rem;
  line-height: 1.7;
  font-style: italic;
`;

const ClientInfo = styled.div`
  margin-top: 1.5rem;
`;

const StarRating = styled.div`
  color: #fdd835;
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
`;

const ClientName = styled.h4`
  font-size: 1.6rem;
  color: #333;
  margin-bottom: 0.25rem;
  font-weight: 600;
`;

const ClientLocation = styled.p`
  font-size: 1rem;
  color: #777;
`;

const SliderDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#3b82f6' : '#ddd'};
  border: none;
  margin: 0 7px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0.8;

  &:focus {
    outline: none;
  }

  &:hover {
    opacity: 1;
    transform: scale(1.1);
  }
`;

function Home() {
  // Services data
  const services = [
    {
      id: 1,
      title: 'Wedding Events',
      description: 'Let us make your special day magical. Includes ceremonies, receptions, and other events.',
      image: 'https://weddingplanningconference.com/blog/wp-content/uploads/2022/09/Udaipur-1.jpg',
    },
    {
      id: 2,
      title: 'Birthdays',
      description: 'Celebrate another year with a memorable event. We create custom experiences for milestone birthdays and intimate gatherings.',
      image: 'https://framerusercontent.com/images/BybjBGz9yw8T69RSwtLKpE.jpg',
    },
    {
      id: 3,
      title: 'Corporate Events',
      description: 'Impress clients and motivate teams with professional events that reflect your company culture and objectives.',
      image: 'https://nsquares.in/wp-content/uploads/2024/12/conference-organisers.jpeg',
    },
    {
      id: 4,
      title: 'College Events',
      description: 'From freshman orientations to graduation ceremonies, we bring your educational events to life with creativity and precision.',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3',
    },
    {
      id: 5,
      title: 'Concerts',
      description: 'Get the party started with our expert event planning services for music festivals, concerts, and dance parties.',
      image: 'https://i0.wp.com/www.splento.com/blog/wp-content/uploads/2022/04/Top-10-event-planning-tips.jpg?ssl=1',
    },
    {
      id: 6,
      title: 'Theme Parties',
      description: 'We create immersive and unforgettable theme parties for any occasion.',
      image: 'https://www.mgnevents.co.uk/wp-content/uploads/2018/09/18th-Black-White-Birthday-Party-Kent-073.jpg'
    }
  ];

  // Why Choose Us features data
  const features = [
    {
      id: 1,
      title: 'Best Event Planners',
      description: 'Looking for the leading event planner in Bengaluru? Eventora is a call away.',
      icon: 'star'
    },
    {
      id: 2,
      title: 'Trust & Safety',
      description: 'Entrust your events to us and enjoy your event wholeheartedly.',
      icon: 'shield'
    },
    {
      id: 3,
      title: 'Quick Turnaround',
      description: 'We deliver on time and on budget.',
      icon: 'handshake'
    },
    {
      id: 4,
      title: 'Fast Booking',
      description: 'In a hurry to host your event? Just call, quote and confirm!',
      icon: 'clock'
    }
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      text: 'Eventora made my wedding a dream come true! The attention to detail, creativity, and professionalism were outstanding. Every moment was magical, and I couldnt have asked for a better experience. Highly recommend!',
      author: "Madhuri Chowdary",
      rating: 5,
      location: "Bengaluru"
    },
    {
      id: 2,
      text: "Our annual corporate retreat organized by Eventora exceeded every expectation. From venue selection to team building activities, everything was professional and engaging. Our productivity has increased significantly since the event!",
      author: "Ashish Shetty",
      rating: 5,
      location: "Mysore"
    },
    {
      id: 3,
      text: "My daughter's first birthday party was an absolute dream come true! Eventora took our vision and elevated it to something extraordinary. The themed decorations, entertainment, and coordination were flawless.",
      author: "Aishwarya Reddy",
      rating: 5,
      location: "Hyderabad"
    },
  ];

  // Function to render the appropriate icon based on the feature
  const renderFeatureIcon = (iconType) => {
    switch (iconType) {
      case 'star':
        return <FaStar />;
      case 'shield':
        return <FaCheckCircle />;
      case 'coins':
        return <FaCoins />;
      case 'clock':
        return <FaClock />;
      default:
        return <FaCheckCircle />;
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // State for reviews slider
  const [currentReview, setCurrentReview] = useState(0);

  // Auto-rotate reviews every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  return (
    <>
      {/* Hero Section */}
      <Banner>
        <BannerContent>
          <Title variants={fadeIn} initial="hidden" animate="visible">
            Eventora
          </Title>
          <Subtitle variants={fadeIn} initial="hidden" animate="visible">
          Crafting connections and Weaving memories into the fabric of time.
          </Subtitle>
          <StyledButton variants={fadeIn} initial="hidden" animate="visible" href="/events">
            Plan Your Event
          </StyledButton>
        </BannerContent>
      </Banner>

      {/* About Us Section */}
      <AboutSection>
        <Container className="text-center">
          <SectionSubHeading>About Us</SectionSubHeading>
          <SectionTitle>We Help You Plan Your Events</SectionTitle>
          <Row className="align-items-center justify-content-center">
            <Col lg={6}>
              <AboutImage>
                <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3" alt="About Eventora" />
              </AboutImage>
            </Col>
            <Col lg={6}>
              <AboutContent>
                <AboutDescription>
                  Welcome to Eventora,a premier event planning destination. We transform your vision into unforgettable experiences with meticulous attention to detail and creative excellence.
                </AboutDescription>
                <AboutDescription>
                  From intimate gatherings to grand celebrations, our passionate team crafts personalized experiences that reflect your unique style and exceed expectations.
                </AboutDescription>
                <AboutDescription>
                  We handle everything—venue selection, decor, catering, entertainment—allowing you to relax and enjoy every moment of your special occasion.
                </AboutDescription>
                <StyledButton href="/about">
                  Learn More &rarr;
                </StyledButton>
              </AboutContent>
            </Col>
          </Row>
        </Container>
      </AboutSection>

      {/* Services Section */}
      <ServicesSection>
        <Container>
          <SectionSubHeading>Services</SectionSubHeading>
          <SectionTitle variants={fadeIn} initial="hidden" animate="visible">
            Our Services
          </SectionTitle>
          <Row className="g-4">
            {services.map((service) => (
              <Col key={service.id} md={6} lg={4}>
                <ServiceCard>
                  <ServiceImageContainer>
                    <img src={service.image} alt={service.title} />
                  </ServiceImageContainer>
                  <ServiceContent>
                    <ServiceTitle>{service.title}</ServiceTitle>
                    <ServiceDescription>{service.description}</ServiceDescription>
                  </ServiceContent>
                </ServiceCard>
              </Col>
            ))}
          </Row>
        </Container>
      </ServicesSection>

      {/* Why Choose Us Section - Updated to 2x2 grid */}
      <WhyChooseUsSection>
        <Container>
          <WhyUsSectionHeader>
            <SectionSubHeading>Why Choose Us</SectionSubHeading>
            <SectionTitle>We Make All The Process Easy</SectionTitle>
          </WhyUsSectionHeader>

          <Row>
            {features.map((feature, index) => (
              // Using a 2x2 grid layout
              <Col key={feature.id} md={6} lg={6}>
                <FeatureItem>
                  <FeatureIconWrapper>
                    {renderFeatureIcon(feature.icon)}
                  </FeatureIconWrapper>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                </FeatureItem>
              </Col>
            ))}
          </Row>
        </Container>
      </WhyChooseUsSection>

      {/* Reviews Section */}
      <ReviewsSection>
        <Container>
          <SectionSubHeading>Testimonials</SectionSubHeading>
          <SectionTitle>Some Cherishing Words</SectionTitle>

          <TestimonialCard>
            <TestimonialText>
              {reviews[currentReview].text}
            </TestimonialText>

            <ClientInfo>
              <StarRating>
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </StarRating>
              <ClientName>{reviews[currentReview].author}</ClientName>
              <ClientLocation>{reviews[currentReview].location}</ClientLocation>
            </ClientInfo>
          </TestimonialCard>

          <SliderDots>
            {reviews.map((_, index) => (
              <Dot
                key={index}
                active={index === currentReview}
                onClick={() => setCurrentReview(index)}
              />
            ))}
          </SliderDots>
        </Container>
      </ReviewsSection>
    </>
  );
}

export default Home;