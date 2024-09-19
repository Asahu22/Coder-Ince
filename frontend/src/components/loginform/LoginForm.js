import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css'
import { useNavigate, useLocation, Link} from 'react-router-dom';
import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';

const LoginForm = () => {

  usePageTitle("Login - Coders Inc.")

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)
  const navigate = useNavigate()
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    setErrorMessage(null)
      const response = await axios.post(`${SERVER_BASE_URL}/login`, { email, password });
      
      const authHeader = response.headers['authorization'];
        if(authHeader === undefined)  {
            setErrorMessage(response.data.message)
            return;
        }
      const token = authHeader ? authHeader.split(' ')[1] : null;
      if(token !== undefined) {
        localStorage.setItem('token', token);
      }
      navigate(from, {replace: true});
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    <h1>Login</h1>
    <h3>Login and start coding!</h3>
    <form className='login-form' onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      <button className='login-button' type="submit">Login</button>
      {errorMessage !== null ? (<p>{errorMessage}</p>):(<></>)}
      <p><Link to={'/register'}> Don't have an account? Click here to register!</Link></p>
    </form>
    </>
  );
};

export default LoginForm;
