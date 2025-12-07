import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const WorkspaceModal = ({
  show,
  onHide,
  mode,
  name,
  description,
  onNameChange,
  onDescriptionChange,
  onSubmit
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{mode === 'create' ? 'Create New Workspace' : 'Edit Workspace'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Workspace Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter workspace name"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Enter workspace description"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          {mode === 'create' ? 'Create Workspace' : 'Update Workspace'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default WorkspaceModal;