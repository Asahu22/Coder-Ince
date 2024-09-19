import { useEffect, useState } from 'react';
import './Home.css'
import axios from 'axios'
import HomeButton from './HomeButton/HomeButton';
import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';

const Home = () => {

  usePageTitle("Coders Inc.")

    const [username, setUsername] = useState('')

    useEffect(() => {
        const fetchUsername = async () => {
            try {
              const token = localStorage.getItem('token')
              const config = {
                  headers: {
                    'Authorization': `Bearer ${token}`,
                  },
                };
              const response = await axios.get(`${SERVER_BASE_URL}/`, config);
              setUsername(response.data.username); 
            } catch (error) {
              console.error('Error fetching user data:', error); 
            }
          };
      
          fetchUsername();
        }, []);

    return (
        <>
        <h1>Welcome back, {username}</h1>
        <div className='home-buttons'>
          <HomeButton label={"PROBLEMS"} goTo={'problems'}/>
          <HomeButton label={"LEADERBOARD"} goTo={'leaderboard'}/>
          <HomeButton label={"PROFILE"} goTo={`users/${username}`}/>
        </div>
        </>
    )
}

export default Home;
