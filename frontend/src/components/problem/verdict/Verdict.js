import './Verdict.css'; 
import { Link } from 'react-router-dom';

const Verdict = ({ verdict, isAccepted, submissionID }) => {

    const verdictStyle = {
        color: isAccepted ? 'green' : 'red'
      };

  return (
    <>
    <div className="verdict-box">
      <h2>Verdict: <span style={verdictStyle}>{verdict}</span></h2>
    <Link to= {`/problems/submissions/${submissionID}`}><h2 className='submission-details'>Submission details</h2></Link>
    </div>
    </>
  );
};

export default Verdict;
