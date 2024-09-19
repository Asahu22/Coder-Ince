import './CompileButton.css';

const CompileButton = ({handlePress, isPressed, isCompiling, isSubmitting}) => {
  
  return (
    <button
      className={`compile-button ${isPressed ? 'pressed' : ''}`}
      onClick={handlePress}
      disabled={isCompiling || isSubmitting}
      >
    {isCompiling ? 'Compiling...' : "Compile"}
    </button>
  );
};

export default CompileButton;
