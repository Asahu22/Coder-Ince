import { Editor } from '@monaco-editor/react';
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './Submission.css'
import axios from 'axios';

import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';

const Submission = () => {
    
    const {id} = useParams();

    usePageTitle(`Submission ${id} - Coders Inc.`)
    
    const [submissionDetails, setSubmissionDetails] = useState({
        problemName: '',
        problemID: '',
        submitterUserName: '',
        language: '',
        submitedAt: '',
        verdict: '',
        code: '',
    })

    const navigate = useNavigate() 

    //TODO: Implement test details display below the submission code
    const [testDetails, setTestDetails] = useState([
        {
            testNumber: '',
            timeTaken: '',
        }
    ])

    useEffect(() => {
        const fetchSubmissionData = async () => {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const response = await axios.get(`${SERVER_BASE_URL}/problems/submissions/${id}`, config);
                setSubmissionDetails(response.data)

            } catch (error) {
                console.error('Error fetching submission data:', error);
                navigate('/*')
            }
        }
        fetchSubmissionData();
    }, [id, navigate])

    return (
        <>
        <p className='submission-header'>Submission ID: {id}</p>
        <div className='submission-details'>
            <p>
                Problem: <Link to={`/problems/${submissionDetails.problemID}`} style={{textDecoration: 'none'}}>{submissionDetails.problemName}</Link><br/>
                Submitted By: <Link to ={`/users/${submissionDetails.submitterUserName}`} style={{textDecoration: 'none'}}>{submissionDetails.submitterUserName}</Link><br/>
                Language: {submissionDetails.language === 'cpp' ? "C++" : submissionDetails.language === 'python' ? "Python" : "Java"} <br/>
                Verdict: <span style={submissionDetails.verdict === 'Accepted' ? {fontWeight:'bold', color: 'green'} : {color: 'red'}}>{submissionDetails.verdict}</span><br/>
            </p>
        </div>
        <Editor
            className='ide'
            height="60vh"
            width={`100%`}
            language={submissionDetails.language}
            value={submissionDetails.code}
            theme={'vs-light'}
            options={{
                minimap: {
                    enabled: false
                },
                fontSize: "16px",
                readOnly: true
            }}
        />
    
        </>
    )
}

export default Submission;