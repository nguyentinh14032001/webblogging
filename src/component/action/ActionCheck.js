import React from "react";
import styled from "styled-components";

const ActionDeleteStyles = styled.span`

`;
const ActionCheck = ({ onClick = () => {} }) => {
  return (
    <ActionDeleteStyles
      className="flex items-center justify-center w-10 h-10 opacity-70 border border-green-500  rounded cursor-pointer transition-opacity hover:opacity-100 text-green-500 "
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className=" w-5 h-5 "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </ActionDeleteStyles>
  );
};

export default ActionCheck;
