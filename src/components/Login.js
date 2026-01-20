import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (username === 'Sheriff' && password === 'Sheriff123') {
      // Store authentication in localStorage
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('არასწორი მომხმარებელი ან პაროლი');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">ადმინ პანელი</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">მომხმარებელი</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="შეიყვანეთ მომხმარებელი"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">პაროლი</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="შეიყვანეთ პაროლი"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            შესვლა
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;