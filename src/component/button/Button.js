import React from "react";
import styled, { css } from "styled-components";
import { LoadingSpinner } from "../loading";
import propTypes from "prop-types";
import { NavLink } from "react-router-dom";

const ButtonStyles = styled.button`
  padding: 0 25px;
  border-radius: 8px;
  cursor: pointer;
  line-height: 1;

  ${(props) =>
    props.kind === "secondary" &&
    css`
      color: ${(props) => props.theme.secondary};
      background-color: white;
    `};
  ${(props) =>
    props.kind === "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};
  font-size: 18px;
  font-weight: 600;

  height: ${(props) => props.height || "63px"};
  &:disabled {
    opacity: 0.5;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Button = ({
  type = "button",
  children,
  onClick = () => {},
  kind = "primary",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyles
          style={{ display: "inline-block" }}
          type={type}
          kind={kind}
          {...props}
        >
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: propTypes.oneOf(["button", "submit"]),
  isLoading: propTypes.bool,
  onClick: propTypes.func,
  children: propTypes.node,
};
export default Button;
