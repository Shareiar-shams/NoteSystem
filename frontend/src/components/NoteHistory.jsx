import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NoteHistory = () => {
  const { id } = useParams();
  const [histories, setHistories] = useState([]);

  useEffect(() => {
    axios.get(`/notes/${id}/history`).then(res => setHistories(res.data));
  }, [id]);

  const restore = async (historyId) => {
    await axios.post(`/notes/${id}/restore/${historyId}`);
    alert('Restored successfully');
  };

  return (
    <div className="container">
      <h2 className="mb-4">Note History</h2>
      <Card>
        <ListGroup variant="flush">
          {histories.map(h => (
            <ListGroup.Item key={h.id}>
              <strong>Changed at:</strong> {h.changed_at} by {h.user.name}
              <p>{h.previous_content}</p>
              <Button variant="primary" size="sm" onClick={() => restore(h.id)}>Restore</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>
    </div>
  );
};

export default NoteHistory;