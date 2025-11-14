import { useState } from 'react';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Dummy login - just set authenticated flag
    localStorage.setItem('isAuthenticated', 'true');
  };

  const fillDemoCredentials = () => {
    setEmail('demo@example.com');
    setPassword('demo123');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    fillDemoCredentials,
  };
};
