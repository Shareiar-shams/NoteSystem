import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRoute from './components/AuthRoute';
import AppNavbar from './components/Navbar';
  
// Pages
import Login from './components/Login';
import Register from './components/Register';
import PrivateWorkspaces from './components/PrivateWorkspaces';
import PublicNotes from './components/PublicNotes';
import NoteForm from './components/NoteForm';
import NoteHistory from './components/NoteHistory';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes - Only accessible when NOT logged in */}
        <Route path="/login" element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        } />
        <Route path="/register" element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        } />

        {/* Protected Routes - Only accessible when logged in */}
        <Route path="/private" element={
          <ProtectedRoute>
            <>
              <AppNavbar />
              <div className="container">
                <PrivateWorkspaces />
              </div>
            </>
          </ProtectedRoute>
        } />

        <Route path="/public" element={
          <>
            <AppNavbar />
            <div className="container">
              <PublicNotes />
            </div>
          </>
        } /> 

        <Route path="/notes/create" element={
          <ProtectedRoute>
            <>
              <AppNavbar />
              <NoteForm />
            </>
          </ProtectedRoute>
        } />

        <Route path="/notes/:id/edit" element={
          <ProtectedRoute>
            <>
              <AppNavbar />
              <NoteForm />
            </>
          </ProtectedRoute>
        } />

        <Route path="/notes/:id/history" element={
          <ProtectedRoute>
            <>
              <AppNavbar />
              <NoteHistory />
            </>
          </ProtectedRoute>
        } />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/private" replace />} />
      </Routes>
    </Router>
  );
}

export default App
