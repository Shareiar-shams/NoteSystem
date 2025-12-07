import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../utils/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/register', { name, email, password, company_name: companyName });
      setAuthToken(res.data.token);
      navigate('/private');
    } catch (err) {
      setError('Registration failed.');
    }
  };

  return (
    <Card className="p-4 mx-auto" style={{ maxWidth: '400px' }}>
      <Card.Title>Register</Card.Title>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Register</Button>
      </Form>
    </Card>
  );
};

export default Register;