import React from "react";
import styled from "styled-components";
import { useDropdown } from "./Dropdown-context";

const SelectStyles = styled.div`
display: flex;
align-items:center;
justify-content:space-between;
padding:20px;
font-weight:500;
cursor: pointer;
border-radius:8px;
--tw-bg-opacity: 1;
  background-color: rgb(231 236 243 / var(--tw-bg-opacity));
`
const Select = ({ placeholder = "" }) => {
  const { toggle, show } = useDropdown();
  return (
    <SelectStyles
      onClick={toggle}
    >
      <span>{placeholder}</span>
      <span>
        {show ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </span>
    </SelectStyles>
  );
};

export default Select;
