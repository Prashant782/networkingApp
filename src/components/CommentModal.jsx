import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CommentModal = ({ show, onHide, onAddComment, post }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onAddComment(comment);
      setComment('');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Comment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {post && (
          <div className="mb-3">
            <h6>{post.userName}</h6>
            <p>{post.content}</p>
          </div>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>
        </Form>
        {post && post.comments.length > 0 && (
          <div className="mt-3">
            <h6>Previous Comments:</h6>
            {post.comments.map((c) => (
              <div key={c.id} className="border-top pt-2 mt-2">
                <strong>{c.userName}</strong>
                <p className="mb-1">{c.content}</p>
              </div>
            ))}
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={!comment.trim()}
        >
          Post Comment
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;