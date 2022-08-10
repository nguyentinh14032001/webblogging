import styled from "styled-components";
import React from "react";
import { useController } from "react-hook-form";

const InputStyles = styled.div`
  position: relative;
  width: 100%;
  input {
    width: 100%;
    padding: ${(props) => props.hasIcon ? "20px 60px 20px 20px" : "20px"};
    background-color: transparent;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s linear;
    border: 2px solid ${(props) => props.theme.grayf1};
    color: ${(props) => props.theme.black};
    font-size: 14px;
  }
  input:focus {
    background-color: white;
    border-color:${(props) => props.focusinput || "#382461"};
  }
  input::-webkit-input-placeholder {
    color: #848786;
  }
  input::-moz-input-placeholder {
    color: #848786;
  }
  .input-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({  name = "", type = "text",focusinput, children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <InputStyles focusinput={focusinput}  hasIcon={ children ? true : false }>
      <input id={name} type={type} {...field} {...props} />
      { children ? <div className='input-icon' >{children}</div> : null }
    </InputStyles>
  );
};

export default Input;
