import './UserProfile.css'
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import ProblemsSolvedTable from './problemssolvedtable/ProblemsSolvedTable';
import SolveCounter from './solvecounter/SolveCounter';
import SubmissionCounter from './submissioncounter/SubmissionCounter';

import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';
import Preloader from '../preloader/Preloader';

const UserProfile = () => {

    const { username } = useParams();

    usePageTitle(`${username} - Coders Inc.`)

    const [userDetails, setuserDetails] = useState({
        username: '',
        numberOfSolves: '',
        numberOfSubmissions: '',
        problemsSolved: []
    })

    const [loadingUserData, setLoadingUserData] = useState(false);
    
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${SERVER_BASE_URL}/users/${username}`, config);
                if(!response.data) {
                    navigate('/*')
                }
                setuserDetails(response.data)
            }
            catch (error) {
                navigate('/*')
            }
        }
        setLoadingUserData(true);
        fetchUserDetails();
        setLoadingUserData(false);
    }, [username, navigate])


    return (
        <>
            {
                loadingUserData ?
                <Preloader/> :
                <>
                    <h2 className='user-header'>{userDetails.username}</h2>
                    <div className='counter-container'>
                        
                        <SubmissionCounter numberOfSubmissions={userDetails.numberOfSubmissions}/>
                        <SolveCounter numberOfSolves={userDetails.numberOfSolves}/>
                    </div>
                    <br/>
                    <ProblemsSolvedTable problemsSolved={userDetails.problemsSolved}/>
                </>
            }
        </>
    )
}

export default UserProfile;