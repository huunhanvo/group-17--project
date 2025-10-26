import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import {
  loginUser,
  signupUser,
  logoutUser,
  selectCurrentUser,
  selectIsAuthenticated,
  selectIsLoading,
  selectAuthError,
  selectUserRole,
  selectIsAdmin,
  selectIsModerator,
  selectAccessToken,
  clearError
} from '../store/slices/authSlice';

/**
 * Custom hook để dễ dàng truy cập auth state và actions
 * @returns {object} Auth state và functions
 */
export const useAuth = () => {
  const dispatch = useDispatch();

  // Selectors
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectAuthError);
  const userRole = useSelector(selectUserRole);
  const isAdmin = useSelector(selectIsAdmin);
  const isModerator = useSelector(selectIsModerator);
  const accessToken = useSelector(selectAccessToken);

  // Actions wrapped in dispatch
  const actions = useMemo(
    () => ({
      login: async (credentials) => {
        return dispatch(loginUser(credentials)).unwrap();
      },
      signup: async (userData) => {
        return dispatch(signupUser(userData)).unwrap();
      },
      logout: async () => {
        return dispatch(logoutUser()).unwrap();
      },
      clearError: () => {
        dispatch(clearError());
      }
    }),
    [dispatch]
  );

  return {
    // State
    user,
    isAuthenticated,
    isLoading,
    error,
    userRole,
    isAdmin,
    isModerator,
    accessToken,
    
    // Actions
    ...actions
  };
};

export default useAuth;
