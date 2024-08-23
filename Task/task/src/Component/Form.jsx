import React, { useState } from 'react';
import axios from 'axios';
import './Form.css';

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    const url = isLogin ? 'http://localhost:5000/api/users/login' : 'http://localhost:5000/api/users/signup';

    try {
      const response = await axios.post(url, { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      alert('Success!');
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>{isLogin ? 'Password' : 'Create password'}</label>
            <input
              type="password"
              placeholder={isLogin ? 'Password' : 'Create password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="input-group">
              <label>Confirm password</label>
              <input
                type="password"
                placeholder="Confirm password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}
          {isLogin && <a href="/" className="forgot-password">Forgot password?</a>}
          <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Signup'}</button>
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <span onClick={toggleForm} className="toggle-link">{isLogin ? 'Signup' : 'Login'}</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Form;
