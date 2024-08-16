import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';
import apiClient from '../../utils/apiClient';
import { userStore } from '../../store/userStore';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const setUser = userStore((state) => state.setUser);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiClient.post('/auth/login', credentials);
      setUser(response.data);
      navigate('/');
    } catch (error) {
      setError(error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError(null);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h1>Sign in</h1>

        <label htmlFor="username">Username</label>
        <input
          value={credentials.username}
          type="text"
          name="username"
          placeholder="johndoe"
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          value={credentials.password}
          type="password"
          name="password"
          placeholder="*********"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
        {error && <span>{error.message}</span>}
      </form>
    </div>
  );
};

export default Login;
