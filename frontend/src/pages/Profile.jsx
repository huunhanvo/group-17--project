import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  selectCurrentUser, 
  selectIsAuthenticated, 
  logoutUser 
} from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import './Profile.css';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Đăng xuất thành công! 👋');
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return <div className="loading">⏳ Đang tải...</div>;
  }

  const getRoleBadgeClass = (role) => {
    return `role-badge role-${role}`;
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <div className="avatar-section">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="avatar-image" />
              ) : (
                <div className="avatar-placeholder">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <h1>{user.name}</h1>
            <p className="email">{user.email}</p>
            <span className={getRoleBadgeClass(user.role)}>
              {user.role === 'admin' && '👑 Admin'}
              {user.role === 'moderator' && '⭐ Moderator'}
              {user.role === 'user' && '👤 User'}
            </span>
          </div>

          <div className="profile-info">
            <h2>📋 Thông tin tài khoản</h2>
            
            <div className="info-row">
              <span className="label">👤 Tên:</span>
              <span className="value">{user.name}</span>
            </div>

            <div className="info-row">
              <span className="label">📧 Email:</span>
              <span className="value">{user.email}</span>
            </div>

            <div className="info-row">
              <span className="label">🎭 Vai trò:</span>
              <span className="value">{user.role}</span>
            </div>

            <div className="info-row">
              <span className="label">📅 Ngày tạo:</span>
              <span className="value">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString('vi-VN') : 'N/A'}
              </span>
            </div>

            {user.lastLogin && (
              <div className="info-row">
                <span className="label">🕐 Đăng nhập lần cuối:</span>
                <span className="value">
                  {new Date(user.lastLogin).toLocaleString('vi-VN')}
                </span>
              </div>
            )}
          </div>

          <div className="profile-actions">
            {user.role === 'admin' && (
              <button 
                className="btn-admin"
                onClick={() => navigate('/admin')}
              >
                👑 Admin Panel
              </button>
            )}
            
            <button 
              className="btn-edit"
              onClick={() => toast.info('Chức năng chỉnh sửa đang phát triển 🚧')}
            >
              ✏️ Chỉnh sửa
            </button>
            
            <button 
              className="btn-logout"
              onClick={handleLogout}
            >
              🚪 Đăng xuất
            </button>
          </div>
        </div>

        <div className="features-card">
          <h2>✨ Tính năng</h2>
          <ul className="features-list">
            <li>✅ Xem thông tin cá nhân</li>
            <li>✅ Quản lý token JWT</li>
            <li>✅ Redux state management</li>
            <li>✅ Protected routes</li>
            {user.role === 'admin' && (
              <>
                <li>✅ Quản lý users (Admin)</li>
                <li>✅ Phân quyền RBAC</li>
                <li>✅ Xem activity logs</li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
