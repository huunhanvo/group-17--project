import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Redux
import { selectIsAuthenticated, selectCurrentUser, fetchCurrentUser } from './store/slices/authSlice';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AdminPanel from './components/AdminPanel';
import UserList from './components/UserList';
import ActivityLogs from './components/ActivityLogs';

// Context
import { SocketProvider } from './context/SocketContext';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  // Fetch current user on app load if authenticated
  useEffect(() => {
    if (isAuthenticated && !currentUser) {
      console.log('🔄 Fetching current user...');
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, currentUser, dispatch]);

  return (
    <SocketProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                isAuthenticated ? <Navigate to="/profile" replace /> : <Login />
              } 
            />

            {/* Protected Routes - Require Authentication */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['admin', 'moderator']}>
                  <UserList />
                </ProtectedRoute>
              }
            />

            {/* Admin Only Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/logs"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ActivityLogs title="🔍 Activity Logs - Admin" />
                </ProtectedRoute>
              }
            />

            <Route
              path="/logs/user/:userId"
              element={
                <ProtectedRoute>
                  <ActivityLogs title="🔍 My Activity Logs" />
                </ProtectedRoute>
              }
            />

            {/* Default Redirect */}
            <Route 
              path="/" 
              element={
                isAuthenticated ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />
              } 
            />

            {/* 404 Not Found */}
            <Route 
              path="*" 
              element={
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <h1>404 - Page Not Found</h1>
                  <p>Trang bạn tìm không tồn tại</p>
                  <a href="/">Về trang chủ</a>
                </div>
              } 
            />
          </Routes>

          {/* Toast Notifications */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </Router>
    </SocketProvider>
  );
}

export default App;
