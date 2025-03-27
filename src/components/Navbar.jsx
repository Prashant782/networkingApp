import React, { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Container, Nav, Form, FormControl, Button, Dropdown } from 'react-bootstrap';
import { useAppContext } from '../context/AppContext';
import { ActionTypes } from '../context/AppContext';

const NavItem = memo(({ to, icon, label, onClick }) => (
  <Nav.Link as={Link} to={to} className="mx-1 mx-xl-2 text-center" onClick={onClick}>
    <div className="d-flex flex-column align-items-center">
      {icon}
      <small className="d-block mt-1">{label}</small>
    </div>
  </Nav.Link>
));

const NavbarComponent = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const { user } = state;
  const [expanded, setExpanded] = useState(false);
  
  const handleLogout = (e) => {
    e.preventDefault();
    try {
      dispatch({ type: ActionTypes.LOGOUT });
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
      alert('Error logging out. Please try again.');
    }
  };

  const closeNavbar = () => setExpanded(false);
  
  return (
    <Navbar bg="white" expand="lg" fixed="top" className="py-1 border-bottom shadow-sm" expanded={expanded} onToggle={setExpanded}>
      <Container fluid className="px-3 px-lg-5 mx-auto" style={{ maxWidth: '90vw',marginLeft: '5%', marginRight: '5%' }}>
        <div className="d-flex align-items-center">
          <Navbar.Brand as={Link} to="/home" className="me-0 me-md-2" onClick={closeNavbar}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="34" height="34" fill="#0a66c2">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
            </svg>
          </Navbar.Brand>
          
          <Form className="d-none d-md-flex position-relative ms-2">
            <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </div>
            <FormControl
              type="search"
              placeholder="Search"
              className="rounded-pill ps-5 py-1 bg-light border-0"
              aria-label="Search"
              style={{ maxWidth: '240px' }}
            />
          </Form>
        </div>
        
        <Navbar.Toggle aria-controls="navbar-nav" className="border-0">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Form className="d-md-none w-100 my-2 d-flex position-relative" style={{ display: expanded ? 'block' : 'none' }}>
              <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#666" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </div>
              <FormControl
                type="search"
                placeholder="Search"
                className="rounded-pill ps-5 py-1 bg-light border-0 w-100"
                aria-label="Search"
              />
            </Form>
 
            <NavItem 
              to="/home" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-house-door" viewBox="0 0 16 16">
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146ZM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5Z"/>
                </svg>
              } 
              label="Home" 
              onClick={closeNavbar}
            />

            <NavItem 
              to="/connections" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8Zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022ZM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816ZM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"/>
                </svg>
              } 
              label="My Network" 
              onClick={closeNavbar}
            />

            <NavItem 
              to="/jobs" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-briefcase" viewBox="0 0 16 16">
                  <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1h-3zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5zm1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0zM1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5z"/>
                </svg>
              } 
              label="Jobs" 
              onClick={closeNavbar}
            />
            <Nav.Link as={Link} to="/messaging" className="mx-1 mx-xl-2 text-center" onClick={closeNavbar}>
              <div className="d-flex flex-column align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-chat-dots" viewBox="0 0 16 16">
                  <path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                  <path d="m2.165 15.803.02-.004c1.83-.363 2.948-.842 3.468-1.105A9.06 9.06 0 0 0 8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6a10.437 10.437 0 0 1-.524 2.318l-.003.011a10.722 10.722 0 0 1-.244.637c-.079.186.074.394.273.362a21.673 21.673 0 0 0 .693-.125zm.8-3.108a1 1 0 0 0-.287-.801C1.618 10.83 1 9.468 1 8c0-3.192 3.004-6 7-6s7 2.808 7 6c0 3.193-3.004 6-7 6a8.06 8.06 0 0 1-2.088-.272 1 1 0 0 0-.711.074c-.387.196-1.24.57-2.634.893a10.97 10.97 0 0 0 .398-2z"/>
                </svg>
                <small className="d-block mt-1">Messaging</small>
              </div>
            </Nav.Link>

            <Nav.Link as={Link} to="/notifications" className="mx-1 mx-xl-2 text-center" onClick={closeNavbar}>
              <div className="d-flex flex-column align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
                </svg>
                <small className="d-block mt-1">Notifications</small>
              </div>
            </Nav.Link>

            <Dropdown className="mx-1 mx-xl-2 text-center">
              <Dropdown.Toggle as={Nav.Link} className="d-flex flex-column align-items-center">
                <img 
                  src={"https://i.ibb.co/B5YqdQyB/profile-Pic.png"} 
                  alt="profile" 
                  className="rounded-circle border"
                  style={{ width: '24px', height: '24px', objectFit: 'cover' }} 
                />
                <small className="d-block mt-1">Me</small>
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" className="mt-1">
                <div className="px-3 py-2">
                  <div className="d-flex">
                    <img 
                      src={"https://i.ibb.co/B5YqdQyB/profile-Pic.png"} 
                      alt="profile" 
                      className="rounded-circle"
                      style={{ width: '56px', height: '56px', objectFit: 'cover' }}
                    />
                    <div className="ms-2">
                      <h6 className="mb-0">{"Prashant Kr. Sah"}</h6>
                      <small className="text-muted">{user?.jobTitle || "Software Developer"}</small>
                    </div>
                  </div>
                  <Button 
                    as={Link} 
                    to={`/profile/${user?.username || 'johndoe'}`}
                    variant="outline-primary" 
                    className="w-100 rounded-pill mt-2"
                    onClick={closeNavbar}
                  >
                    View Profile
                  </Button>
                </div>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Sign Out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
