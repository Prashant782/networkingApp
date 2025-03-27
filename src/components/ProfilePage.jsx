import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Modal } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ProfilePage = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('');
  const [title, setTitle] = useState('');
  const [userPosts, setUserPosts] = useState([]);
  
  const currentUser = JSON.parse(localStorage.getItem('user')) || {};
  const isOwnProfile = currentUser.username === username;

  useEffect(() => {
    const mockProfile = {
      id: 1,
      username: 'Prashant',
      name: 'Prashant kr. Sah',
      profilePic: 'https://i.ibb.co/B5YqdQyB/profile-Pic.png',
      coverPic: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&h=400&q=80',
      bio: 'Software Engineer passionate about web development and building user-friendly applications. Always learning and exploring new technologies.',
      jobTitle: 'React Developement training at Incture',
      location: 'Bhubneswar,Odisha',
      connections: 500,
      website: 'https://example.com',
      github: 'https://github.com',
      linkedin: 'https://linkedin.com'
    };
    let userProfile = mockProfile;
    
    if (isOwnProfile) {
      const savedBio = localStorage.getItem('userBio');
      const savedTitle = localStorage.getItem('userTitle');
      
      if (savedBio) userProfile.bio = savedBio;
      if (savedTitle) userProfile.jobTitle = savedTitle;
      
      setBio(userProfile.bio);
      setTitle(userProfile.jobTitle);
    }
    
    setProfile(userProfile);

    const mockPosts = [
      {
        id: 1,
        title: "Launched My New Portfolio Website",
        content: "After weeks of work, I'm excited to share my new portfolio showcasing my recent projects!",
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
        likes: 45,
        comments: 12,
        timestamp: '2 days ago'
      },
      {
        id: 2,
        title: "Attending ReactConf 2025",
        content: "Looking forward to meeting fellow developers and learning about the latest React updates.",
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
        likes: 32,
        comments: 8,
        timestamp: '1 week ago'
      },
      {
        id: 3,
        title: "Just Completed the Advanced Node.js Course",
        content: "Leveled up my backend skills with this comprehensive course. Would highly recommend!",
        image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
        likes: 67,
        comments: 5,
        timestamp: '2 weeks ago'
      },
      {
        id: 4,
        title: "Our Team Won the Hackathon!",
        content: "Proud of what we accomplished in just 48 hours. We built an app that helps connect local volunteers with community needs.",
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
        likes: 21,
        comments: 3,
        timestamp: '1 month ago'
      }
    ];
    
    setUserPosts(mockPosts);
  }, [username, isOwnProfile]);

  const handleSaveProfile = () => {
    localStorage.setItem('userBio', bio);
    localStorage.setItem('userTitle', title);

    setProfile({
      ...profile,
      bio: bio,
      jobTitle: title
    });
    
    setIsEditing(false);
  };

  if (!profile) {
    return <div className="text-center mt-5 pt-5">Loading profile...</div>;
  }

  return (
    <Container className="pt-5 mt-5">
      <Card className="mb-4 shadow-sm">
        <div 
          className="bg-light" 
          style={{ 
            height: '200px', 
            backgroundImage: `url(${profile.coverPic})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderTopLeftRadius: '8px',
            borderTopRightRadius: '8px'
          }}
        ></div>
        <Card.Body className="position-relative pt-5">
          <div className="position-absolute" style={{ top: '-75px', left: '24px' }}>
            <img 
              src={profile.profilePic} 
              alt={profile.name} 
              className="rounded-circle border border-3 border-white shadow-sm" 
              style={{ width: '150px', height: '150px', objectFit: 'cover' }}
            />
          </div>
          
          <div className="d-flex justify-content-between align-items-start mb-4 mt-5 ms-2">
            <div>
              <h3>{profile.name}</h3>
              <p className="text-muted mb-1">{profile.jobTitle}</p>
              <p className="text-muted small mb-1">
                <i className="bi bi-geo-alt me-1"></i>
                {profile.location} • 
                <Link to="#" className="text-decoration-none ms-1">
                  Contact info
                </Link>
              </p>
              <p className="small">
                <Link to="/network" className="text-decoration-none">
                  <i className="bi bi-people me-1"></i>
                  {profile.connections}+ connections
                </Link>
              </p>
 
              <div className="mt-2 mb-3">
                {profile.website && (
                  <a href={profile.website} target="_blank" rel="noopener noreferrer" className="me-3 text-decoration-none">
                    <i className="bi bi-globe2"></i>
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer" className="me-3 text-decoration-none">
                    <i className="bi bi-github"></i>
                  </a>
                )}
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="me-3 text-decoration-none">
                    <i className="bi bi-linkedin"></i>
                  </a>
                )}
              </div>
            </div>
            
            <div className="d-flex">
              {isOwnProfile ? (
                <Button 
                  variant="outline-primary" 
                  className="rounded-pill"
                  onClick={() => setIsEditing(true)}
                >
                  <i className="bi bi-pencil me-1"></i> Edit profile
                </Button>
              ) : (
                <>
                  <Button 
                    variant="primary" 
                    className="rounded-pill me-2"
                  >
                    <i className="bi bi-person-plus me-1"></i> Connect
                  </Button>
                  <Button 
                    variant="outline-primary" 
                    className="rounded-pill"
                  >
                    <i className="bi bi-chat me-1"></i> Message
                  </Button>
                </>
              )}
            </div>
          </div>
          
          <Card className="mb-3">
            <Card.Body>
              <Card.Title className="h5">About</Card.Title>
              <Card.Text>{profile.bio}</Card.Text>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Card.Title className="h5 mb-4">
            <i className="bi bi-file-post me-2"></i>
            Posts
          </Card.Title>
          <Row>
            {userPosts.map(post => (
              <Col md={3} sm={6} className="mb-4" key={post.id}>
                <Card className="border-0 shadow-sm h-100">
                  <Link to={`/post/${post.id}`} className="text-decoration-none">
                    <Card.Img variant="top" src={post.image} />
                    <Card.Body className="p-3">
                      <h6 className="text-dark mb-2">{post.title}</h6>
                      <p className="text-muted small mb-2 text-truncate">{post.content}</p>
                      <small className="text-muted">{post.timestamp}</small>
                      <div className="d-flex justify-content-between text-muted small mt-2 pt-2 border-top">
                        <span><i className="bi bi-hand-thumbs-up me-1"></i> {post.likes}</span>
                        <span><i className="bi bi-chat-text me-1"></i> {post.comments}</span>
                      </div>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="text-center mt-3">
            <Button variant="outline-primary" className="rounded-pill">
              See All Posts
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={isEditing} onHide={() => setIsEditing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="bi bi-pencil-square me-2"></i>
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-briefcase me-1"></i>
                Job Title
              </Form.Label>
              <Form.Control 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your job title"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-file-person me-1"></i>
                Bio
              </Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell us about yourself"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-globe me-1"></i>
                Website
              </Form.Label>
              <Form.Control 
                type="url" 
                defaultValue={profile.website}
                placeholder="Enter your website URL"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-linkedin me-1"></i>
                LinkedIn
              </Form.Label>
              <Form.Control 
                type="url" 
                defaultValue={profile.linkedin}
                placeholder="Enter your LinkedIn URL"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                <i className="bi bi-github me-1"></i>
                GitHub
              </Form.Label>
              <Form.Control 
                type="url" 
                defaultValue={profile.github}
                placeholder="Enter your GitHub URL"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setIsEditing(false)}>
            <i className="bi bi-x me-1"></i>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveProfile}>
            <i className="bi bi-check2 me-1"></i>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default ProfilePage;
