import React, { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import authService from '../services/auth';

// Create context
const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      if (authService.isAuthenticated()) {
        try {
          const result = await authService.getProfile();
          if (result.success) {
            setUser(result.user);
            setIsAuthenticated(true);
          } else {
            // Token is invalid, clear it
            authService.logout();
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Authentication error:', error);
          authService.logout();
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    checkLoggedIn();
  }, []);

  // Login
  const login = async (email, password) => {
    const result = await authService.login(email, password);
    if (result.success) {
      const profileResult = await authService.getProfile();
      if (profileResult.success) {
        setUser(profileResult.user);
        setIsAuthenticated(true);
      }
    }
    return result;
  };

  // Signup
  const signup = async (userData) => {
    return await authService.signup(userData);
  };

  // Logout
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;