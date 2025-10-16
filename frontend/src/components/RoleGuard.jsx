import React from 'react';
import { hasPermission, hasRole, hasMinRole, hasAnyRole, getRoleDisplay } from '../utils/roleUtils';

// Higher-order component for role-based rendering
export const withRoleGuard = (WrappedComponent, requiredRoles = [], options = {}) => {
  return (props) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const userRole = user.role || 'user';
    
    const hasAccess = Array.isArray(requiredRoles) 
      ? hasAnyRole(userRole, requiredRoles)
      : hasRole(userRole, requiredRoles);

    if (!hasAccess) {
      if (options.fallback) {
        return options.fallback;
      }
      
      return (
        <div style={{
          padding: '20px',
          textAlign: 'center',
          backgroundColor: '#ffebee',
          border: '1px solid #ffcdd2',
          borderRadius: '8px',
          color: '#c62828'
        }}>
          <h3>🚫 Quyền truy cập bị từ chối</h3>
          <p>Bạn cần quyền {requiredRoles.join(' hoặc ')} để xem nội dung này.</p>
          <p>Quyền hiện tại: <strong>{getRoleDisplay(userRole).name}</strong></p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };
};

// Component for conditional rendering based on roles
export const RoleGuard = ({ 
  children, 
  roles = [], 
  permission = null,
  minRole = null,
  fallback = null,
  showFallback = true 
}) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const userRole = user.role || 'user';
  
  let hasAccess = false;

  // Check by permission
  if (permission) {
    hasAccess = hasPermission(userRole, permission);
  }
  // Check by minimum role
  else if (minRole) {
    hasAccess = hasMinRole(userRole, minRole);
  }
  // Check by specific roles
  else if (roles.length > 0) {
    hasAccess = hasAnyRole(userRole, roles);
  }

  if (!hasAccess) {
    if (fallback) {
      return fallback;
    }
    
    if (showFallback) {
      return (
        <div style={{
          padding: '15px',
          backgroundColor: '#fff3e0',
          border: '1px solid #ffcc02',
          borderRadius: '6px',
          color: '#ef6c00',
          fontSize: '14px',
          textAlign: 'center'
        }}>
          ⚠️ Tính năng này cần quyền cao hơn
        </div>
      );
    }
    
    return null;
  }

  return children;
};

// Component hiển thị role badge
export const RoleBadge = ({ role, size = 'normal' }) => {
  const roleInfo = getRoleDisplay(role);
  
  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: size === 'small' ? '4px' : '6px',
    padding: size === 'small' ? '4px 8px' : '6px 12px',
    backgroundColor: roleInfo.color,
    color: 'white',
    borderRadius: '20px',
    fontSize: size === 'small' ? '12px' : '14px',
    fontWeight: 'bold',
    border: 'none'
  };

  return (
    <span style={badgeStyle}>
      <span>{roleInfo.icon}</span>
      <span>{roleInfo.name}</span>
    </span>
  );
};

// Component hiển thị permissions list
export const PermissionsList = ({ userRole }) => {
  const permissions = [];
  
  // Check all permissions for current role
  Object.entries(require('../utils/roleUtils').PERMISSIONS).forEach(([key, allowedRoles]) => {
    if (allowedRoles.includes(userRole)) {
      permissions.push(key);
    }
  });

  return (
    <div style={{
      backgroundColor: '#f5f5f5',
      padding: '15px',
      borderRadius: '8px',
      marginTop: '10px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
        🔐 Quyền của bạn:
      </h4>
      {permissions.length > 0 ? (
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          {permissions.map(permission => (
            <li key={permission} style={{ 
              fontSize: '14px', 
              color: '#666',
              marginBottom: '5px'
            }}>
              {permission.replace(/_/g, ' ').toLowerCase()}
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ margin: 0, fontSize: '14px', color: '#999' }}>
          Không có quyền đặc biệt
        </p>
      )}
    </div>
  );
};

export default RoleGuard;