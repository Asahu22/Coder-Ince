import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="left-half">
        <p>Left Side Text</p>
      </div>
      <div className="right-half">
        <p>Right Side Text</p>
        <div className="logos">
          <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
            {/* <img src={linkedinLogo} alt="LinkedIn" /> */}
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            {/* <img src={githubLogo} alt="GitHub" /> */}
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
