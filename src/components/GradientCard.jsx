import React from 'react';
import styled from 'styled-components';

const GradientCard = ({ title, description }) => {
  return (
    <StyledWrapper>
      <div className="card">
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .card {
    width: 300px;
    height: 254px;
    border-radius: 1rem;
    background-color: #4158D0;
    background-image: linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
    box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    transition: transform 0.3s ease;
  }
  
  .card:hover {
    transform: translateY(-10px);
  }

  .card-content {
    /* background: rgba(0, 0, 0, 0.6); Removed as per user request */
    padding: 20px;
    border-radius: 10px;
    color: white;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    /* backdrop-filter: blur(5px); Removed as it might look weird without background */
  }
  
  .card-content h3 {
    margin-bottom: 10px;
    font-size: 1.2rem;
    color: #FFCC70;
  }
  
  .card-content p {
    font-size: 0.9rem;
    line-height: 1.4;
  }
  `;

export default GradientCard;
