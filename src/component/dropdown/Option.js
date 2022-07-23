import React from "react";
import styled from "styled-components";
import { useDropdown } from "./Dropdown-context";
const Option = ({ onClick, children }) => {
  const {setShow} = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false)
  }
  const OptionStyles =styled.div`
    padding: 16px 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.1s linear;
    &:hover{
      --tw-bg-opacity: 1;
      background-color: rgb(243 244 246 / var(--tw-bg-opacity));
    }

  `
  return (
    <OptionStyles
      onClick={handleClick}
    >
      {children}
    </OptionStyles>
  );
};

export default Option;
