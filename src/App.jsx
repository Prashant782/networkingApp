import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import { AppProvider, useAppContext } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';

const HomePage = lazy(() => import('./components/HomePage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const JobsPage = lazy(() => import('./components/JobsPages'));
const ConnectionsPage = lazy(() => import('./components/ConnectionPages'));

const LoadingFallback = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
);

const AppRoutes = () => {
  const { state } = useAppContext();
  const { isLoggedIn } = state;

  return (
    <>
      {isLoggedIn && <Navbar />}
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/login" element={isLoggedIn ? <Navigate to="/home" /> : <LoginPage />} />
            <Route path="/home" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
            <Route path="/profile/:username" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/jobs" element={isLoggedIn ? <JobsPage /> : <Navigate to="/login" />} />
            <Route path="/connections" element={isLoggedIn ? <ConnectionsPage /> : <Navigate to="/login" />} />
            <Route path="/" element={<Navigate to={isLoggedIn ? "/home" : "/login"} />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppProvider>
        <div className="app">
          <AppRoutes />
        </div>
      </AppProvider>
    </Router>
  );
}

export default App;