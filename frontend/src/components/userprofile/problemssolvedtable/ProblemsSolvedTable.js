import { Link } from 'react-router-dom';
import './ProblemsSolvedTable.css'; 

const ProblemsSolvedTable = ({ problemsSolved }) => {
  return (
    <table className="problem-solved-table">
      <thead>
        <tr>
          <th>Recent Problems Solved</th>
        </tr>
      </thead>
      <tbody>
      { problemsSolved && problemsSolved.length > 0  ? problemsSolved.map((problem) => (
          <tr key={problem._id}>
            <td><Link to={`/problems/${problem._id}`}>{problem.name}</Link></td>
          </tr>
        )) : <tr><td>This user has not solved any problems yet.</td></tr>}
      </tbody>
    </table>
  );
};

export default ProblemsSolvedTable;
