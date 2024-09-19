import './ProblemList.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Button from './Button/Button';

import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';
import Preloader from '../preloader/Preloader';

const ProblemList = ({isAdmin}) => {

    usePageTitle("Problems - Coders Inc.")

    const [problemList, setProblemList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

  useEffect(() => {

    const fetchProblemList = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };
        const response = await axios.get(`${SERVER_BASE_URL}/problems`, config);
        setProblemList(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching problem data:', error);
        setLoading(false); 
        navigate('/*')
      }
    };

    fetchProblemList();
  }, [navigate]);

    return (
        <>
    <h1 style={{fontFamily: 'Titillium Web'}}>Problems</h1>
    <div>
      {loading ? (
        <Preloader/>
      ) : ( 
        <table className='custom-table'>
          <thead>
            <tr>
              <th>Problem Name</th>
              <th>Difficulty</th>
              <th>Tags</th>
              <th>Number of Solves</th>
            </tr>
          </thead>
          <tbody>
            {problemList.map((item) => (
              <tr key={item._id}>
                <td className='column1'><Link to={`/problems/${item._id}`}>{item.name}</Link></td>
                <td>{item.difficulty}</td>
                <td>{item.tags.join(', ')}</td>
                <td className='column2'><Link to={`/problems/${item._id}/submissions`}>x{item.numberOfSolves}</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isAdmin ? <div className='btn-container'>
        <Button label={"ADD PROBLEM"} goTo={'problems/add'}/>
      </div> : <></>}
    </div>
    </>
    )
}

export default ProblemList;