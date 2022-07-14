import styled from "styled-components";
import React from "react";
const LabelStyles = styled.label`
  color: ${(props) => props.theme.grayDark};
  font-weight: 600;
 
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return <LabelStyles htmlFor={htmlFor} {...props}>
    {children}
  </LabelStyles>;
};

export default Label;
