import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated, selectUserRole } from '../store/slices/authSlice';

/**
 * Protected Route Component
 * Chặn truy cập nếu chưa đăng nhập hoặc không đủ quyền
 * 
 * @param {ReactNode} children - Component cần bảo vệ
 * @param {Array<string>} allowedRoles - Danh sách roles được phép truy cập
 * @param {string} redirectTo - Đường dẫn redirect nếu không có quyền
 */
const ProtectedRoute = ({ 
  children, 
  allowedRoles = [], 
  redirectTo = '/login' 
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);

  console.log('🔒 ProtectedRoute check:', { 
    isAuthenticated, 
    userRole, 
    allowedRoles 
  });

  // Kiểm tra đăng nhập
  if (!isAuthenticated) {
    console.log('❌ Not authenticated, redirecting to login');
    return <Navigate to="/login" replace />;
  }

  // Kiểm tra quyền (nếu có yêu cầu)
  if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
    console.log(`❌ Insufficient permissions. Required: ${allowedRoles.join(', ')}, Has: ${userRole}`);
    return (
      <Navigate 
        to={redirectTo} 
        replace 
        state={{ 
          error: 'Bạn không có quyền truy cập trang này',
          requiredRoles: allowedRoles,
          currentRole: userRole
        }} 
      />
    );
  }

  console.log('✅ Access granted');
  return children;
};

export default ProtectedRoute;
