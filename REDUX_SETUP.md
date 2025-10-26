# 🎯 Redux Toolkit & Protected Routes - Setup Complete

## ✅ Đã hoàn thành

### 1. **Redux Toolkit Installation**
```bash
npm install @reduxjs/toolkit react-redux
npm install react-router-dom
```

### 2. **Redux Store Structure**

```
frontend/src/
├── store/
│   ├── index.js              # Redux store configuration
│   └── slices/
│       └── authSlice.js      # Auth state management
├── hooks/
│   └── useAuth.js            # Custom hook for auth
├── pages/
│   ├── Login.jsx             # Login page with Redux
│   ├── Login.css
│   ├── Profile.jsx           # Protected profile page
│   └── Profile.css
└── components/
    └── ProtectedRoute.jsx    # Route protection component
```

### 3. **Redux Features Implemented**

#### Auth Slice (`authSlice.js`)
- ✅ **State Management**:
  - `user` - Current user object
  - `accessToken` - JWT access token
  - `refreshToken` - JWT refresh token
  - `isAuthenticated` - Authentication status
  - `isLoading` - Loading state
  - `error` - Error messages

- ✅ **Async Thunks** (API calls):
  - `loginUser` - Login with email/password
  - `signupUser` - Register new account
  - `logoutUser` - Logout and clear tokens
  - `refreshAccessToken` - Refresh expired token
  - `fetchCurrentUser` - Get current user info

- ✅ **Actions**:
  - `setCredentials` - Manually set user/tokens
  - `updateAccessToken` - Update access token
  - `updateUser` - Update user info
  - `clearError` - Clear error message
  - `resetAuth` - Reset all auth state

- ✅ **Selectors**:
  - `selectCurrentUser`
  - `selectIsAuthenticated`
  - `selectIsLoading`
  - `selectAuthError`
  - `selectUserRole`
  - `selectIsAdmin`
  - `selectIsModerator`

### 4. **Protected Routes**

#### ProtectedRoute Component
```jsx
<ProtectedRoute allowedRoles={['admin']}>
  <AdminPanel />
</ProtectedRoute>
```

**Features:**
- ✅ Kiểm tra authentication
- ✅ Kiểm tra roles (RBAC)
- ✅ Auto redirect to /login
- ✅ Error messages for unauthorized access

### 5. **React Router Setup**

#### App_Redux.js (New Router-based App)
```jsx
<Routes>
  {/* Public */}
  <Route path="/login" element={<Login />} />
  
  {/* Protected */}
  <Route path="/profile" element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } />
  
  {/* Admin Only */}
  <Route path="/admin" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminPanel />
    </ProtectedRoute>
  } />
</Routes>
```

### 6. **Custom Hook - useAuth**

Simplifies Redux usage:

```jsx
import { useAuth } from './hooks/useAuth';

function MyComponent() {
  const { 
    user, 
    isAuthenticated, 
    isAdmin, 
    login, 
    logout 
  } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email, password });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome {user.name}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### 7. **Migration from localStorage to Redux**

**Before (Old way):**
```jsx
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
```

**After (Redux way):**
```jsx
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectAccessToken } from './store/slices/authSlice';

const user = useSelector(selectCurrentUser);
const token = useSelector(selectAccessToken);
```

### 8. **Redux DevTools**

Redux DevTools enabled automatically in development:
- Open browser DevTools
- Go to "Redux" tab
- View state changes, actions, time-travel debugging

## 🚀 How to Use

### 1. Start Backend
```bash
cd backend
npm start
```

### 2. Start Frontend (with Redux)
```bash
cd frontend
npm start
```

### 3. Test Redux Flow

1. **Login**: Go to http://localhost:3001/login
   - Login with: `admin@example.com` / `admin123`
   - Redux dispatch: `loginUser` thunk
   - State updated: `user`, `accessToken`, `isAuthenticated`

2. **Profile**: Auto redirect to `/profile`
   - Protected route checks: `isAuthenticated === true`
   - Display user info from Redux state

3. **Admin Panel**: Click "Admin Panel" button
   - Protected route checks: `role === 'admin'`
   - Only admin users can access

4. **Logout**: Click "Đăng xuất"
   - Redux dispatch: `logoutUser` thunk
   - State cleared, localStorage cleared
   - Redirect to `/login`

## 🎨 Features Comparison

| Feature | Old App.js | New App_Redux.js |
|---------|-----------|------------------|
| State Management | useState + localStorage | Redux Toolkit |
| Authentication | Manual token check | Redux selectors |
| Route Protection | Manual if/else | ProtectedRoute component |
| Token Refresh | Manual | Auto with interceptor |
| RBAC | Basic | Full RBAC with selectors |
| DevTools | None | Redux DevTools |
| Type Safety | None | TypeScript-ready |

## 🔧 Next Steps

### Option 1: Keep Old App.js (Backward Compatible)
- Rename current `App.js` → `App_Old.js`
- Rename `App_Redux.js` → `App.js`
- Update imports in `index.js` if needed

### Option 2: Gradually Migrate
- Keep both files
- Migrate components one by one
- Use Redux in new components
- Old components use localStorage

### Option 3: Full Migration (Recommended)
- Replace `App.js` with `App_Redux.js`
- Update all components to use Redux hooks
- Remove localStorage code
- Test all flows

## 📝 Testing Checklist

- [ ] Login with admin account
- [ ] Login with user account
- [ ] Access /profile (should work)
- [ ] Access /admin as user (should block)
- [ ] Access /admin as admin (should work)
- [ ] Logout
- [ ] Try to access /profile without login (should redirect to /login)
- [ ] Refresh page while logged in (should stay logged in)
- [ ] Token expires (should auto refresh or logout)

## 🐛 Troubleshooting

### Redux state not persisting after refresh?
- Check: `localStorage.getItem('accessToken')` in console
- Redux rehydrates from localStorage in `initialState`

### Protected routes not working?
- Check: Redux DevTools → auth slice → `isAuthenticated`
- Check: Browser console for ProtectedRoute logs

### Role-based access not working?
- Check: Redux DevTools → auth slice → `user.role`
- Check: ProtectedRoute `allowedRoles` prop

## 📚 Documentation

- Redux Toolkit: https://redux-toolkit.js.org/
- React Redux: https://react-redux.js.org/
- React Router: https://reactrouter.com/

---

**Author**: Group 17  
**Date**: 2025-01-26  
**Status**: ✅ Complete
