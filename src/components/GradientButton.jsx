import React from 'react';
import styled from 'styled-components';

const GradientButton = ({ onClick, text = "Try now" }) => {
  return (
    <StyledWrapper>
      <button className="gradient-button" onClick={onClick}>
        <span className="gradient-text">{text}</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .gradient-button {
    position: relative;
    padding: 16px 32px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: transparent;
    border: none;
    cursor: pointer;
    border-radius: 50px;
    overflow: hidden;
    transition: transform 0.2s ease;
    z-index: 1;
  }

  .gradient-button:hover {
    transform: scale(1.03);
  }

  .gradient-button::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #feca57,
      #ff9ff3,
      #ff6b6b
    );
    z-index: -2;
    filter: blur(10px);
    transform: rotate(0deg);
    transition: transform 1.5s ease-in-out;
    animation: spin 4s linear infinite;
  }

  .gradient-button:hover::before {
    /* transform: rotate(180deg); */
  }

  .gradient-button::after {
    content: "";
    position: absolute;
    inset: 3px;
    background: black;
    border-radius: 47px;
    z-index: -1;
    filter: blur(0px); /* Removed blur to make text readable */
  }

  .gradient-text {
    color: transparent;
    background: conic-gradient(
      from 0deg,
      #ff6b6b,
      #4ecdc4,
      #45b7d1,
      #96ceb4,
      #feca57,
      #ff9ff3,
      #ff6b6b
    );
    background-clip: text;
    -webkit-background-clip: text;
    filter: hue-rotate(0deg);
    position: relative;
    z-index: 2;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  .gradient-button:hover .gradient-text {
    animation: hue-rotating 2s linear infinite;
  }

  .gradient-button:active {
    transform: scale(0.99);
  }

  @keyframes hue-rotating {
    to {
      filter: hue-rotate(360deg);
    }
  }`;

export default GradientButton;
