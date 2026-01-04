import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('recipeAppUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('recipeAppUser');
      }
    }
    setIsLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('recipeAppUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('recipeAppUser');
    }
  }, [user]);

  const login = (email, password) => {
    // Basic validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Password validation (min 6 characters)
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    // Check if user exists in localStorage
    const savedUsers = JSON.parse(localStorage.getItem('recipeAppUsers') || '[]');
    const existingUser = savedUsers.find(u => u.email === email && u.password === password);

    if (existingUser) {
      const userData = {
        email: existingUser.email,
        name: existingUser.name,
        id: existingUser.id
      };
      setUser(userData);
      return { success: true, user: userData };
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const signUp = (name, email, password, confirmPassword) => {
    // Validation
    if (!name || !email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }

    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Please enter a valid email address');
    }

    // Password validation (min 6 characters)
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    // Check if user already exists
    const savedUsers = JSON.parse(localStorage.getItem('recipeAppUsers') || '[]');
    if (savedUsers.some(u => u.email === email)) {
      throw new Error('An account with this email already exists');
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In production, NEVER store plain passwords!
      createdAt: new Date().toISOString()
    };

    savedUsers.push(newUser);
    localStorage.setItem('recipeAppUsers', JSON.stringify(savedUsers));

    const userData = {
      email: newUser.email,
      name: newUser.name,
      id: newUser.id
    };
    setUser(userData);
    return { success: true, user: userData };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('recipeAppUser');
  };

  const value = {
    user,
    isLoading,
    login,
    signUp,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
