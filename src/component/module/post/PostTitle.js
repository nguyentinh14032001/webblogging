import React from "react";
import styled, { css } from "styled-components";
import { Link, NavLink } from "react-router-dom";

const PosttitleStyles = styled.h3`
  font-weight: 600;
  line-height: 1.5;
  a {
    display: block;
  }
  ${(props) =>
    props.size === "normal" &&
    css`
      font-size: 18px;
    `};
  ${(props) =>
    props.size === "big" &&
    css`
      font-size: 22px;
    `};
`;
const PostTitle = ({ children, className = "", size = "normal", to = "/" }) => {
  return (
    <PosttitleStyles size={size} className={`post-title ${className}`}>
      <Link to={`/${to}`}>{children}</Link>
    </PosttitleStyles>
  );
};

export default PostTitle;
