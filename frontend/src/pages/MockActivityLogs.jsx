import React, { useState } from 'react';
import './ActivityLogs.css';

const MockActivityLogs = () => {
  // Dữ liệu logs giả để demo
  const mockLogs = [
    {
      _id: '673c9b26ce25cfa4e7ae6f8a',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8a',
        name: 'Admin User',
        email: 'admin@example.com'
      },
      action: 'login',
      details: 'User logged in successfully',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0',
      timestamp: '2025-10-26T10:30:45.123Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f8b',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8b',
        name: 'John Doe',
        email: 'john@example.com'
      },
      action: 'create_user',
      details: 'Created new user: Jane Smith',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/119.0.0.0',
      timestamp: '2025-10-26T10:25:30.456Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f8c',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8c',
        name: 'Moderator',
        email: 'mod@example.com'
      },
      action: 'update_user',
      details: 'Updated user profile: john@example.com',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
      timestamp: '2025-10-26T10:20:15.789Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f8d',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8a',
        name: 'Admin User',
        email: 'admin@example.com'
      },
      action: 'delete_user',
      details: 'Deleted user: inactive@example.com',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0',
      timestamp: '2025-10-26T10:15:00.234Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f8e',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8e',
        name: 'Hacker User',
        email: 'hacker@spam.com'
      },
      action: 'login',
      details: 'Failed login attempt - Invalid credentials',
      ipAddress: '203.45.67.89',
      userAgent: 'curl/7.68.0',
      timestamp: '2025-10-26T10:10:45.567Z',
      status: 'failed'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f8f',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8b',
        name: 'John Doe',
        email: 'john@example.com'
      },
      action: 'logout',
      details: 'User logged out successfully',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/119.0.0.0',
      timestamp: '2025-10-26T10:05:30.890Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f90',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8a',
        name: 'Admin User',
        email: 'admin@example.com'
      },
      action: 'update_settings',
      details: 'Changed system configuration',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0',
      timestamp: '2025-10-26T09:55:15.123Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f91',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8c',
        name: 'Moderator',
        email: 'mod@example.com'
      },
      action: 'login',
      details: 'User logged in successfully',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
      timestamp: '2025-10-26T09:50:00.456Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f92',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8e',
        name: 'Suspicious User',
        email: 'suspicious@fake.com'
      },
      action: 'access_denied',
      details: 'Attempted to access admin panel without permission',
      ipAddress: '45.67.89.123',
      userAgent: 'Python-urllib/3.8',
      timestamp: '2025-10-26T09:45:30.789Z',
      status: 'failed'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f93',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8b',
        name: 'John Doe',
        email: 'john@example.com'
      },
      action: 'create_post',
      details: 'Created new post: "Welcome to our platform"',
      ipAddress: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/119.0.0.0',
      timestamp: '2025-10-26T09:40:15.234Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f94',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8a',
        name: 'Admin User',
        email: 'admin@example.com'
      },
      action: 'login',
      details: 'User logged in successfully',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/119.0.0.0',
      timestamp: '2025-10-26T09:30:00.567Z',
      status: 'success'
    },
    {
      _id: '673c9b26ce25cfa4e7ae6f95',
      userId: {
        _id: '673c9b26ce25cfa4e7ae6f8c',
        name: 'Moderator',
        email: 'mod@example.com'
      },
      action: 'approve_content',
      details: 'Approved user submission: ID 12345',
      ipAddress: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/605.1.15',
      timestamp: '2025-10-26T09:20:45.890Z',
      status: 'success'
    }
  ];

  const [logs] = useState(mockLogs);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Get status badge color
  const getStatusBadge = (status) => {
    if (status === 'success') {
      return <span className="badge badge-success">Success</span>;
    } else if (status === 'failed') {
      return <span className="badge badge-danger">Failed</span>;
    }
    return <span className="badge badge-secondary">{status}</span>;
  };

  // Get action badge
  const getActionBadge = (action) => {
    const colors = {
      login: 'badge-primary',
      logout: 'badge-secondary',
      create_user: 'badge-success',
      update_user: 'badge-info',
      delete_user: 'badge-danger',
      access_denied: 'badge-warning',
      create_post: 'badge-success',
      approve_content: 'badge-info',
      update_settings: 'badge-warning'
    };

    return (
      <span className={`badge ${colors[action] || 'badge-secondary'}`}>
        {action.replace('_', ' ').toUpperCase()}
      </span>
    );
  };

  // Filter logs
  const filteredLogs = logs.filter((log) => {
    const matchFilter = filter === 'all' || log.status === filter;
    const matchSearch =
      searchTerm === '' ||
      log.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userId.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.details.toLowerCase().includes(searchTerm.toLowerCase());

    return matchFilter && matchSearch;
  });

  // Stats
  const stats = {
    total: logs.length,
    success: logs.filter((l) => l.status === 'success').length,
    failed: logs.filter((l) => l.status === 'failed').length,
    today: logs.length
  };

  return (
    <div className="activity-logs-container">
      {/* Demo Banner */}
      <div className="demo-banner">
        <strong>🎬 DEMO MODE</strong> - This is a mock page with sample data for screenshots
      </div>

      <h1 className="page-title">📊 Activity Logs - System Monitoring</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Logs</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>
        <div className="stat-card success">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>Success</h3>
            <p className="stat-number">{stats.success}</p>
          </div>
        </div>
        <div className="stat-card danger">
          <div className="stat-icon">❌</div>
          <div className="stat-content">
            <h3>Failed</h3>
            <p className="stat-number">{stats.failed}</p>
          </div>
        </div>
        <div className="stat-card info">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Today</h3>
            <p className="stat-number">{stats.today}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="search">🔍 Search:</label>
          <input
            id="search"
            type="text"
            className="search-input"
            placeholder="Search by user, action, or details..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="status-filter">Filter Status:</label>
          <select
            id="status-filter"
            className="filter-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="success">Success Only</option>
            <option value="failed">Failed Only</option>
          </select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>IP Address</th>
              <th>Timestamp</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-data">
                  No logs found
                </td>
              </tr>
            ) : (
              filteredLogs.map((log) => (
                <tr key={log._id} className={log.status === 'failed' ? 'failed-row' : ''}>
                  <td>
                    <div className="user-info">
                      <div className="user-avatar">
                        {log.userId.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="user-name">{log.userId.name}</div>
                        <div className="user-email">{log.userId.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{getActionBadge(log.action)}</td>
                  <td className="details-cell">{log.details}</td>
                  <td className="ip-cell">{log.ipAddress}</td>
                  <td className="timestamp-cell">{formatDate(log.timestamp)}</td>
                  <td>{getStatusBadge(log.status)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Info */}
      <div className="logs-footer">
        <p>
          Showing <strong>{filteredLogs.length}</strong> of <strong>{logs.length}</strong> logs
        </p>
        <p className="footer-note">
          💡 Logs are automatically deleted after 90 days (TTL Index)
        </p>
      </div>
    </div>
  );
};

export default MockActivityLogs;
