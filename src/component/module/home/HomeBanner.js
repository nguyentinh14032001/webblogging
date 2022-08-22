import React from "react";
import styled from "styled-components";
import { Button } from "../../button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-bottom: 60px;
  .banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc {
      line-height: 1.75;
      margin-bottom: 40px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      justify-content:center;
      align-items:center;
      &-heading {
        font-size: 30px;
        margin-bottom: 20px;
      }
      &-content{
        display: flex;
        flex-direction:column;
        align-items:center;
        justify-content:center;
        margin-bottom: 10px;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top: 25px;
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 15px;
        
      }
    }
  }
`;
const HomeBanner = () => {
  return (
    <HomeBannerStyles>
      <div className="container">
        <div className="banner">
          <div className="banner-content">
            <h1 className="banner-heading">Superb Blogging</h1>
            <p className="banner-desc">
              "My name is Tinh and I'm a frontend developer with one years'
              experience in JavaScript programming language"
            </p>
            <Button to="/sign-up" className="banner-button" kind="secondary">
              Get started
            </Button>
          </div>
          <div className="banner-image w-[450px] h-[450px]">
            <img className="w-full h-full rounded-full object-cover" src="https://cdn.dribbble.com/users/1541584/screenshots/5462684/planet.gif" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
