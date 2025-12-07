import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const PublicNotes = () => {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('new');

  useEffect(() => {
    axios.get(`/notes/public?search=${search}&sort=${sort}`).then(res => setNotes(res.data.data));
  }, [search, sort]);

  const vote = async (noteId, voteType) => {
    await axios.post(`/notes/${noteId}/vote`, { vote: voteType });
    // Refresh list (or update local state for upvotes count if needed)
    axios.get(`/notes/public?search=${search}&sort=${sort}`).then(res => setNotes(res.data.data));
  };

  return (
    <div className="container">
      <h2 className="mb-4">Public Notes Directory</h2>
      <Row className="mb-3">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={6}>
          <Form.Select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="new">New</option>
            <option value="old">Old</option>
            <option value="most_upvotes">Most Upvotes</option>
            <option value="downvotes">Most Downvotes</option>
          </Form.Select>
        </Col>
      </Row>
      <Card>
        <ListGroup variant="flush">
          {notes.map(note => (
            <ListGroup.Item key={note.id}>
              <strong>{note.title}</strong>
              <p>Workspace: {note.workspace.name} | Tags: {note.tags.map(t => t.name).join(', ')}</p>
              <Button variant="success" size="sm" onClick={() => vote(note.id, 'up')} className="me-2">Upvote</Button>
              <Button variant="warning" size="sm" onClick={() => vote(note.id, 'down')}>Downvote</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default PublicNotes;