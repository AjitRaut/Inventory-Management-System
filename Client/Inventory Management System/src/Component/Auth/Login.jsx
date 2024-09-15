import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { login } from '../../utils/api';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await login(email, password);
      localStorage.setItem('token', token);
      history.push('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </div>
  );
};

export default Login;
