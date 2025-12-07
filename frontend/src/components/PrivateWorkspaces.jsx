import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PrivateWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);

  useEffect(() => {
    axios.get('/workspaces').then(res => setWorkspaces(res.data.data));
  }, []);

  const loadNotes = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
    axios.get(`/notes/private?search=${search}`).then(res => setNotes(res.data.data)); // Backend filters by company
  };

  const deleteNote = async (noteId) => {
    await axios.delete(`/notes/${noteId}`);
    loadNotes(selectedWorkspace); // Refresh
  };

  return (
    <div className="container">
      <h2 className="mb-4">Private Workspaces</h2>
      <Form.Control
        type="text"
        placeholder="Search notes by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-3"
      />
      <Row>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              {workspaces.map(ws => (
                <ListGroup.Item
                  key={ws.id}
                  action
                  onClick={() => loadNotes(ws.id)}
                  active={selectedWorkspace === ws.id}
                >
                  {ws.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
        <Col md={8}>
          {selectedWorkspace && (
            <Card>
              <Card.Header>Notes in Workspace</Card.Header>
              <ListGroup variant="flush">
                {notes.map(note => (
                  <ListGroup.Item key={note.id}>
                    <strong>{note.title}</strong> {note.is_draft && <span className="badge bg-warning">Draft</span>}
                    <div className="float-end">
                      <Link to={`/notes/${note.id}/edit`} className="btn btn-sm btn-primary me-2">Edit</Link>
                      <Button variant="danger" size="sm" onClick={() => deleteNote(note.id)}>Delete</Button>
                      <Link to={`/notes/${note.id}/history`} className="btn btn-sm btn-info ms-2">History</Link>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PrivateWorkspaces;