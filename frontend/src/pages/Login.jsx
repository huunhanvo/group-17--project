import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser, selectIsLoading, selectAuthError } from '../store/slices/authSlice';
import { toast } from 'react-toastify';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('🔐 Attempting login...', { email: formData.email });
    
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      
      console.log('✅ Login successful:', result);
      toast.success(`Chào mừng ${result.user.name}! 🎉`);
      
      // Redirect based on role
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (err) {
      console.error('❌ Login failed:', err);
      toast.error(err || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <h1>🔐 Đăng nhập</h1>
          <p className="subtitle">Chào mừng trở lại!</p>

          {error && (
            <div className="error-banner">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">📧 Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">🔒 Mật khẩu</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>

            <button 
              type="submit" 
              className="btn-primary"
              disabled={isLoading}
            >
              {isLoading ? '⏳ Đang đăng nhập...' : '✅ Đăng nhập'}
            </button>
          </form>

          <div className="links">
            <Link to="/forgot-password">🔑 Quên mật khẩu?</Link>
            <span className="divider">|</span>
            <Link to="/signup">✍️ Đăng ký tài khoản mới</Link>
          </div>

          <div className="demo-accounts">
            <p><strong>🎭 Demo Accounts:</strong></p>
            <ul>
              <li>👑 Admin: admin@example.com / admin123</li>
              <li>👤 User: user@example.com / user123</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
