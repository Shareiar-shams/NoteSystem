import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

const PublicNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('new');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userVotes, setUserVotes] = useState({});

  useEffect(() => {
    fetchNotes();
  }, [search, sort, currentPage]);

  const fetchNotes = () => {
    setLoading(true);
    axios.get(`/notes/public?search=${search}&sort=${sort}&page=${currentPage}`)
      .then(res => {
        setNotes(res.data.data);
        setTotalPages(res.data.last_page);

        // Set user votes from response
        const votes = {};
        res.data.data.forEach(note => {
          if (note.user_vote) {
            votes[note.id] = note.user_vote;
          }
        });
        setUserVotes(votes);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const vote = async (noteId, e) => {
    e.preventDefault();
    e.stopPropagation();

    const currentVote = userVotes[noteId];
    let newVoteType;

    if (currentVote === 'up') {
      newVoteType = 'down';
    } else if (currentVote === 'down') {
      newVoteType = 'up';
    } else {
      newVoteType = 'up'; // Default to up if no vote
    }

    // Optimistically update UI
    setUserVotes(prev => ({ ...prev, [noteId]: newVoteType }));

    // Update vote counts locally
    setNotes(prevNotes =>
      prevNotes.map(note => {
        if (note.id === noteId) {
          const updatedNote = { ...note };
          // Adjust counts based on vote change
          if (currentVote === 'up' && newVoteType === 'down') {
            updatedNote.upvotes_count = (updatedNote.upvotes_count || 0) - 1;
            updatedNote.downvotes_count = (updatedNote.downvotes_count || 0) + 1;
          } else if (currentVote === 'down' && newVoteType === 'up') {
            updatedNote.upvotes_count = (updatedNote.upvotes_count || 0) + 1;
            updatedNote.downvotes_count = (updatedNote.downvotes_count || 0) - 1;
          } else if (!currentVote && newVoteType === 'up') {
            updatedNote.upvotes_count = (updatedNote.upvotes_count || 0) + 1;
          } else if (!currentVote && newVoteType === 'down') {
            updatedNote.downvotes_count = (updatedNote.downvotes_count || 0) + 1;
          }
          return updatedNote;
        }
        return note;
      })
    );

    try {
      await axios.post(`/notes/${noteId}/vote`, { vote: newVoteType });
    } catch (error) {
      console.error('Voting failed:', error);
      // Revert on error
      setUserVotes(prev => ({ ...prev, [noteId]: currentVote }));
      setNotes(prevNotes =>
        prevNotes.map(note => {
          if (note.id === noteId) {
            const revertedNote = { ...note };
            // Revert counts
            if (currentVote === 'up' && newVoteType === 'down') {
              revertedNote.upvotes_count = (revertedNote.upvotes_count || 0) + 1;
              revertedNote.downvotes_count = (revertedNote.downvotes_count || 0) - 1;
            } else if (currentVote === 'down' && newVoteType === 'up') {
              revertedNote.upvotes_count = (revertedNote.upvotes_count || 0) - 1;
              revertedNote.downvotes_count = (revertedNote.downvotes_count || 0) + 1;
            } else if (!currentVote && newVoteType === 'up') {
              revertedNote.upvotes_count = (revertedNote.upvotes_count || 0) - 1;
            } else if (!currentVote && newVoteType === 'down') {
              revertedNote.downvotes_count = (revertedNote.downvotes_count || 0) - 1;
            }
            return revertedNote;
          }
          return note;
        })
      );
    }
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
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Row>
            {notes.map(note => (
              <Col md={6} lg={4} key={note.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{note.title}</Card.Title>
                    <Card.Text>
                      <small className="text-muted">Workspace: {note.workspace.name}</small><br />
                      <small className="text-muted">Tags: {note.tags.map(t => t.name).join(', ')}</small>
                    </Card.Text>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon
                          icon={userVotes[note.id] === 'down' ? faThumbsDown : faThumbsUp}
                          style={{
                            cursor: 'pointer',
                            fontSize: '1.5rem',
                            color: userVotes[note.id] ? (userVotes[note.id] === 'up' ? '#007bff' : '#dc3545') : '#6c757d'
                          }}
                          onClick={(e) => vote(note.id, e)}
                          className="me-2"
                        />
                        <small className="text-muted">
                          {note.upvotes || 0} 👍 {note.downvotes || 0} 👎
                        </small>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                />
                <Pagination.Prev
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                />
                {[...Array(Math.min(5, totalPages))].map((_, index) => {
                  const page = Math.max(1, currentPage - 2) + index;
                  if (page > totalPages) return null;
                  return (
                    <Pagination.Item
                      key={page}
                      active={page === currentPage}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </Pagination.Item>
                  );
                })}
                <Pagination.Next
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                />
                <Pagination.Last
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                />
              </Pagination>
            </div>
          )}
        </>
      )}
     </div>
   );
 };

export default PublicNotes;