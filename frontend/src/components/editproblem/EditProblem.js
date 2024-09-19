import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { SERVER_BASE_URL } from '../../config';
import usePageTitle from '../../hooks/usePageTitle';
import './EditProblem.css';

const EditProblem = ({ isAdmin }) => {

  usePageTitle("Edit Problem")

  const {id} = useParams();
  const navigate = useNavigate()
  
  const [problemData, setProblemData ] = useState({
    name: '',
    statement: '',
    tags: [],
    difficulty: 'easy',
    sampleInput: '',
    sampleOutput: ''
}) 
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchProblemData = async () => {
      try {
          const token = localStorage.getItem('token')
          const config = {
              headers: {
                  'Authorization': `Bearer ${token}`,
              },
          };
          const response = await axios.get(`${SERVER_BASE_URL}/problems/${id}`, config);
          setProblemData(response.data)

      } catch (error) {
          navigate('/*')
          
      }
  }
  fetchProblemData();
  },[id, navigate])

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
        await axios.patch(`${SERVER_BASE_URL}/problems/${id}`,problemData, config);

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
    catch(error) {
        setErrorMessage("Error editing problem")
    }
  };

  return (
    <>{isAdmin ?
    <>
    <div className="add-problem-container">
        <h2>Edit Problem</h2>
      <form className="add-problem-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Problem Name:</label>
        <input
          type="text"
          id="name"
          value={problemData.name}
          onChange={(e) => handleProblemDataChange(e)}
          required
        />

        <label htmlFor="statement">Problem Statement:</label>
        <textarea
          id="statement"
          value={problemData.statement}
          onChange={(e) => handleProblemDataChange(e)}
          required
        />

        <label htmlFor="difficulty">Problem Difficulty:</label>
        <select 
          id="difficulty"
          value={problemData.difficulty}
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
          onChange={(e) => handleProblemDataChange(e)}
          required
        />

        <label htmlFor="sampleOutput">Sample Output:</label>
        <textarea
          id="sampleOutput"
          value={problemData.sampleOutput}
          onChange={(e) => handleProblemDataChange(e.target.value)}
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

        <button type="submit" className="submit-button">Edit Problem</button>
      </form>
      {errorMessage ? <p>{errorMessage}</p> : <></>}
    </div> 
    </>
    :<>
    <Navigate to={'/*'} replace></Navigate>
    </>}
    </>
  );
};

export default EditProblem;
