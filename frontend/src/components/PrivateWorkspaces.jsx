import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import NotesGrid from './PrivateComponents/NotesGrid';
import WorkspaceModal from './PrivateComponents/WorkspaceModal';

const PrivateWorkspaces = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);
  const [loadingNotes, setLoadingNotes] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingWorkspace, setEditingWorkspace] = useState(null);
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceDesc, setWorkspaceDesc] = useState('');

  useEffect(() => {
    axios.get('/workspaces')
      .then(res => {
        setWorkspaces(res.data.data);
        setLoadingWorkspaces(false);
      })
      .catch(() => setLoadingWorkspaces(false));
  }, []);

  const loadNotes = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
    setLoadingNotes(true);
    axios.get(`/notes/private?search=${search}`)
      .then(res => {
        setNotes(res.data.data);
        setLoadingNotes(false);
      })
      .catch(() => setLoadingNotes(false));
  };

  const deleteNote = async (noteId) => {
    await axios.delete(`/notes/${noteId}`);
    loadNotes(selectedWorkspace); // Refresh
  };

  const openCreateModal = () => {
    setModalMode('create');
    setWorkspaceName('');
    setWorkspaceDesc('');
    setShowModal(true);
  };

  const openEditModal = (workspace) => {
    setModalMode('edit');
    setEditingWorkspace(workspace);
    setWorkspaceName(workspace.name);
    setWorkspaceDesc(workspace.description || '');
    setShowModal(true);
  };

  const handleModalSubmit = async () => {
    if (workspaceName.trim()) {
      try {
        if (modalMode === 'create') {
          await axios.post('/workspaces', { name: workspaceName, description: workspaceDesc });
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Workspace created successfully!'
          });
        } else {
          await axios.put(`/workspaces/${editingWorkspace.id}`, {
            name: workspaceName,
            description: workspaceDesc
          });
          Swal.fire({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: 'success',
            title: 'Workspace updated successfully!'
          });
        }
        // Refresh workspaces
        axios.get('/workspaces')
          .then(res => setWorkspaces(res.data.data))
          .catch(() => setLoadingWorkspaces(false));
        setShowModal(false);
      } catch (error) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Failed to save workspace'
        });
      }
    }
  };

  const deleteWorkspace = async (workspaceId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/workspaces/${workspaceId}`);
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'success',
          title: 'Workspace deleted successfully!'
        });
        // Refresh workspaces
        axios.get('/workspaces')
          .then(res => setWorkspaces(res.data.data))
          .catch(() => setLoadingWorkspaces(false));
        if (selectedWorkspace === workspaceId) {
          setSelectedWorkspace(null);
          setNotes([]);
        }
      } catch (error) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: 'error',
          title: 'Failed to delete workspace'
        });
      }
    }
  };

  return (
    <div className="container-fluid">
      <div className="mb-4">
        <h2 className="mb-4">Private Workspaces</h2>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Form.Control
            type="text"
            placeholder="Search notes by title"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ maxWidth: '300px' }}
          />
          <Button 
            variant="success" 
            onClick={openCreateModal}
            className="ms-2"
          >
            + Create New Workspace
          </Button>
        </div>
      </div>

      {/* Workspaces Grid */}
      <div className="mb-5">
        <h4 className="mb-3">Your Workspaces</h4>
        {loadingWorkspaces ? (
          <div className="text-center py-5">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading workspaces...</span>
            </Spinner>
          </div>
        ) : workspaces.length === 0 ? (
          <div className="alert alert-info text-center" role="alert">
            <h5>No workspaces yet</h5>
            <p>Create your first workspace to get started!</p>
          </div>
        ) : (
          <Row className="g-4">
            {workspaces.map(ws => (
              <Col lg={3} md={4} sm={6} xs={12} key={ws.id}>
                <Card 
                  className={`h-100 workspace-card ${selectedWorkspace === ws.id ? 'border-primary border-3' : ''}`}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <Card.Header 
                    className={`text-white d-flex justify-content-between align-items-start ${selectedWorkspace === ws.id ? 'bg-primary' : 'bg-secondary'}`}
                    onClick={() => loadNotes(ws.id)}
                  >
                    <div className="flex-grow-1">
                      <Card.Title className="mb-0 text-white">{ws.name}</Card.Title>
                    </div>
                  </Card.Header>
                  
                  <Card.Body onClick={() => loadNotes(ws.id)}>
                    {ws.description && (
                      <Card.Text className="text-muted small">
                        {ws.description}
                      </Card.Text>
                    )}
                    <div className="text-center py-2">
                      <small className="badge bg-light text-dark">
                        Click to view notes
                      </small>
                    </div>
                  </Card.Body>

                  <Card.Footer className="bg-light d-flex gap-2 justify-content-between">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="flex-grow-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(ws);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="flex-grow-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteWorkspace(ws.id);
                      }}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>

      {/* Notes Section */}
      {selectedWorkspace && (
        <div className="mt-5">
          <h4 className="mb-3">Notes in Workspace</h4>
          {loadingNotes ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading notes...</span>
              </Spinner>
            </div>
          ) : notes.length === 0 ? (
            <div className="alert alert-info" role="alert">
              No notes in this workspace yet.
            </div>
          ) : (
            <Row className="g-3">
              <NotesGrid
                notes={notes}
                loadingNotes={loadingNotes}
                selectedWorkspace={selectedWorkspace}
                onDeleteNote={deleteNote}
              />
            </Row>
          )}
        </div>
      )}

      <WorkspaceModal
        show={showModal}
        onHide={() => setShowModal(false)}
        mode={modalMode}
        name={workspaceName}
        description={workspaceDesc}
        onNameChange={setWorkspaceName}
        onDescriptionChange={setWorkspaceDesc}
        onSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default PrivateWorkspaces;