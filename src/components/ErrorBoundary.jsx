import React, { Component } from 'react';
import { Container, Alert, Button } from 'react-bootstrap';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ error, errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container className="mt-5 pt-5">
          <Alert variant="danger">
            <Alert.Heading>Something went wrong</Alert.Heading>
            <p>
              We're sorry, but an error occurred while rendering this page.
            </p>
            {this.state.error && (
              <pre className="mt-3 p-3 bg-light">
                {this.state.error.toString()}
              </pre>
            )}
            <hr />
            <div className="d-flex justify-content-between">
              <Button 
                variant="outline-danger" 
                onClick={() => window.location.href = '/home'}
              >
                Go to Home
              </Button>
              <Button 
                variant="primary" 
                onClick={this.handleReset}
              >
                Try Again
              </Button>
            </div>
          </Alert>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
