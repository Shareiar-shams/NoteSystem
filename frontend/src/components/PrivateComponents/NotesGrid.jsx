import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NotesGrid = ({ notes, loadingNotes, selectedWorkspace, onDeleteNote }) => {
  return (
    <>
      {notes.map(note => (
        <Col lg={3} md={4} sm={6} xs={12} key={note.id}>
          <Card 
            className={`h-100 note-card ${note.is_draft ? 'border-warning' : ''}`}
            style={{
              transition: 'all 0.3s ease',
              border: note.is_draft ? '2px solid #ffc107' : '1px solid #dee2e6',
              opacity: note.is_draft ? 0.95 : 1
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
            {note.is_draft && (
              <Card.Header className="bg-warning text-dark p-2">
                <span className="badge bg-warning text-dark" style={{ fontSize: '0.75rem' }}>
                  📝 DRAFT - Not published
                </span>
              </Card.Header>
            )}
            <Card.Body>
              <Card.Title className="d-flex justify-content-between align-items-start mb-3">
                <span className="flex-grow-1">{note.title}</span>
                {note.is_draft && (
                  <span className="badge bg-warning ms-2" style={{ fontSize: '0.65rem', whiteSpace: 'nowrap' }}>
                    Draft
                  </span>
                )}
              </Card.Title>
              <Card.Text className="text-muted small mb-3">
                {note.content ? note.content.substring(0, 100) + '...' : 'No description'}
              </Card.Text>
              {note.is_draft && (
                <small className="text-warning fw-bold d-block mb-2">
                  ⚠️ Only you can see this note
                </small>
              )}
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