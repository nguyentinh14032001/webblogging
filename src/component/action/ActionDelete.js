import React from "react";
import styled from "styled-components";

const ActionDeleteStyles = styled.span`
  /* transition: all 0.2s linear;
  position: relative;
  z-index: 1;
  ::before {
    height: 100%;
    width: 0%;
    position: absolute;
    top: 0;
    content: "";
    left: 0;
    border-radius: inherit;
    background-color: #e74c3c; //#07bc0c #f1c40f
    z-index: -1;
    transition: all 0.2s linear;
  }
  :hover::before {
    width: 100%;

    border-radius: inherit;
  }
  :hover {
    color: white;
  } */
`;
const ActionDelete = ({ onClick = () => {} }) => {
  return (
    <ActionDeleteStyles
      className="flex items-center justify-center w-10 h-10 border border-red-500 opacity-70 transition-opacity hover:opacity-100 text-red-500 rounded cursor-pointer"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    </ActionDeleteStyles>
  );
};

export default ActionDelete;
