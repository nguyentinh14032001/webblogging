import styled from "styled-components";
import React from "react";
import { useController } from "react-hook-form";

const TextareaStyles = styled.div`
  position: relative;
  width: 100%;
  textarea  {
    width: 100%;
    padding:16px 20px;
    background-color: ${(props) => props.theme.grayF1};
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    border: 2px solid transparent;
    font-size: 14px;
    resize:none;
    min-height:200px;
  }
  textarea:focus {
    background-color: white;
    border-color:${(props) => props.focusinput || "#382461"};
  }
  textarea::-webkit-input-placeholder {
    color: #848786;
  }
  textarea::-moz-input-placeholder {
    color: #848786;
  }
 
`;
/**
 *
 * @param {*} placeholder(optional) - Placeholder of Textarea
 * @param {*} name(optional) - name of Textarea
 * @param {*} control - control from react hook form
 * @returns Textarea
 */


const Textarea = ({  name = "", type = "text",focusinput, children, control, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <TextareaStyles focusinput={focusinput}>
      <textarea id={name} type={type} {...field} {...props} />
    </TextareaStyles>
  );
};

export default Textarea;
