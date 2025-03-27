import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { ActionTypes } from '../context/AppContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";



const LoginPage = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
  
  
        if (emailRegex.test(email) && passwordRegex.test(password)) {
      
        const user = {
            id: 1,
            username: 'Pashant',
            name: 'Prashant Kumar Sah',
            profilePic: '/public/images/profilePic.png',
            bio: 'Software Engineer passionate about web development',
            jobTitle: 'React Developement training at Incture'
        };
  
        dispatch({
            type: ActionTypes.LOGIN,
            payload: user
        });

        navigate('/home', { replace: true });
        } else {
            setError('Invalid email or password.Email must contain @gmail.com Password must be at least 6 characters long and include at least one letter and one number.');
        }
    } catch (error) {
        console.error('Login error:', error);
        setError('An error occurred during login. Please try again.');
    }
    };

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [state.isLoggedIn, navigate]);

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center mt-5 mb-5">
        <Col xs={12} sm={10} md={8} lg={5}>
          <Card className="login-card">
            <h1 className="login-heading">Sign in</h1>
            <p className="login-subtext">Make the most of your professional lifeno</p>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="formBasicEmail">
                <Form.Label>Email or phone number</Form.Label>
                <Form.Control
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password(6+ characters)</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="mb-4">
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>

              <Button
                variant="primary"
                type="submit"
                className="w-100 signin-btn mb-3"
              >
                Sign in
              </Button>
            </Form>

            <div className="divider">
              <span className="divider-line"></span>
              <span className="divider-text">or</span>
              <span className="divider-line"></span>
            </div>

            <Button className="w-100 google-btn" variant="light">
              <svg width="20" height="20" viewBox="0 0 24 24" className="me-2">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            <Button className="w-100 apple-btn" variant="light">
              <svg width="18" height="18" viewBox="0 0 24 24" className="me-2" fill="currentColor">
                <path d="M16.37 7.34H8.63v3.09h7.74z" fill="none"/>
                <path d="M18.1 17.07c-1.16 2.19-2.28 3.34-3.74 3.34-.5 0-1.22-.16-1.74-.39-.53-.23-1.04-.35-1.62-.35a3.9 3.9 0 0 0-1.6.35c-.54.24-1.01.39-1.46.39-1.56 0-2.75-1.26-4.03-3.78-1.26-2.42-1.9-4.8-1.9-7.14 0-2.35 1.1-4.28 2.96-4.96.69-.24 1.49-.36 2.07-.36.66 0 1.6.15 2.2.34.6.2 1.22.34 1.81.34.56 0 1.16-.13 1.76-.33.7-.23 1.53-.36 2.25-.36.7 0 1.52.14 2.18.49 1.25.63 2.1 1.66 2.6 3.1-1.2.7-1.82 1.95-1.82 3.28 0 1.25.51 2.43 1.47 3.38z"/>
                <path d="M17.82 3.5c0 .82-.25 1.72-.76 2.53-.63.96-1.37 1.49-2.7 1.58 0-1.66.75-2.94 1.87-3.73.41-.3.96-.54 1.59-.68v.3z"/>
              </svg>
              Sign in with Apple
            </Button>

            <div className="new-to-linkedin">
              New to LinkedIn? <a href="#" className="signup-link">Join now</a>
            </div>
          </Card>
        </Col>
      </Row>

      <footer className="footer">
        <div className="d-flex justify-content-center align-items-center mb-2" style={{ color: 'blue' }}>
      
        </div>
        <div>
          <a href="#" className="footer-link">User Agreement</a>
          <a href="#" className="footer-link">Privacy Policy</a>
          <a href="#" className="footer-link">Community Guidelines</a>
          <a href="#" className="footer-link">Cookie Policy</a>
          <a href="#" className="footer-link">Copyright Policy</a>
          <a href="#" className="footer-link">Send Feedback</a>
          <a href="#" className="footer-link">Language</a>
        </div>
      </footer>
    </Container>
  );
};

export default LoginPage;