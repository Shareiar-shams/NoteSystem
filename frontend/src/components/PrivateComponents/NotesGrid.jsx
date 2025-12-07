import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotesGrid = ({ notes, loadingNotes, selectedWorkspace, onDeleteNote }) => {
  return (
    <>
      {notes.map(note => (
        <Col lg={3} md={4} sm={6} xs={12} key={note.id}>
          <Card 
            className="h-100 note-card"
            style={{
              transition: 'all 0.3s ease',
              border: '1px solid #dee2e6'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-start mb-3">
                <span>{note.title}</span>
                {note.is_draft && (
                  <span className="badge bg-warning ms-2" style={{ fontSize: '0.65rem' }}>
                    Draft
                  </span>
                )}
              </Card.Title>
              <Card.Text className="text-muted small mb-3">
                {note.content ? note.content.substring(0, 100) + '...' : 'No description'}
              </Card.Text>
            </Card.Body>
            <Card.Footer className="bg-light">
              <div className="d-flex gap-2 flex-wrap">
                <Link 
                  to={`/notes/${note.id}/edit`} 
                  className="btn btn-sm btn-primary flex-grow-1"
                >
                  Edit
                </Link>
                <Button 
                  variant="outline-danger" 
                  size="sm" 
                  onClick={() => onDeleteNote(note.id)}
                  className="flex-grow-1"
                >
                  Delete
                </Button>
                <Link 
                  to={`/notes/${note.id}/history`} 
                  className="btn btn-sm btn-info flex-grow-1"
                >
                  History
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      ))}
    </>
  );
};

export default NotesGrid;