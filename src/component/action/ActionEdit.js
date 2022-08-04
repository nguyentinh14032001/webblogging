import React from "react";
import styled from "styled-components";
const ActionEditStyles = styled.span`
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
  background-color:  #f1c40f;
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
const ActionEdit = ({ onClick = () => {} }) => {
  return (
    <ActionEditStyles
      className="flex items-center justify-center w-10 h-10 border border-gray-200 rounded cursor-pointer"
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
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    </ActionEditStyles>
  );
};

export default ActionEdit;