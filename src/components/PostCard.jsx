import React, { memo } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Comment = memo(({ comment }) => (
  <div className="d-flex mb-2">
    <Link to={`/profile/${comment.userId}`} className="me-2">
      <div className="comment-avatar bg-light rounded-circle d-flex justify-content-center align-items-center" 
        style={{ width: '32px', height: '32px', fontSize: '14px' }}>
        {comment.userName.charAt(0)}
      </div>
    </Link>
    <div className="bg-light rounded p-2 w-100">
      <Link to={`/profile/${comment.userId}`} className="text-decoration-none">
        <small className="fw-bold">{comment.userName}</small>
      </Link>
      <small className="d-block">{comment.content}</small>
    </div>
  </div>
));

const PostCard = memo(({ post, onLike, onComment, isLiked }) => {
  const handleShare = () => {
    try {
      alert('Share functionality would be implemented here');
    } catch (error) {
      console.error('Error handling share:', error);
      alert('Unable to share post at this time');
    }
  };

  return (
    <Card className="shadow-sm mb-3">
      <Card.Body className="p-3">
        <div className="d-flex align-items-center mb-2">
          <Link to={`/profile/${post.userId}`}>
            <img 
              src={post.userProfilePic} 
              alt={post.userName} 
              className="post-avatar me-2 rounded-circle"
              style={{ width: '48px', height: '48px', objectFit: 'cover' }}
            />
          </Link>
          <div>
            <Link to={`/profile/${post.userId}`} className="text-decoration-none text-dark">
              <h6 className="mb-0">{post.userName}</h6>
            </Link>
            <small className="text-muted">{post.userTitle}</small>
            <br />
            <small className="text-muted">{post.timestamp}</small>
          </div>
        </div>
        <Card.Text>{post.content}</Card.Text>
        {post.image && (
          <img src={post.image} alt="Post" className="img-fluid rounded mb-3" />
        )}
        
        <div className="d-flex justify-content-between border-top border-bottom py-2 mb-2">
          <span className="text-muted small">
            <i className="bi bi-hand-thumbs-up me-1"></i>
            {post.likes} likes • 
            <i className="bi bi-chat-text ms-2 me-1"></i>
            {post.comments.length} comments
          </span>
        </div>
        
        <div className="d-flex justify-content-between">
          <Button 
            variant="link" 
            className={`text-decoration-none ${isLiked ? 'text-primary' : 'text-muted'}`}
            onClick={() => onLike(post.id)}
          >
            <i className={`bi ${isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} me-1`}></i> Like
          </Button>
          <Button 
            variant="link" 
            className="text-decoration-none text-muted"
            onClick={() => onComment(post)}
          >
            <i className="bi bi-chat-text me-1"></i> Comment
          </Button>
          <Button 
            variant="link" 
            className="text-decoration-none text-muted"
            onClick={handleShare}
          >
            <i className="bi bi-share me-1"></i> Share
          </Button>
        </div>

        {post.comments.length > 0 && (
          <div className="comments-section mt-3 border-top pt-2">
            <h6 className="text-muted small mb-2">Comments</h6>
            {post.comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
});

export default PostCard;

