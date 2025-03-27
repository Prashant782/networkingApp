import React, { useState, useEffect, useCallback, memo } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Modal } from 'react-bootstrap';
import jobsData from '../data/jobs.json';
import { useAppContext } from '../context/AppContext';
import { ActionTypes } from '../context/AppContext';
const SearchCard = memo(({ searchTerm, onSearchChange }) => (
  <Card className="shadow-sm">
    <Card.Body>
      <Card.Title className="mb-3">Search Jobs</Card.Title>
      <InputGroup>
        <InputGroup.Text>
          <i className="bi bi-search"></i>
        </InputGroup.Text>
        <Form.Control
          placeholder="Search by title, company, or location"
          value={searchTerm}
          onChange={onSearchChange}
        />
        <Button variant="primary">
          Search
        </Button>
      </InputGroup>
    </Card.Body>
  </Card>
));

const FiltersCard = memo(({ savedJobsCount }) => (
  <Card className="shadow-sm mb-4">
    <Card.Body>
      <Card.Title className="h6">Saved Jobs</Card.Title>
      <p className="text-muted small">
        {savedJobsCount} saved jobs
      </p>
      <hr />
      <Card.Title className="h6">Job Filters</Card.Title>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="small">Date Posted</Form.Label>
          <Form.Select size="sm">
            <option>Any time</option>
            <option>Past month</option>
            <option>Past week</option>
            <option>Past 24 hours</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="small">Job Type</Form.Label>
          <div>
            <Form.Check type="checkbox" label="Full-time" id="fulltime" />
            <Form.Check type="checkbox" label="Part-time" id="parttime" />
            <Form.Check type="checkbox" label="Contract" id="contract" />
            <Form.Check type="checkbox" label="Internship" id="internship" />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="small">Experience Level</Form.Label>
          <div>
            <Form.Check type="checkbox" label="Entry level" id="entry" />
            <Form.Check type="checkbox" label="Mid-Senior level" id="mid" />
            <Form.Check type="checkbox" label="Director" id="director" />
            <Form.Check type="checkbox" label="Executive" id="executive" />
          </div>
        </Form.Group>
      </Form>
    </Card.Body>
  </Card>
));

const JobCard = memo(({ job, isSaved, onJobClick, onSaveToggle }) => (
  <Card className="shadow-sm mb-3">
    <Card.Body>
      <Row>
        <Col md={10} onClick={() => onJobClick(job)} style={{ cursor: 'pointer' }}>
          <div className="d-flex">
            <div className="me-3">
              <img src={job.logo} alt={job.company} className="company-logo" />
            </div>
            <div>
              <h5 className="mb-1">{job.title}</h5>
              <p className="mb-1">{job.company}</p>
              <p className="text-muted small mb-1">{job.location} • {job.type}</p>
              <p className="text-muted small mb-1">{job.salary}</p>
              <p className="text-muted small">Posted {job.posted}</p>
            </div>
          </div>
        </Col>
        <Col md={2} className="d-flex justify-content-end align-items-start">
          <Button 
            variant={isSaved ? "primary" : "outline-primary"} 
            onClick={() => onSaveToggle(job.id)}
          >
            <i className={`bi ${isSaved ? "bi-bookmark-fill" : "bi-bookmark"}`}></i>
          </Button>
        </Col>
      </Row>
    </Card.Body>
  </Card>
));

const EmptyJobsCard = memo(() => (
  <Card className="shadow-sm">
    <Card.Body className="text-center p-5">
      <i className="bi bi-search fs-1 text-muted"></i>
      <h5 className="mt-3">No jobs found</h5>
      <p className="text-muted">Try different search terms</p>
    </Card.Body>
  </Card>
));

const JobsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const { state, dispatch } = useAppContext();
  const { savedJobs } = state;
  
  useEffect(() => {
    try {
      setJobs(jobsData.jobs);
      setFilteredJobs(jobsData.jobs);
    } catch (error) {
      console.error('Error loading jobs:', error);
    }
  }, []);

  useEffect(() => {
    try {
      const filtered = jobs.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredJobs(filtered);
    } catch (error) {
      console.error('Error filtering jobs:', error);
      setFilteredJobs(jobs);
    }
  }, [searchTerm, jobs]);

  const handleJobClick = useCallback((job) => {
    setSelectedJob(job);
    setShowModal(true);
  }, []);

  const handleSaveJob = useCallback((jobId) => {
    try {
      dispatch({
        type: ActionTypes.TOGGLE_SAVE_JOB,
        payload: jobId
      });
    } catch (error) {
      console.error('Error saving job:', error);
    }
  }, [dispatch]);

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  return (
    <Container className="pt-5 mt-5">
      <Row className="mb-4">
        <Col>
          <SearchCard searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        </Col>
      </Row>
      
      <Row>
        <Col md={3} className="d-none d-md-block">
          <FiltersCard savedJobsCount={savedJobs.length} />
        </Col>
        
        <Col md={9}>
          {filteredJobs.length === 0 ? (
            <EmptyJobsCard />
          ) : (
            filteredJobs.map(job => (
              <JobCard 
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onJobClick={handleJobClick}
                onSaveToggle={handleSaveJob}
              />
            ))
          )}
        </Col>
      </Row>
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        size="lg"
        centered
      >
        {selectedJob && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedJob.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex align-items-center mb-4">
                <img src={selectedJob.logo} alt={selectedJob.company} className="company-logo me-3" />
                <div>
                  <h5>{selectedJob.company}</h5>
                  <p className="text-muted mb-0">{selectedJob.location} • {selectedJob.type}</p>
                  <p className="text-muted">Posted {selectedJob.posted}</p>
                </div>
              </div>
              
              <h6 className="mb-2">Salary Range</h6>
              <p>{selectedJob.salary}</p>
              
              <h6 className="mb-2">Job Description</h6>
              <p>{selectedJob.description}</p>
              
              <h6 className="mb-2">Requirements</h6>
              <ul>
                {selectedJob.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </Modal.Body>
            <Modal.Footer>
              <Button 
                variant={savedJobs.includes(selectedJob.id) ? "primary" : "outline-primary"}
                onClick={() => handleSaveJob(selectedJob.id)}
              >
                <i className={`bi ${savedJobs.includes(selectedJob.id) ? "bi-bookmark-fill" : "bi-bookmark"} me-2`}></i>
                {savedJobs.includes(selectedJob.id) ? "Saved" : "Save Job"}
              </Button>
              <Button variant="primary">
                Apply Now
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default JobsPage;