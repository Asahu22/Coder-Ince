import './SubmissionCounter.css'; 

const SubmissionCounter = ({ numberOfSubmissions }) => {
  return (
    <div className="submission-counter">
      <div className="submission-counter-top">
        Number of Submissions
      </div>
      <div className="submission-counter-bottom">
        {numberOfSubmissions}
      </div>
    </div>
  );
};

export default SubmissionCounter;
