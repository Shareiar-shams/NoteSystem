import React from 'react';
import { Card, ListGroup, Button, Col } from 'react-bootstrap';

const WorkspaceList = ({
  workspaces,
  loadingWorkspaces,
  selectedWorkspace,
  onWorkspaceClick,
  onEditWorkspace,
  onDeleteWorkspace,
  onCreateWorkspace
}) => {
  return (
    <Col md={4}>
      {loadingWorkspaces ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading workspaces...</span>
          </div>
        </div>
      ) : (
        <Card>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <span>Workspaces</span>
            <Button variant="success" size="sm" onClick={onCreateWorkspace}>
              Create
            </Button>
          </Card.Header>
          <ListGroup variant="flush">
            {workspaces.map(ws => (
              <ListGroup.Item
                key={ws.id}
                active={selectedWorkspace === ws.id}
                className="d-flex justify-content-between align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={() => onWorkspaceClick(ws.id)}
              >
                <span>{ws.name}</span>
                <div onClick={(e) => e.stopPropagation()}>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => onEditWorkspace(ws)}
                    className="me-1"
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDeleteWorkspace(ws.id)}
                  >
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card>
      )}
    </Col>
  );
};

export default WorkspaceList;