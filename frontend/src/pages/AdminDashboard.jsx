import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, Card, Table, Button, Form, Modal, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faUsers, faCalendar, faBriefcase, faDollarSign, faMapMarkerAlt, faIdCard, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Styled Components
const AdminContainer = styled(Container)`
  padding: 5rem 2rem;
  background-color: #f0f4f8;
  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;

const DashboardHeader = styled(motion.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
  h2 {
    color: #2c3e50;
    font-weight: 600;
  }
`;

const StyledCard = styled(motion.div).attrs({
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
})`
  margin-bottom: 1.5rem;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  border: none;
  background-color: white;
  transition: all 0.2s ease;
`;

const StyledCardHeader = styled(Card.Header)`
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  padding: 1.25rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 12px 12px 0 0;
  color: #34495e;
`;

const StatsCard = styled(motion.div).attrs({
    whileHover: { scale: 1.05 },
    whileTap: { scale: 1 },
})`
  text-align: center;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  h2 {
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.1rem;
    opacity: 0.9;
  }
  &:hover {
    transform: translateY(-8px);
  }
`;

const ActionButton = styled(Button)`
  margin-right: 0.5rem;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
`;

const LogoutButton = styled(Button)`
  border-radius: 8px;
  background-color: #e74c3c;
  border-color: #e74c3c;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
  transition: all 0.2s ease;
  &:hover {
    background-color: #c0392b;
    border-color: #c0392b;
    transform: translateY(-2px);
  }
`;

const StyledTable = styled(Table)`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  thead {
    background-color: #f0f0f0;
    th {
      color: #34495e;
      font-weight: 600;
      border-bottom: 2px solid #e0e0e0;
      padding: 1.25rem;
    }
  }
  tbody {
    td {
      color: #4a6572;
      border-bottom: 1px solid #e0e0e0;
      padding: 1.25rem;
    }
    tr:last-child td {
      border-bottom: none;
    }
  }
  th,
  td {
    vertical-align: middle;
  }
  .action-buttons {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-start;
  }
`;

const StyledModal = styled(Modal)`
  .modal-content {
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    border: none;
  }
  .modal-header {
    border-bottom: 1px solid #e0e0e0;
    padding: 1.5rem;
    h5 {
      color: #2c3e50;
      font-weight: 600;
      font-size: 1.5rem;
    }
    .btn-close {
      border-radius: 50%;
      padding: 0.5rem;
      box-shadow: none;
      transition: all 0.2s ease;
      &:hover {
        background-color: #f0f0f0;
      }
    }
  }
  .modal-body {
    padding: 1.5rem;
  }
  .modal-footer {
    border-top: 1px solid #e0e0e0;
    padding: 1.5rem;
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
  }
`;

const FormLabel = styled(Form.Label)`
  color: #34495e;
  font-weight: 500;
  margin-bottom: 0.5rem;
  display: block;
`;

const FormControl = styled(Form.Control)`
  border-radius: 8px;
  border: 1px solid #d0d0d0;
  padding: 0.75rem;
  transition: all 0.2s ease;
  &:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
  }
`;

