import './SolveCounter.css'; 

const SolveCounter = ({ numberOfSolves }) => {
  return (
    <div className="solve-counter">
      <div className="solve-counter-top">
        Number of Solves
      </div>
      <div className="solve-counter-bottom">
        {numberOfSolves}
      </div>
    </div>
  );
};

export default SolveCounter;
