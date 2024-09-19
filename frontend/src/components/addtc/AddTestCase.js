import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';
import './AddTestCase.css';

const AddTestCase= ({ isAdmin }) => {

    usePageTitle("Add Test Case");

    const {id} = useParams();
     
    const [testCaseInput, settestCaseInput] = useState('');
    const [testCaseOutput, settestCaseOutput] = useState('');

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

            };
            const data = {
                testCaseInput: testCaseInput,
                testCaseOutput: testCaseOutput,
                problemID : id
            }
            await axios.post(`${SERVER_BASE_URL}/problems/${id}/addtc`, data, config);
           
            settestCaseInput('');
            settestCaseOutput('');
            setErrorMessage(null);
            navigate(`/problems/${id}`);
        }
        catch (error) {
            setErrorMessage("Error adding test case")
        }
    };

    return (
        <>{isAdmin ?
            <>
                <div className="add-problem-container">
                    <h2>New Test Case</h2>
                    <form className="add-problem-form" onSubmit={handleSubmit}>
                        <label htmlFor="testCaseInput">Test Case Input:</label>
                        <textarea
                            id="testCaseInput"
                            value={testCaseInput}
                            onChange={(e) => settestCaseInput(e.target.value)}
                            required
                        />

                        <label htmlFor="testCaseOutput">Test Case Output:</label>
                        <textarea
                            id="testCaseOutput"
                            value={testCaseOutput}
                            onChange={(e) => settestCaseOutput(e.target.value)}
                            required
                        />
                        <button type="submit" className="submit-button">Add Test Case</button>
                    </form>
                    {errorMessage ? <p>{errorMessage}</p> : <></>}
                </div>
            </>
            : <>
                <Navigate to={'/*'} replace></Navigate>
            </>}
        </>
    );
};

export default AddTestCase;
