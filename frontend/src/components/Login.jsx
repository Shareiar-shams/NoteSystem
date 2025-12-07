import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { setAuthToken } from '../utils/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', { email, password });
            setAuthToken(res.data.token);
            const from = location.state?.from?.pathname || '/private';
            navigate(from, { replace: true });
        } catch (err) {
            setError('Login failed. Check credentials.');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100">
            <Card className="p-4" style={{ maxWidth: '400px', width: '100%' }}>
            <Card.Title>Login</Card.Title>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
            <p className="mt-3 text-center">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
            </Card>
        </div>
    );
};

export default Login;