function AdminDashboard() {
  // State for Team Members and Bookings
  const [teamMembers, setTeamMembers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loadingTeamMembers, setLoadingTeamMembers] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [errorTeamMembers, setErrorTeamMembers] = useState(null);
  const [errorBookings, setErrorBookings] = useState(null);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);
  const [currentTeamMember, setCurrentTeamMember] = useState(null);
  const [editTeamMode, setEditTeamMode] = useState(false);
  const [teamFormData, setTeamFormData] = useState({ id: '', name: '', role: '', email: '', phone: '' });

  const navigate = useNavigate();

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/team-members');
        if (!response.ok) throw new Error('Failed to fetch team members');
        const data = await response.json();
        console.log('Fetched team members:', data);
        setTeamMembers(data);
        setErrorTeamMembers(null);
      } catch (error) {
        console.error('Error fetching team members:', error);
        setErrorTeamMembers('Failed to load team members. Please try again later.');
      } finally {
        setLoadingTeamMembers(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings');
        if (!response.ok) throw new Error('Failed to fetch bookings');
        const data = await response.json();
        console.log('Fetched bookings:', data);
        setBookings(data);
        setErrorBookings(null);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setErrorBookings('Failed to load bookings. Please try again later.');
      } finally {
        setLoadingBookings(false);
      }
    };

    fetchTeamMembers();
    fetchBookings();

    // Set up polling for live booking updates
    const interval = setInterval(fetchBookings, 5000);
    return () => clearInterval(interval);
  }, []);

  // Event Handlers for Team Members
  const handleAddTeamMember = () => {
    setEditTeamMode(false);
    setTeamFormData({
      id: teamMembers.length > 0 ? Math.max(...teamMembers.map(member => member.id)) + 1 : 1,
      name: '',
      role: '',
      email: '',
      phone: ''
    });
    setShowTeamModal(true);
  };

  const handleEditTeamMember = (member) => {
    setEditTeamMode(true);
    setCurrentTeamMember(member);
    setTeamFormData({ ...member });
    setShowTeamModal(true);
  };

  const handleDeleteTeamMember = (member) => {
    setCurrentTeamMember(member);
    setShowDeleteTeamModal(true);
  };

  const confirmDeleteTeamMember = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/team-members/${currentTeamMember.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setTeamMembers(prevMembers => prevMembers.filter(member => member.id !== currentTeamMember.id));
        setShowDeleteTeamModal(false);
      } else {
        alert('Failed to delete team member.');
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
      alert('An error occurred while deleting the team member.');
    }
  };

  const handleTeamInputChange = (e) => {
    const { name, value } = e.target;
    setTeamFormData({ ...teamFormData, [name]: value });
  };

  const saveTeamMember = async () => {
    try {
      const method = editTeamMode ? 'PUT' : 'POST';
      const url = editTeamMode
        ? `http://localhost:5000/api/team-members/${teamFormData.id}`
        : 'http://localhost:5000/api/team-members';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamFormData),
      });
      if (response.ok) {
        const updatedMember = await response.json();
        if (editTeamMode) {
          setTeamMembers(prevMembers => prevMembers.map(member => member.id === updatedMember.id ? updatedMember : member));
        } else {
          setTeamMembers(prevMembers => [...prevMembers, updatedMember]);
        }
        setShowTeamModal(false);
      } else {
        alert('Failed to save team member.');
      }
    } catch (error) {
      console.error('Error saving team member:', error);
      alert('An error occurred while saving the team member.');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  // Calculate revenue metrics
  const calculateRevenueMetrics = () => {
    let totalRevenue = 0;
    let eventRevenue = 0;
    let venueRevenue = 0;
    let subEventsRevenue = 0;
    let foodPackagesRevenue = 0;
    let employeesRevenue = 0;

    bookings.forEach(booking => {
      const venuePrice = booking.venue?.price || 0;
      const subEventsPrice = Array.isArray(booking.sub_events)
        ? booking.sub_events.reduce((sum, se) => sum + (se?.price || 0), 0)
        : 0;
      const foodPackagesPrice = Array.isArray(booking.food_packages)
        ? booking.food_packages.reduce((sum, fp) => sum + (fp?.price || 0), 0)
        : 0;
      const employeesPrice = Array.isArray(booking.employees)
        ? booking.employees.reduce((sum, emp) => sum + (emp?.price || 0), 0)
        : 0;
      const eventPrice = booking.event?.price || 0;

      const bookingTotal = eventPrice + venuePrice + subEventsPrice + foodPackagesPrice + employeesPrice;
      totalRevenue += bookingTotal;
      eventRevenue += eventPrice;
      venueRevenue += venuePrice;
      subEventsRevenue += subEventsPrice;
      foodPackagesRevenue += foodPackagesPrice;
      employeesRevenue += employeesPrice;
    });

    const averageBookingValue = bookings.length > 0 ? totalRevenue / bookings.length : 0;

    return {
      totalRevenue,
      averageBookingValue,
      revenueBreakdown: {
        events: eventRevenue,
        venues: venueRevenue,
        subEvents: subEventsRevenue,
        foodPackages: foodPackagesRevenue,
        employees: employeesRevenue,
      },
    };
  };

  const { totalRevenue, averageBookingValue, revenueBreakdown } = calculateRevenueMetrics();

  const eventStats = [
    { title: 'Total Team Members', value: teamMembers.length, color: '#90caf9' },
    { title: 'Total Bookings', value: bookings.length, color: '#42a5f5' },
  ];

  return (
    <AdminContainer fluid>
      <DashboardHeader
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ marginTop: '4rem' }}
      >
        <h2>Admin Dashboard</h2>
        <LogoutButton variant="danger" onClick={handleLogout}>
          Logout
        </LogoutButton>
      </DashboardHeader>

      <Row className="mb-4">
        {eventStats.map((stat, index) => (
          <Col md={4} sm={6} key={`event-stat-${index}`}>
            <StatsCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              style={{ backgroundColor: stat.color }}
            >
              <Card.Body>
                <h2>{stat.value}</h2>
                <p className="mb-0">{stat.title}</p>
              </Card.Body>
            </StatsCard>
          </Col>
        ))}
      </Row>

      {/* Revenue Overview Section */}
      <StyledCard>
        <StyledCardHeader>
          <span>Revenue Overview</span>
        </StyledCardHeader>
        <Card.Body>
          {loadingBookings ? (
            <div className="text-center">
              <Spinner animation="border" variant="info" />
              <p>Loading revenue data...</p>
            </div>
          ) : errorBookings ? (
            <Alert variant="danger">{errorBookings}</Alert>
          ) : bookings.length === 0 ? (
            <Alert variant="info">No revenue data available. Bookings are required to generate revenue insights.</Alert>
          ) : (
            <>
              <Row className="mb-4">
                <Col md={6}>
                  <StatsCard style={{ backgroundColor: '#e0f7fa' }}>
                    <Card.Body>
                      <h2>₹{totalRevenue.toLocaleString()}</h2>
                      <p className="mb-0">Total Revenue</p>
                    </Card.Body>
                  </StatsCard>
                </Col>
                <Col md={6}>
                  <StatsCard style={{ backgroundColor: '#b2ebf2' }}>
                    <Card.Body>
                      <h2>₹{averageBookingValue.toLocaleString()}</h2>
                      <p className="mb-0">Average Booking Value</p>
                    </Card.Body>
                  </StatsCard>
                </Col>
              </Row>
              <h5>Revenue Breakdown</h5>
              <StyledTable responsive hover>
                <thead>
                  <tr>
                    <th><FontAwesomeIcon icon={faDollarSign} className="me-1" /> Source</th>
                    <th><FontAwesomeIcon icon={faDollarSign} className="me-1" /> Amount (₹)</th>
                    <th><FontAwesomeIcon icon={faDollarSign} className="me-1" /> Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Events</td>
                    <td>{revenueBreakdown.events.toLocaleString()}</td>
                    <td>{totalRevenue > 0 ? ((revenueBreakdown.events / totalRevenue) * 100).toFixed(2) : 0}%</td>
                  </tr>
                  <tr>
                    <td>Venues</td>
                    <td>{revenueBreakdown.venues.toLocaleString()}</td>
                    <td>{totalRevenue > 0 ? ((revenueBreakdown.venues / totalRevenue) * 100).toFixed(2) : 0}%</td>
                  </tr>
                  <tr>
                    <td>Sub-Events</td>
                    <td>{revenueBreakdown.subEvents.toLocaleString()}</td>
                    <td>{totalRevenue > 0 ? ((revenueBreakdown.subEvents / totalRevenue) * 100).toFixed(2) : 0}%</td>
                  </tr>
                  <tr>
                    <td>Food Packages</td>
                    <td>{revenueBreakdown.foodPackages.toLocaleString()}</td>
                    <td>{totalRevenue > 0 ? ((revenueBreakdown.foodPackages / totalRevenue) * 100).toFixed(2) : 0}%</td>
                  </tr>
                  <tr>
                    <td>Employees</td>
                    <td>{revenueBreakdown.employees.toLocaleString()}</td>
                    <td>{totalRevenue > 0 ? ((revenueBreakdown.employees / totalRevenue) * 100).toFixed(2) : 0}%</td>
                  </tr>
                </tbody>
              </StyledTable>
            </>
          )}
        </Card.Body>
      </StyledCard>

      {/* Team Management Section */}
      <StyledCard>
        <StyledCardHeader>
          <span>Team & Staff Management</span>
          <Button variant="success" onClick={handleAddTeamMember}>
            <FontAwesomeIcon icon={faPlus} className="me-2" /> Add New Member
          </Button>
        </StyledCardHeader>
        <Card.Body>
          {loadingTeamMembers ? (
            <div className="text-center">
              <Spinner animation="border" variant="success" />
              <p>Loading team members...</p>
            </div>
          ) : errorTeamMembers ? (
            <Alert variant="danger">{errorTeamMembers}</Alert>
          ) : teamMembers.length === 0 ? (
            <Alert variant="info">No team members available. Add a new member to get started!</Alert>
          ) : (
            <StyledTable responsive hover>
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faIdCard} className="me-1" /> ID</th>
                  <th><FontAwesomeIcon icon={faUsers} className="me-1" /> Name</th>
                  <th><FontAwesomeIcon icon={faBriefcase} className="me-1" /> Role</th>
                  <th><FontAwesomeIcon icon={faEnvelope} className="me-1" /> Email</th>
                  <th><FontAwesomeIcon icon={faPhone} className="me-1" /> Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teamMembers.map((member) => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.name}</td>
                    <td>{member.role || 'N/A'}</td>
                    <td>{member.email}</td>
                    <td>{member.phone || 'N/A'}</td>
                    <td>
                      <div className="action-buttons">
                        <ActionButton variant="outline-primary" size="sm" onClick={() => handleEditTeamMember(member)}>
                          <FontAwesomeIcon icon={faEdit} />
                        </ActionButton>
                        <ActionButton variant="outline-danger" size="sm" onClick={() => handleDeleteTeamMember(member)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </ActionButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          )}
        </Card.Body>
      </StyledCard>

      {/* Live Booking Analysis Section */}
      <StyledCard>
        <StyledCardHeader>
          <span>Live Booking Analysis</span>
        </StyledCardHeader>
        <Card.Body>
          {loadingBookings ? (
            <div className="text-center">
              <Spinner animation="border" variant="info" />
              <p>Loading bookings...</p>
            </div>
          ) : errorBookings ? (
            <Alert variant="danger">{errorBookings}</Alert>
          ) : bookings.length === 0 ? (
            <Alert variant="info">No bookings available.</Alert>
          ) : (
            <StyledTable responsive hover>
              <thead>
                <tr>
                  <th><FontAwesomeIcon icon={faIdCard} className="me-1" /> Booking ID</th>
                  <th><FontAwesomeIcon icon={faCalendar} className="me-1" /> Event Name</th>
                  <th><FontAwesomeIcon icon={faUsers} className="me-1" /> Customer Name</th>
                  <th><FontAwesomeIcon icon={faCalendar} className="me-1" /> Event Date</th>
                  <th><FontAwesomeIcon icon={faMapMarkerAlt} className="me-1" /> Venue</th>
                  <th><FontAwesomeIcon icon={faUsers} className="me-1" /> Guests</th>
                  <th><FontAwesomeIcon icon={faDollarSign} className="me-1" /> Total Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => {
                  const venuePrice = booking.venue?.price || 0;
                  const subEventsPrice = Array.isArray(booking.sub_events)
                    ? booking.sub_events.reduce((sum, se) => sum + (se?.price || 0), 0)
                    : 0;
                  const foodPackagesPrice = Array.isArray(booking.food_packages)
                    ? booking.food_packages.reduce((sum, fp) => sum + (fp?.price || 0), 0)
                    : 0;
                  const employeesPrice = Array.isArray(booking.employees)
                    ? booking.employees.reduce((sum, emp) => sum + (emp?.price || 0), 0)
                    : 0;
                  const eventPrice = booking.event?.price || 0;

                  const totalPrice = eventPrice + venuePrice + subEventsPrice + foodPackagesPrice + employeesPrice;

                  return (
                    <tr key={booking.id}>
                      <td>{booking.id || 'N/A'}</td>
                      <td>{booking.event?.name || 'N/A'}</td>
                      <td>{booking.user_details?.name || 'N/A'}</td>
                      <td>{booking.date || 'N/A'}</td>
                      <td>{booking.venue?.name || 'N/A'}</td>
                      <td>{booking.user_details?.guests || 'N/A'}</td>
                      <td>{totalPrice ? totalPrice.toLocaleString() : 'N/A'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </StyledTable>
          )}
        </Card.Body>
      </StyledCard>

      {/* Add/Edit Team Member Modal */}
      <StyledModal show={showTeamModal} onHide={() => setShowTeamModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editTeamMode ? 'Edit Team Member' : 'Add New Team Member'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Name</FormLabel>
                  <FormControl
                    type="text"
                    name="name"
                    value={teamFormData.name}
                    onChange={handleTeamInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Role</FormLabel>
                  <FormControl
                    type="text"
                    name="role"
                    value={teamFormData.role}
                    onChange={handleTeamInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    type="email"
                    name="email"
                    value={teamFormData.email}
                    onChange={handleTeamInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <FormLabel>Phone</FormLabel>
                  <FormControl
                    type="text"
                    name="phone"
                    value={teamFormData.phone}
                    onChange={handleTeamInputChange}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowTeamModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveTeamMember}>
            {editTeamMode ? 'Update' : 'Save'} Member
          </Button>
        </Modal.Footer>
      </StyledModal>

      {/* Delete Team Member Modal */}
      <StyledModal show={showDeleteTeamModal} onHide={() => setShowDeleteTeamModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTeamMember && (
            <p>Are you sure you want to delete the team member: <strong>{currentTeamMember.name}</strong>?</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteTeamModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={confirmDeleteTeamMember}
          >
            Delete
          </Button>
        </Modal.Footer>
      </StyledModal>
    </AdminContainer>
  );
}

export default AdminDashboard;