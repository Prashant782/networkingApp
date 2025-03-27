import React, { useState, useEffect, memo, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Nav, Tab } from 'react-bootstrap';
import PeopleCard from './PeopleCard';
import connectionsData from '../data/connections.json';
import { useAppContext } from '../context/AppContext';
import { ActionTypes } from '../context/AppContext';

const EmptyConnectionsCard = memo(({ onFindPeople }) => (
  <Card className="shadow-sm">
    <Card.Body className="text-center p-5">
      <i className="bi bi-people fs-1 text-muted"></i>
      <h5 className="mt-3">No connections yet</h5>
      <p className="text-muted">Connect with people to build your network</p>
      <Button 
        variant="primary" 
        onClick={onFindPeople}
      >
        Find People
      </Button>
    </Card.Body>
  </Card>
));

const ConnectionsPage = () => {
  const [suggestedConnections, setSuggestedConnections] = useState([]);
  const [myConnections, setMyConnections] = useState([]);
  const { state, dispatch } = useAppContext();
  const { connectedProfiles } = state;

  useEffect(() => {
    try {
      setSuggestedConnections(connectionsData);
      
      const connected = connectionsData.filter(person => 
        connectedProfiles.includes(person.id)
      );
      setMyConnections(connected);
    } catch (error) {
      console.error('Error loading connections data:', error);
    }
  }, [connectedProfiles]);

  const handleConnect = useCallback((personId) => {
    try {
      dispatch({
        type: ActionTypes.TOGGLE_CONNECTION,
        payload: personId
      });
 
      const person = suggestedConnections.find(p => p.id === personId);
      if (person && !connectedProfiles.includes(personId)) {
        setMyConnections(prevConnections => [...prevConnections, person]);
      }
    } catch (error) {
      console.error('Error connecting with person:', error);
    }
  }, [suggestedConnections, connectedProfiles, dispatch]);

  const handleRemoveConnection = useCallback((personId) => {
    try {
      dispatch({
        type: ActionTypes.TOGGLE_CONNECTION,
        payload: personId
      });
      
      setMyConnections(prevConnections => 
        prevConnections.filter(person => person.id !== personId)
      );
    } catch (error) {
      console.error('Error removing connection:', error);
    }
  }, [dispatch]);

  const goToSuggestedTab = () => {
    const suggestedTabElement = document.querySelector('a[href="#suggested"]');
    if (suggestedTabElement) {
      suggestedTabElement.click();
    }
  };

  return (
    <Container className="pt-5 mt-5">
      <Tab.Container defaultActiveKey="suggested">
        <Row className="mb-4">
          <Col>
            <Card className="shadow-sm">
              <Card.Body>
                <Nav variant="pills" className="flex-column flex-sm-row">
                  <Nav.Item>
                    <Nav.Link eventKey="suggested">People You May Know</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="connections">My Connections ({myConnections.length})</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        <Tab.Content>
          <Tab.Pane eventKey="suggested">
            <Row>
              {suggestedConnections.map(person => (
                <Col md={4} sm={6} key={person.id} className="mb-4">
                  <PeopleCard 
                    person={person}
                    isConnected={connectedProfiles.includes(person.id)}
                    onConnect={() => handleConnect(person.id)}
                    onRemoveConnection={() => handleRemoveConnection(person.id)}
                  />
                </Col>
              ))}
            </Row>
          </Tab.Pane>
          
          <Tab.Pane eventKey="connections">
            {myConnections.length === 0 ? (
              <EmptyConnectionsCard onFindPeople={goToSuggestedTab} />
            ) : (
              <Row>
                {myConnections.map(person => (
                  <Col md={4} sm={6} key={person.id} className="mb-4">
                    <PeopleCard 
                      person={person}
                      isConnected={true}
                      onRemoveConnection={() => handleRemoveConnection(person.id)}
                    />
                  </Col>
                ))}
              </Row>
            )}
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default ConnectionsPage;