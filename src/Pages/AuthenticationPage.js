import React, { Children } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }
  .form {
    max-width: 600px;
    margin: auto;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 700;
    }
  }
`;
const AuthenticationPage = (props) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
        <NavLink to ='/'>
          <img srcSet="logo.png 2x" alt="astronaut-blogging" className="logo" />
        </NavLink>
          <h1 className="heading">Superb Blogging</h1>
          {props.children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
