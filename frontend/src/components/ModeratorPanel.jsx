import React, { useState, useEffect } from 'react';
import { RoleBadge, RoleGuard } from './RoleGuard';
import { getRoleDisplay, canManageUser } from '../utils/roleUtils';

const ModeratorPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/users?role=${filter === 'all' ? '' : filter}&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Lỗi khi lấy danh sách users');
      }

      const data = await response.json();
      setUsers(data.data?.users || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filter, search]);

  // Handle role change (moderator can only downgrade users to user)
  const handleRoleChange = async (userId, newRole) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      if (!response.ok) {
        throw new Error('Lỗi khi cập nhật role');
      }

      alert('Cập nhật role thành công!');
      fetchUsers(); // Refresh list
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const filteredUsers = users.filter(user => 
    user._id !== currentUser._id // Don't show current user
  );

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          paddingBottom: '15px',
          borderBottom: '2px solid #FF9800'
        }}>
          <h2 style={{ margin: 0, color: '#333' }}>
            ⭐ Moderator Panel
          </h2>
          <RoleBadge role={currentUser.role} />
        </div>

        {/* Search and Filter */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px'
            }}
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              fontSize: '14px',
              backgroundColor: 'white'
            }}
          >
            <option value="all">Tất cả roles</option>
            <option value="user">Chỉ Users</option>
            <option value="moderator">Chỉ Moderators</option>
            <option value="admin">Chỉ Admins</option>
          </select>

          <button
            onClick={fetchUsers}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '14px'
            }}
          >
            🔄 Làm mới
          </button>
        </div>

        {/* Moderator Info */}
        <div style={{
          backgroundColor: '#fff3e0',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px',
          border: '1px solid #ffcc02'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#ef6c00' }}>
            ⭐ Quyền Moderator:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '20px', color: '#ef6c00' }}>
            <li>Xem danh sách tất cả users</li>
            <li>Thay đổi role của users (chỉ có thể hạ cấp users)</li>
            <li>Quản lý nội dung và báo cáo</li>
            <li>Không thể thay đổi role của moderators hoặc admins</li>
          </ul>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px',
            border: '1px solid #ffcdd2'
          }}>
            ❌ {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '18px', color: '#666' }}>⏳ Đang tải...</div>
          </div>
        ) : (
          <>
            {/* Users Count */}
            <div style={{
              marginBottom: '15px',
              fontSize: '14px',
              color: '#666'
            }}>
              📊 Tìm thấy {filteredUsers.length} users
            </div>

            {/* Users Table */}
            <div style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f5f5f5' }}>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                      👤 User
                    </th>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: '1px solid #ddd' }}>
                      📧 Email
                    </th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                      🏷️ Role
                    </th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                      📅 Tạo lúc
                    </th>
                    <th style={{ padding: '12px', textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                      ⚙️ Hành động
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="5" style={{
                        padding: '40px',
                        textAlign: 'center',
                        color: '#666'
                      }}>
                        😔 Không tìm thấy users nào
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user._id} style={{
                        borderBottom: '1px solid #f0f0f0',
                        ':hover': { backgroundColor: '#f9f9f9' }
                      }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              borderRadius: '50%',
                              backgroundColor: getRoleDisplay(user.role).color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              fontWeight: 'bold'
                            }}>
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div style={{ fontWeight: 'bold', color: '#333' }}>
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: '#666' }}>
                          {user.email}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <RoleBadge role={user.role} size="small" />
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                          {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          {canManageUser(currentUser.role, user.role) ? (
                            <div style={{ display: 'flex', gap: '5px', justifyContent: 'center' }}>
                              {user.role !== 'user' && (
                                <button
                                  onClick={() => handleRoleChange(user._id, 'user')}
                                  style={{
                                    padding: '5px 10px',
                                    backgroundColor: '#ff9800',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '12px'
                                  }}
                                  title="Hạ cấp về User"
                                >
                                  ⬇️ User
                                </button>
                              )}
                            </div>
                          ) : (
                            <span style={{ fontSize: '12px', color: '#999' }}>
                              Không thể quản lý
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ModeratorPanel;