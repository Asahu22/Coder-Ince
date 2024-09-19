import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';
import './AddProblem.css';

const AddProblem = ({ isAdmin }) => {

    usePageTitle("Add New Problem")

    const [problemData, setProblemData ] = useState({
        name: '',
        statement: '',
        tags: [],
        difficulty: 'easy',
        sampleInput: '',
        sampleOutput: ''
    }) 

    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate()

    const handleProblemDataChange = (e) => {
        const {id, value} = e.target;
        setProblemData((prevProblemData) => ({
            ...prevProblemData,
            [id]: value,
        }));
    }

    const handleTagChange = (e) => {
        const selectedTag = e.target.value;
        setProblemData((prevProblemData) => ({
            ...prevProblemData,
            tags :
            prevProblemData.tags.includes(selectedTag) ? prevProblemData.tags.filter((tag) => tag !== selectedTag) :
            [...prevProblemData.tags, selectedTag]
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },

            };

            await axios.post(`${SERVER_BASE_URL}/problems`, problemData, config);

            setErrorMessage(null);
            
            setProblemData({
                name: '',
                statement: '',
                tags: [],
                difficulty: 'easy',
                sampleInput: '',
                sampleOutput: ''
            })

            navigate('/problems');
        }
        catch (error) {
            setErrorMessage("Error creating a new problem")
        }
    };

    return (
        <>{isAdmin ?
            <>
                <div className="add-problem-container">
                    <h2>New Problem</h2>
                    <form className="add-problem-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Problem Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={problemData.name}
                            // onChange={(e) => setProblemName(e.target.value)}
                            onChange={(e) => handleProblemDataChange(e)}
                            required
                        />

                        <label htmlFor="statement">Problem Statement:</label>
                        <textarea
                            id="statement"
                            value={problemData.statement}
                            // onChange={(e) => setProblemStatement(e.target.value)}
                            onChange={(e) => handleProblemDataChange(e)}
                            required
                        />

                        <label htmlFor="difficulty">Problem Difficulty:</label>
                        <select 
                            id="difficulty" 
                            value={problemData.difficulty} 
                            // onChange={(e) => setProblemDifficulty(e.target.value)}
                            onChange={(e) => handleProblemDataChange(e)}

                            >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>

                        <label htmlFor="sampleInput">Sample Input:</label>
                        <textarea
                            id="sampleInput"
                            value={problemData.sampleInput}
                            // onChange={(e) => setSampleInput(e.target.value)}
                            onChange={(e) => handleProblemDataChange(e)}
                            required
                        />

                        <label htmlFor="sampleOutput">Sample Output:</label>
                        <textarea
                            id="sampleOutput"
                            value={problemData.sampleOutput}
                            // onChange={(e) => setSampleOutput(e.target.value)}
                            onChange={(e) => handleProblemDataChange(e)}
                            required
                        />

                        <label>Tags:</label>
                        <div className="tags-container">
                            <label>
                                <input type="checkbox" value="greedy" checked={problemData.tags.includes('greedy')} onChange={handleTagChange} />
                                Greedy
                            </label>
                            <label>
                                <input type="checkbox" value="dp" checked={problemData.tags.includes('dp')} onChange={handleTagChange} />
                                DP
                            </label>
                            <label>
                                <input type="checkbox" value="constructive algorithms" checked={problemData.tags.includes('constructive algorithms')} onChange={handleTagChange} />
                                Constructive Algorithms
                            </label>
                            <label>
                                <input type="checkbox" value="graphs" checked={problemData.tags.includes('graphs')} onChange={handleTagChange} />
                                Graphs
                            </label>
                            <label>
                                <input type="checkbox" value="number theory" checked={problemData.tags.includes('number theory')} onChange={handleTagChange} />
                                Number Theory
                            </label>
                        </div>

                        <button type="submit" className="submit-button">Add Problem</button>
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

export default AddProblem;
