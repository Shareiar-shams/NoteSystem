import React, { useState, useEffect } from 'react';
import { Form, Button, Card, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const NoteForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('private');
  const [isDraft, setIsDraft] = useState(false);
  const [tags, setTags] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [workspaces, setWorkspaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch workspaces
    axios.get('/workspaces').then(res => setWorkspaces(res.data.data));

    if (id) {
      axios.get(`/notes/${id}`).then(res => {
        const note = res.data;
        setTitle(note.title);
        setContent(note.content);
        setType(note.type);
        setIsDraft(Boolean(note.is_draft));
        setTags(note.tags.map(t => t.name).join(', '));
        setWorkspaceId(note.workspace_id);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      content,
      type,
      is_draft: isDraft,
      workspace_id: workspaceId,
      tags: tags.split(',').map(t => t.trim()).filter(t => t), // Handle as array
    };
    try {
      if (id) {
        await axios.put(`/notes/${id}`, data);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Note updated successfully!'
        });
      } else {
        await axios.post('/notes/create', data);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Note created successfully!'
        });
      }
      navigate('/private');
    } catch (error) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: 'error',
        title: 'Failed to save note'
      });
    }
  };

  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: '600px' }}>
      <Card.Title>{id ? 'Edit Note' : 'Create Note'}</Card.Title>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control as="textarea" rows={5} value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            label="Draft"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
          />
          {isDraft && <Badge bg="info" className="mt-2">Draft Mode Active - Won't appear in listings</Badge>}
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Form.Control value={tags} onChange={(e) => setTags(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Workspace</Form.Label>
          <Form.Select value={workspaceId} onChange={(e) => setWorkspaceId(e.target.value)}>
            <option value="">Select a workspace</option>
            {workspaces.map(ws => (
              <option key={ws.id} value={ws.id}>{ws.name}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">{id ? 'Update' : 'Create'}</Button>
      </Form>
    </Card>
  );
};

export default NoteForm;