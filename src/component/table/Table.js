import React from "react";
import styled from "styled-components";

const TableStyles = styled.div`
overflow-x: auto;
  background-color: white;
  border-radius: 10px;
  table {
    width: 100%;
  }
  thead {
    background-color: #f7f7f8;
  }
  th,
  td {
    vertical-align: middle;
    white-space: nowrap;
  }
  th {
    padding: 20px 25px;
    font-weight: 600;
    text-align: left;
  }
  td {
    padding: 15px 25px;
  }
  tbody {
  }
`;
const Table = ({ children }) => {
  return (
    <TableStyles>
      <table>{children}</table>
    </TableStyles>
  );
};

export default Table;
