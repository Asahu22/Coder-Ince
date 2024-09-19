import './Output.css';

const Output = ({ outputValue, isCompiling, execTime }) => {
  return (
    <div className="output-container">
      <label htmlFor="outputBox" className="output-label">
       <div className='output-label2'>
        Output:
        {isCompiling ? <div className="loading-spinner"></div> : <></>}</div>
      {execTime && !isCompiling ? <div className='exec-time'>Execution Time: {execTime}</div> : <></>}
      </label>
      <textarea
        id="outputBox"
        value={outputValue}
        readOnly
        className="output-textarea"
      />
    </div>
    
  );
};

export default Output;
