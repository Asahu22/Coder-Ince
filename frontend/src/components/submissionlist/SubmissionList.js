import './SubmissionList.css'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';
import Preloader from '../preloader/Preloader';

const SubmissionList = () => {

  usePageTitle("Submissions - Coders Inc.");

    const [submissionList, setSubmissionList] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

  useEffect(() => {

    const fetchSubmissionList = async () => {
      try {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };
        setLoading(true); 
        const response = await axios.get(`${SERVER_BASE_URL}/problems/submissions`, config);
        setSubmissionList(response.data); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching submission data:', error);
        setLoading(false); 
      }
    };
    const fetchSubmissionListByID = async (id) => {
        try {
          const token = localStorage.getItem('token')
          const config = {
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            };
            setLoading(true); 
          const response = await axios.get(`${SERVER_BASE_URL}/problems/${id}/submissions`, config);
          setSubmissionList(response.data); 
          setLoading(false); 
        } catch (error) {
          console.error('Error fetching submission data:', error);
          setLoading(false); 
        }
      };
    if(id !== undefined) fetchSubmissionListByID(id)
    else fetchSubmissionList();
  }, [id]);
    return (
        <>
        <h1 style={{fontFamily: 'Titillium Web'}}>Submissions</h1>
    <div>
      {loading ? (
        <Preloader/>
      ) : (
        submissionList && submissionList.length > 0  ?
        <table className='custom-table2'>
          <thead>
            <tr>
              <th className='submission-id'>Submission ID</th>
              <th className='username'>Username</th>
              <th className='problem-name'>Problem Name</th>
              <th className='verdict'>Verdict</th>
              <th className='language'>Language</th>
              <th className='submission-time'>Submission Time</th>
            </tr>
          </thead>
          <tbody>
            {submissionList.map((item) => (
              <tr key={item._id}>
                <td className='submission-id'><Link to={`/problems/submissions/${item._id}`}>{item._id}</Link></td>
                <td className='username'><Link to={`/users/${item.submitterUserName}`}>{item.submitterUserName}</Link></td>
                <td className='problem-name'><Link to={`/problems/${item.problemID}`}>{item.problemName}</Link></td>
                <td
              className='verdict'
              style={{color: item.verdict === 'Accepted' ? 'green' : 'inherit',
                        fontWeight: item.verdict === 'Accepted' ? 'bold' : 'inherit' }}
            >
              {item.verdict}
            </td>
                <td className='language'>{item.language === 'cpp' ? 'C++' : item.language ==='python' ? 'Python' : 'Java'}</td>
                <td className='submission-time'>{item.submissionTime.substring(0, 19)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      : <h2>No submissions found!</h2>)}
    </div>
        </>
    )
}

export default SubmissionList;