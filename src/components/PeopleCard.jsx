import React, { memo } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const PeopleCard = memo(({ person, isConnected, onConnect, onRemoveConnection }) => {
  return (
    <Card className="shadow-sm h-100">
      <Card.Body className="d-flex flex-column">
        <div className="text-center mb-3">
          <img 
            src={person.profilePic} 
            alt={person.name} 
            className="connection-avatar mb-2" 
          />
          <h5 className="mb-1">
            <Link to={`/profile/${person.id}`} className="text-decoration-none text-dark">
              {person.name}
            </Link>
          </h5>
          <p className="text-muted small mb-1">{person.title}</p>
          {person.mutualConnections && (
            <p className="text-muted small">
              <i className="bi bi-people-fill me-1"></i>
              {person.mutualConnections} mutual connections
            </p>
          )}
        </div>
        
        <div className="mt-auto">
          {isConnected ? (
            <div className="d-grid">
              <Button 
                variant="outline-primary" 
                className="rounded-pill"
                onClick={onRemoveConnection}
              >
                <i className="bi bi-person-check-fill me-1"></i>
                Connected
              </Button>
            </div>
          ) : (
            <div className="d-grid">
              <Button 
                variant="outline-primary" 
                className="rounded-pill"
                onClick={onConnect}
              >
                <i className="bi bi-person-plus-fill me-1"></i>
                Connect
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
});

export default PeopleCard;