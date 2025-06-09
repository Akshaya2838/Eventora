import styled from 'styled-components';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../ui/Input';
import { EVENT_TYPES } from '../../utils/constants';

const FilterContainer = styled.div`
  padding: 1rem;
  background-color: var(--neutral-light);
`;

function FilterBar({ onFilter }) {
  return (
    <FilterContainer>
      <Form>
        <Row>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Event Type</Form.Label>
              <Form.Select name="eventType">
                <option value="">All</option>
                {EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Input label="Location" name="location" />
          </Col>
          <Col md={3}>
            <Input label="Date" name="date" type="date" />
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button variant="primary" type="submit">
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Form>
    </FilterContainer>
  );
}

export default FilterBar;