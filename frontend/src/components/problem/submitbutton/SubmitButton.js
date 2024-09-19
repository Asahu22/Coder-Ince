import './SubmitButton.css';

const SubmitButton = ({handlePress, isPressed, isCompilng, isSubmitting, liveTestStatus}) => {
  
  return (
    <button
      className={`run-button ${isPressed ? 'pressed' : ''}`}
      onClick={handlePress}
      disabled={isCompilng || isSubmitting}
        >
      {
          isSubmitting ?
          liveTestStatus ?
          `${liveTestStatus}...` :
          "Testing.."
        : "Submit"
      }    
      {/* {isSubmitting ? 'Testing...' : "Submit"} */}
    </button>
  );
};

export default SubmitButton;
