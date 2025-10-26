import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import './ActivityLogs.css';

const ActivityLogs = ({ userId = null, title = "Activity Logs" }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    action: '',
    startDate: '',
    endDate: '',
    limit: 50,
    skip: 0
  });
  const [pagination, setPagination] = useState({
    total: 0,
    hasMore: false
  });

  // Action translations
  const actionTranslations = {
    login: '🔑 Đăng nhập',
    logout: '🚪 Đăng xuất',
    signup: '✍️ Đăng ký',
    create_user: '➕ Tạo user',
    update_user: '✏️ Cập nhật user',
    delete_user: '🗑️ Xóa user',
    update_role: '👑 Đổi quyền',
    upload_avatar: '📸 Upload avatar',
    forgot_password: '🔒 Quên mật khẩu',
    reset_password: '🔓 Reset mật khẩu',
    refresh_token: '🔄 Refresh token',
    view_profile: '👤 Xem profile',
    view_admin_panel: '⚙️ Vào Admin Panel'
  };

  // Status colors
  const statusColors = {
    success: '#28a745',
    failed: '#dc3545',
    warning: '#ffc107'
  };

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('🔄 Fetching activity logs...', { userId, filters });

      const endpoint = userId 
        ? `/api/logs/user/${userId}` 
        : '/api/logs';

      const queryParams = new URLSearchParams();
      if (filters.action) queryParams.append('action', filters.action);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      queryParams.append('limit', filters.limit);
      queryParams.append('skip', filters.skip);

      const response = await userAPI.getActivityLogs(endpoint, queryParams.toString());

      console.log('📦 Activity logs response:', response);

      if (response.success) {
        setLogs(response.data);
        setPagination(response.pagination);
        console.log(`✅ Loaded ${response.data.length} activity logs`);
      } else {
        setError(response.message || 'Không thể tải logs');
      }
    } catch (err) {
      console.error('❌ Error fetching logs:', err);
      const errorMessage = err.response?.status === 403 
        ? 'Bạn không có quyền xem logs này' 
        : 'Lỗi khi tải logs';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [userId, filters.skip]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value, skip: 0 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, skip: 0 }));
    fetchLogs();
  };

  const handleLoadMore = () => {
    setFilters(prev => ({ ...prev, skip: prev.skip + prev.limit }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading && logs.length === 0) {
    return (
      <div className="activity-logs-container">
        <h2>{title}</h2>
        <div className="loading">⏳ Đang tải logs...</div>
      </div>
    );
  }

  return (
    <div className="activity-logs-container">
      <h2>{title}</h2>

      {/* Filters */}
      <form className="logs-filters" onSubmit={handleSearch}>
        <div className="filter-group">
          <label htmlFor="action">Hành động:</label>
          <select 
            id="action" 
            name="action" 
            value={filters.action} 
            onChange={handleFilterChange}
          >
            <option value="">Tất cả</option>
            {Object.entries(actionTranslations).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="startDate">Từ ngày:</label>
          <input 
            type="date" 
            id="startDate" 
            name="startDate" 
            value={filters.startDate} 
            onChange={handleFilterChange} 
          />
        </div>

        <div className="filter-group">
          <label htmlFor="endDate">Đến ngày:</label>
          <input 
            type="date" 
            id="endDate" 
            name="endDate" 
            value={filters.endDate} 
            onChange={handleFilterChange} 
          />
        </div>

        <button type="submit" className="btn-search">🔍 Tìm kiếm</button>
        <button 
          type="button" 
          className="btn-reset" 
          onClick={() => {
            setFilters({ action: '', startDate: '', endDate: '', limit: 50, skip: 0 });
            setTimeout(fetchLogs, 100);
          }}
        >
          🔄 Reset
        </button>
      </form>

      {/* Error */}
      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={fetchLogs}>🔄 Thử lại</button>
        </div>
      )}

      {/* Logs Table */}
      {logs.length === 0 && !error ? (
        <div className="no-logs">📂 Không có logs nào</div>
      ) : (
        <>
          <div className="logs-table-wrapper">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Người dùng</th>
                  <th>Hành động</th>
                  <th>Chi tiết</th>
                  <th>IP Address</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log._id}>
                    <td className="log-timestamp">{formatDate(log.timestamp)}</td>
                    <td className="log-user">
                      {log.userId ? (
                        <>
                          <strong>{log.userId.name}</strong>
                          <br />
                          <small>{log.userId.email}</small>
                          <br />
                          <span className={`role-badge role-${log.userId.role}`}>
                            {log.userId.role}
                          </span>
                        </>
                      ) : (
                        <em>Unknown User</em>
                      )}
                    </td>
                    <td className="log-action">
                      {actionTranslations[log.action] || log.action}
                    </td>
                    <td className="log-details">
                      {log.details || '-'}
                      {log.targetUserId && (
                        <div className="target-user">
                          <small>→ Target: {log.targetUserId.name}</small>
                        </div>
                      )}
                    </td>
                    <td className="log-ip">{log.ipAddress || '-'}</td>
                    <td className="log-status">
                      <span 
                        className={`status-badge status-${log.status}`}
                        style={{ backgroundColor: statusColors[log.status] }}
                      >
                        {log.status === 'success' ? '✅' : log.status === 'failed' ? '❌' : '⚠️'}
                        {' '}{log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="logs-pagination">
            <p>
              Hiển thị {filters.skip + 1} - {Math.min(filters.skip + logs.length, pagination.total)} / {pagination.total} logs
            </p>
            {pagination.hasMore && (
              <button onClick={handleLoadMore} disabled={loading}>
                {loading ? '⏳ Đang tải...' : '⬇️ Tải thêm'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ActivityLogs;
