import React from "react";
import styled from "styled-components";
import { useDropdown } from "./Dropdown-context";

const ListStyles= styled.div`
  position: absolute;
  width: 100%;
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  left: 0;
  top:100%;
`
const List = ({ children, className }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <ListStyles className={className}>
          {children}
        </ListStyles>
      )}
    </>
  );
};

export default List;
