import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import './RegisterForm.css'
import axios from 'axios';

import { USERNAME_REGEX, PWD_REGEX, SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';


const RegisterForm = () => {

  usePageTitle("Register - Coders Inc.")

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cnfpassword, setCnfPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if(password !== cnfpassword) {
        setErrorMessage("Passwords do not match!")
        return;
      }

      const _USERNAME_REGEX = new RegExp(USERNAME_REGEX);
      const _PWD_REGEX = new RegExp(PWD_REGEX)

      if(!_USERNAME_REGEX.test(username)) {
        setErrorMessage("Invalid username. Should consist of atleast 4 characters and at most 20 characters. No special characters except underscores and hyphens allowed.")
        return;
      }

      if(!_PWD_REGEX.test(password)) {
        setErrorMessage("Invalid password. Should consist of at least 8 characters, 1 uppercase character, 1 lowercase character, 1 number and 1 symbol.")
        return;
      }

      const response = await axios.post(`${SERVER_BASE_URL}/register`, {username, email, password });
      if(response.data.status === 'fail') {
        setErrorMessage(response.data.message);
        return;
      }
      navigate('/login');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
    <h1>Register</h1>
    <h3>Make an account and start coding!</h3>
    <form className='register-form' onSubmit={handleSubmit}>
    <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <label htmlFor="password2">Confirm Password:</label>
        <input
          type="password"
          id="password2"
          value={cnfpassword}
          onChange={(e) => setCnfPassword(e.target.value)}
        />
      <button className='register-button' type="submit">Register</button>
      {errorMessage !== null ? (<p>{errorMessage}</p>):(<></>)}
      <p><Link to={'/login'}>Already have an account? Click here to login!</Link></p>
    </form>
    </>
  );
};

export default RegisterForm;
