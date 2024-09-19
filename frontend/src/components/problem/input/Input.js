import './Input.css';

const Input = ({inputValue, handleInputChange}) => {

  return (
    <div className="input-container">
      <label htmlFor="inputBox" className="input-label">
        Input:
      </label>
      <textarea
        id="inputBox"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter your input here"
        className="input-textarea"
      />
    </div>
  );
};

export default Input;
