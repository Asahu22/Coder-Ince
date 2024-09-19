import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeButton.css'; 

const HomeButton = ({ label, goTo }) => {
  const [isPressed, setIsPressed] = useState(false);
    const navigate = useNavigate()

  const handleClick = () => {
    setIsPressed(true);

    setTimeout(() => {
      setIsPressed(false);
    }, 200);

    navigate(`/${goTo}`)
  };

  return (
    <button
      className={`home-button ${isPressed ? 'pressed' : ''}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default HomeButton;