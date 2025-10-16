import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';

const OnlineUsersIndicator = () => {
  const { onlineUsersCount, isConnected } = useSocket();
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      style={{ 
        position: 'relative', 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '8px',
        padding: '8px 12px',
        background: isConnected ? '#e8f5e9' : '#ffebee',
        borderRadius: '20px',
        border: `2px solid ${isConnected ? '#4CAF50' : '#f44336'}`,
        fontSize: '14px',
        fontWeight: 'bold',
        color: isConnected ? '#2e7d32' : '#c62828',
        cursor: 'pointer',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Status Indicator */}
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: isConnected ? '#4CAF50' : '#f44336',
          animation: isConnected ? 'pulse 2s infinite' : 'none'
        }}
      />
      
      {/* Online Count */}
      <span>
        {isConnected ? `${onlineUsersCount} Online` : 'Offline'}
      </span>

      {/* Tooltip */}
      {showTooltip && (
        <div
          style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '8px 12px',
            background: '#333',
            color: 'white',
            borderRadius: '6px',
            fontSize: '12px',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}
        >
          {isConnected 
            ? `Có ${onlineUsersCount} người dùng đang trực tuyến`
            : 'Mất kết nối real-time'
          }
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 0,
              height: 0,
              borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent',
              borderTop: '5px solid #333'
            }}
          />
        </div>
      )}

      {/* CSS Animation */}
      <style>
        {`
          @keyframes pulse {
            0% {
              box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.7);
            }
            70% {
              box-shadow: 0 0 0 10px rgba(76, 175, 80, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(76, 175, 80, 0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default OnlineUsersIndicator;