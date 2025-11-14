import { useState } from 'react';

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    // Dummy login - just set authenticated flag
    localStorage.setItem('isAuthenticated', 'true');
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
  };
};
