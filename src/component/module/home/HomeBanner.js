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
    justify-content: center;
    &-content {
      max-width: 600px;
      color: white;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 20px;
    }
    &-desc{
      line-height: 1.75;
      margin-bottom: 40px;
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Libero
              officiis rem obcaecati aperiam, voluptas sed voluptatum tempore
              eius, provident quam sequi reprehenderit maiores accusantium
              mollitia sunt officia ipsum odit! Animi.
            </p>
            <Button to= '/sign-up' kind="secondary">Get started</Button>
          </div>
          <div className="banner-image">
            <img src="banner.png" alt="" />
          </div>
        </div>
      </div>
    </HomeBannerStyles>
  );
};

export default HomeBanner;
