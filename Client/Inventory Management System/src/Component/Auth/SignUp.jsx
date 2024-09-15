import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { register } from '../../utils/api';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      history.push('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div>
      <Typography variant="h4">Sign Up</Typography>
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
        <Button type="submit" variant="contained">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUp;
