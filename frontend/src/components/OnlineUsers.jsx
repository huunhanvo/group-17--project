import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';

const OnlineUsers = () => {
  const { 
    onlineUsers, 
    onlineUsersCount, 
    isConnected,
    sendPrivateMessage 
  } = useSocket();
  
  const [isOpen, setIsOpen] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

  const handleSendMessage = () => {
    if (selectedUser && messageText.trim()) {
      sendPrivateMessage(selectedUser.userId, messageText);
      setMessageText('');
      setSelectedUser(null);
      alert(`Đã gửi tin nhắn đến ${selectedUser.userName}`);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {/* Online Users Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          backgroundColor: isConnected ? '#4CAF50' : '#666',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          padding: '10px 15px',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = isConnected ? '#45a049' : '#555'}
        onMouseOut={(e) => e.target.style.backgroundColor = isConnected ? '#4CAF50' : '#666'}
      >
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: isConnected ? '#fff' : '#f44336',
          display: 'inline-block'
        }} />
        👥 Online ({onlineUsersCount})
      </button>

      {/* Online Users Dropdown */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '50px',
          right: '0',
          width: '320px',
          maxHeight: '400px',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '10px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: isConnected ? '#4CAF50' : '#666',
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h3 style={{ margin: 0, fontSize: '16px' }}>
              👥 Người dùng online ({onlineUsersCount})
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                backgroundColor: 'transparent',
                color: 'white',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                padding: '0 5px'
              }}
            >
              ✕
            </button>
          </div>

          {/* Connection Status */}
          <div style={{
            padding: '10px 20px',
            backgroundColor: isConnected ? '#e8f5e9' : '#ffebee',
            borderBottom: '1px solid #f0f0f0',
            fontSize: '14px',
            color: isConnected ? '#2e7d32' : '#c62828'
          }}>
            <span style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: isConnected ? '#4CAF50' : '#f44336',
              display: 'inline-block',
              marginRight: '8px'
            }} />
            {isConnected ? '🟢 Kết nối real-time hoạt động' : '🔴 Mất kết nối real-time'}
          </div>

          {/* Users List */}
          <div style={{
            maxHeight: '300px',
            overflowY: 'auto',
            padding: onlineUsers.length === 0 ? '20px' : '0'
          }}>
            {onlineUsers.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: '#666',
                fontSize: '14px'
              }}>
                {isConnected ? '👤 Chỉ có bạn online' : '❌ Không có dữ liệu'}
              </div>
            ) : (
              onlineUsers.map((user, index) => (
                <div
                  key={user.userId || index}
                  style={{
                    padding: '12px 20px',
                    borderBottom: index < onlineUsers.length - 1 ? '1px solid #f0f0f0' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '35px',
                      height: '35px',
                      borderRadius: '50%',
                      backgroundColor: '#2196F3',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 'bold'
                    }}>
                      {user.userName ? user.userName.charAt(0).toUpperCase() : '?'}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#333'
                      }}>
                        {user.userName || 'Unknown User'}
                        {user.userId === currentUser._id && (
                          <span style={{
                            fontSize: '12px',
                            color: '#4CAF50',
                            marginLeft: '5px'
                          }}>
                            (bạn)
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '12px',
                        color: '#666'
                      }}>
                        {user.userEmail || 'No email'}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    {/* Online status indicator */}
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#4CAF50'
                    }} />
                    
                    {/* Send message button (if not current user) */}
                    {user.userId !== currentUser._id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                        }}
                        style={{
                          backgroundColor: 'transparent',
                          border: '1px solid #2196F3',
                          color: '#2196F3',
                          borderRadius: '4px',
                          padding: '4px 8px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                        title="Gửi tin nhắn"
                      >
                        💬
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Send Message Modal */}
          {selectedUser && (
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              right: '0',
              bottom: '0',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1001
            }}>
              <div style={{
                backgroundColor: 'white',
                borderRadius: '10px',
                padding: '20px',
                width: '280px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '16px' }}>
                  💬 Gửi tin nhắn cho {selectedUser.userName}
                </h4>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  style={{
                    width: '100%',
                    height: '80px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    padding: '10px',
                    fontSize: '14px',
                    resize: 'none',
                    marginBottom: '15px'
                  }}
                />
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => {
                      setSelectedUser(null);
                      setMessageText('');
                    }}
                    style={{
                      backgroundColor: '#f5f5f5',
                      border: '1px solid #ddd',
                      color: '#666',
                      borderRadius: '5px',
                      padding: '8px 15px',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Hủy
                  </button>
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageText.trim()}
                    style={{
                      backgroundColor: messageText.trim() ? '#2196F3' : '#ccc',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      padding: '8px 15px',
                      fontSize: '14px',
                      cursor: messageText.trim() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Gửi
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OnlineUsers;