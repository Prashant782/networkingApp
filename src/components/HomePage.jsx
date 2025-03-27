import React, { useState, useEffect, useCallback, memo } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import PostCard from './PostCard';
import CommentModal from './CommentModal';
import mockPosts from '../data/posts.json';
import { useAppContext } from '../context/AppContext';
import { ActionTypes } from '../context/AppContext';

const UserInfoCard = memo(({ user }) => {
  return (
    <Card className="shadow-sm text-center">
      <div className="bg-light p-3" style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
        <img 
          src={"/public/images/profilePic.png"} 
          className="rounded-circle mb-3 profile-pic" 
          style={{ width: '100px', height: '100px' }} 
          alt={user.name} 
        />
      </div>
      <Card.Body className="p-3">
        <Card.Title>{'Prashant kr. Sah'}</Card.Title>
        <Card.Text className="text-muted small">{user.jobTitle || 'React Development training at Incture'}</Card.Text>
        <hr />
        <div className="text-muted small text-start">
          <p><strong>Connections</strong><br />Grow your network</p>
          <p><strong>Who viewed your profile</strong><br />21</p>
        </div>
      </Card.Body>
    </Card>
  );
});

const NewsCard = memo(() => {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <Card.Title className="h6">Trending Now</Card.Title>
        <ul className="list-unstyled">
          <li className="mb-2">
            <i className="bi bi-dot fs-4"></i>
            <strong>Zepto follows in BigBasket's</strong>
            <p className="text-muted small ms-4">1d ago • 1,243 readers</p>
          </li>
          <li className="mb-2">
            <i className="bi bi-dot fs-4"></i>
            <strong>Green job set to grow</strong>
            <p className="text-muted small ms-4">2d ago • 3,121 readers</p>
          </li>
          <li className="mb-2">
            <i className="bi bi-dot fs-4"></i>
            <strong>AI transforms hiring practices</strong>
            <p className="text-muted small ms-4">3d ago • 1,456 readers</p>
          </li>
          <li className="mb-2">
            <i className="bi bi-dot fs-4"></i>
            <strong>Unpaid loans effect public bank</strong>
            <p className="text-muted small ms-4">4d ago • 1,001 readers</p>
          </li>
          <li className="mb-2">
            <i className="bi bi-dot fs-4"></i>
            <strong>Paytm cuts ties with Juspat</strong>
            <p className="text-muted small ms-4">4d ago • 1,556 readers</p>
          </li>
        </ul>
      </Card.Body>
    </Card>
  );
});

const NewPostCard = memo(({ user }) => {
  return (
    <Card className="shadow-sm mb-3">
      <Card.Body className="p-3">
        <div className="d-flex">
          <img 
            src={'/public/images/profilePic.png'} 
            className="rounded-circle me-2" 
            width="40" 
            height="40" 
            alt={user.name} 
          />
          <Form.Control
            placeholder="Start a post"
            className="rounded-pill bg-light"
            onClick={() => alert('Post creation would open here')}
            readOnly
          />
        </div>
        <div className="d-flex justify-content-between mt-3">
          <Button variant="link" className="text-decoration-none">
            <i className="bi bi-image text-primary"></i> Photo
          </Button>
          <Button variant="link" className="text-decoration-none">
            <i className="bi bi-play-btn-fill text-success"></i> Video
          </Button>
          <Button variant="link" className="text-decoration-none">
            <i className="bi bi-calendar-event text-warning"></i> Event
          </Button>
          <Button variant="link" className="text-decoration-none">
            <i className="bi bi-newspaper text-danger"></i> Article
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
});

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const { state, dispatch } = useAppContext();
  const { user, likedPosts } = state;

  useEffect(() => {
    try {
      setPosts(mockPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }, []);

  const handleLike = useCallback((postId) => {
    try {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const isLiked = likedPosts.includes(postId);
          return {
            ...post,
            likes: isLiked ? post.likes - 1 : post.likes + 1
          };
        }
        return post;
      }));
 
      dispatch({
        type: ActionTypes.TOGGLE_LIKE_POST,
        payload: postId
      });
    } catch (error) {
      console.error('Error handling like:', error);
    }
  }, [posts, likedPosts, dispatch]);

  const handleComment = useCallback((post) => {
    setCurrentPost(post);
    setShowModal(true);
  }, []);

  const handleAddComment = useCallback((comment) => {
    if (currentPost) {
      try {
        const updatedPosts = posts.map(post => {
          if (post.id === currentPost.id) {
            return {
              ...post,
              comments: [...post.comments, {
                id: post.comments.length + 1,
                userId: user.id,
                userName: user.name,
                content: comment
              }]
            };
          }
          return post;
        });
        setPosts(updatedPosts);
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
    setShowModal(false);
  }, [currentPost, posts, user]);

  return (
    <Container className="pt-5 mt-5">
      <Row>
        <Col lg={3} className="d-none d-lg-block">
          <UserInfoCard user={user} />
        </Col>
        <Col lg={6}>
          <NewPostCard user={user} />

          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              onLike={handleLike} 
              onComment={handleComment}
              isLiked={likedPosts.includes(post.id)}
            />
          ))}
        </Col>
        <Col lg={3} className="d-none d-lg-block">
          <NewsCard />
        </Col>
      </Row>
      
      <CommentModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        onAddComment={handleAddComment} 
        post={currentPost}
      />
    </Container>
  );
};

export default HomePage;
