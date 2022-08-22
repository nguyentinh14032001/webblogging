import React from 'react';
import styled, { css } from "styled-components";
const SpinnerStyles = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  ${props => props.type === 'primary' && css`
  border: ${(props) => props.borderSize} solid purple;
  `};
  ${props => props.type === '' && css`
  border: ${(props) => props.borderSize} solid white;
  `};
  
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  border-radius: 100rem;
  display: block;
  animation: spinner 1s infinite linear;
  @keyframes spinner {
    100% {
      transform: rotate(360deg);
    }
  }
`;
const LoadingSpinner = ({ size = "40px", borderSize = "5px",type="", className="" }) => {
  return <SpinnerStyles size={size} type={type} className={className} borderSize={borderSize}></SpinnerStyles>;
};

export default LoadingSpinner;
