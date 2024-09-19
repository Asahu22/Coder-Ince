import './ToggleThemeButton.css';

const ToggleThemeButton = ({handleToggleMode, isDarkMode}) => {

  return (
    <button
      className={`custom-button ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
      onClick={handleToggleMode}
    >
      {isDarkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ToggleThemeButton;
