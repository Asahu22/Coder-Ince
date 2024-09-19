import './App.css';
import Home from './components/home/Home'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import ProblemList from './components/problemlist/ProblemList';
import LeaderBoard from './components/leaderboard/LeaderBoard';
import UserProfile from './components/userprofile/UserProfile';
import NotFound from './components/notfound/NotFound';
import Problem from './components/problem/Problem';
import SubmissionList from './components/submissionlist/SubmissionList';
import Submission from './components/submission/Submission';
import LoginForm from './components/loginform/LoginForm';
import RegisterForm from './components/registerform/RegisterForm';
import Navbar from './components/navbar/Navbar';
import AddProblem from './components/addproblem/AddProblem';
import EditProblem from './components/editproblem/EditProblem';
import AddTestCase from './components/addtc/AddTestCase';

import { SERVER_BASE_URL } from './config';

function App() {

  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [isAdmin, setAdmin] = useState(false)

  const ProtectedRoute = ({ children }) => {
    const [isTokenValid, setIsTokenValid] = useState(null);
    const location = useLocation()

    const validateToken = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${SERVER_BASE_URL}/validate`, config);
        return response.data;
      } 
      catch (error) {
        return false;
      }
    };

    useEffect(() => {
      const checkTokenValidity = async () => {
        const credentials = await validateToken();
        setIsTokenValid(credentials.valid);
        setisAuthenticated(credentials.valid);
        setAdmin(credentials.role && credentials.role === 'admin' ? true : false);
      };

      checkTokenValidity();
    }, []);

    if (isTokenValid == null) {
      return null;
    }

    if (isTokenValid) {
      return children;
    } 
    else {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  };

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setisAuthenticated} />
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/register' element={<RegisterForm />} />
        <Route path={'/logout'} />

        <Route path='/' element={
          <ProtectedRoute> <Home /> </ProtectedRoute>
        } />

        <Route path='/problems'>

          <Route index element={<ProtectedRoute> <ProblemList isAdmin={isAdmin} /> </ProtectedRoute>} />
          <Route path='add' element={<ProtectedRoute> <AddProblem isAdmin={isAdmin} />  </ProtectedRoute>} />

          <Route path=':id'>
            <Route index element={<ProtectedRoute> <Problem isAdmin={isAdmin} /> </ProtectedRoute>} />
            <Route path='addtc' element={<ProtectedRoute> <AddTestCase isAdmin={isAdmin} /> </ProtectedRoute>} />
            <Route path='edit' element={<ProtectedRoute> <EditProblem isAdmin={isAdmin} /> </ProtectedRoute>} />
            <Route path='submissions' element={<ProtectedRoute> <SubmissionList /> </ProtectedRoute>} />
          </Route>

          <Route path='submissions'>
            <Route index element={<ProtectedRoute> <SubmissionList /> </ProtectedRoute>} />
            <Route path=':id' element={<ProtectedRoute> <Submission /> </ProtectedRoute>}></Route>
          </Route>

        </Route>

        <Route path='/leaderboard'
          element={
            <ProtectedRoute> <LeaderBoard /> </ProtectedRoute>
          } />

        <Route path='/users'>
          <Route path=':username' element={<ProtectedRoute> <UserProfile /> </ProtectedRoute>} />
        </Route>

        <Route path='*' element={<ProtectedRoute><NotFound /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
