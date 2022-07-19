import React from "react";
import styled from "styled-components";
import Heading from "../component/layout/Heading";
import Layout from "../component/layout/Layout";
import PostCategory from "../component/module/post/PostCategory";
import PostImage from "../component/module/post/PostImage";
import PostItem from "../component/module/post/PostItem";
import PostMeta from "../component/module/post/PostMeta";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    margin-top: 40px;
    margin-bottom: 80px;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    display: flex;
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
        display: block;
      }
    }
    &-content {
      padding: 20px;
    }
    &-name {
      font-weight: bold;
      color: ${props => props.theme.primary};
      margin-bottom: 10px;
      font-size: 20px;
    }
    &-desc {
      font-size: 14px;
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-top {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author {
      flex-direction: column;
      &-image {
        width: 100%;
        height: auto;
      }
    }
  }
`;
const PostDetailsPage = () => {
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-top">
            <PostImage
              url="https://images.unsplash.com/photo-1657674206263-41dba8228013?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-5">Kiến thức</PostCategory>
              <h1 className="post-heading">
                Hướng dẫn setup phòng cực chill dành cho người mới toàn tập
              </h1>
              <PostMeta></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              <h2>Chương 1</h2>
              <p>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
                Delicious romantic undisturbed raw platter will meld. Thick
                Skewers skillet natural, smoker soy sauce wait roux. slices Food
                qualities braise chicken cuts bowl through slices butternut
                snack. Tender meat juicy dinners. One-pot low heat plenty of
                time adobo fat raw soften fruit. sweet renders bone-in marrow
                richness kitchen, fricassee basted pork shoulder. Delicious
                butternut squash hunk. Flavor centerpiece plate, delicious ribs
                bone-in meat, excess chef end. sweet effortlessly pork, low heat
                smoker soy sauce flavor meat, rice fruit fruit. Romantic
                fall-off-the-bone butternut chuck rice burgers. renders aromatic
                enjoyment, then slices taco. Minutes undisturbed cuisine lunch
                magnificent mustard curry. Juicy share baking sheet pork. Meals
                ramen rarities selection, raw pastries richness magnificent
                atmosphere. Sweet soften dinners, cover mustard infused skillet,
                Skewers on culinary experience.
              </p>
              <p>
                Juicy meatballs brisket slammin' baked shoulder. Juicy smoker
                soy sauce burgers brisket. polenta mustard hunk greens. Wine
                technique snack skewers chuck excess. Oil heat slowly. slices
                natural delicious, set aside magic tbsp skillet, bay leaves
                brown centerpiece. fruit soften edges frond slices onion snack
                pork steem on wines excess technique cup; Cover smoker soy sauce
                fruit snack. Sweet one-dozen scrape delicious, non sheet raw
                crunch mustard. Minutes clever slotted tongs scrape, brown steem
                undisturbed rice.
              </p>
              <p>
                Food qualities braise chicken cuts bowl through slices butternut
                snack. Tender meat juicy dinners. One-pot low heat plenty of
                time adobo fat raw soften fruit. sweet renders bone-in marrow
                richness kitchen, fricassee basted pork shoulder. Delicious
                butternut squash hunk. Flavor centerpiece plate, delicious ribs
                bone-in meat, excess chef end. sweet effortlessly pork, low heat
                smoker soy sauce flavor meat, rice fruit fruit. Romantic
                fall-off-the-bone butternut chuck rice burgers.
              </p>
              <figure>
                <img
                  src="https://images.unsplash.com/photo-1657538191753-f6c0a8042594?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  alt=""
                />
                <figcaption>
                  Gastronomy atmosphere set aside. Slice butternut cooking home.
                </figcaption>
              </figure>

              <h2>Chương 2</h2>
              <p>
                Gastronomy atmosphere set aside. Slice butternut cooking home.
                Delicious romantic undisturbed raw platter will meld. Thick
                Skewers skillet natural, smoker soy sauce wait roux. slices Food
                qualities braise chicken cuts bowl through slices butternut
                snack. Tender meat juicy dinners. One-pot low heat plenty of
                time adobo fat raw soften fruit. sweet renders bone-in marrow
                richness kitchen, fricassee basted pork shoulder. Delicious
                butternut squash hunk. Flavor centerpiece plate, delicious ribs
                bone-in meat, excess chef end. sweet effortlessly pork, low heat
                smoker soy sauce flavor meat, rice fruit fruit. Romantic
                fall-off-the-bone butternut chuck rice burgers. renders aromatic
                enjoyment, then slices taco. Minutes undisturbed cuisine lunch
                magnificent mustard curry. Juicy share baking sheet pork. Meals
                ramen rarities selection, raw pastries richness magnificent
                atmosphere. Sweet soften dinners, cover mustard infused skillet,
                Skewers on culinary experience.
              </p>
            </div>
            <div className="author">
              <div className="author-image">
                <img
                  src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/272865576_1026501861233390_6672108800918033642_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=KzK10CiuO98AX9DMie-&tn=ZTHW_0A2NPQGiVlz&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8pFw4JNC0UQVtFKEXOTNVrYWfddOkOlyQPMdcWlzRMiw&oe=62D719DD"
                  alt=""
                />
              </div>
              <div className="author-content">
                <h3 className="author-name">Nguyen Tinh</h3>
                <p className="author-desc">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos non animi porro voluptates quibusdam optio nulla
                  quis nihil ipsa error delectus temporibus nesciunt, nam
                  officiis adipisci suscipit voluptate eum totam!
                </p>
              </div>
            </div>
          </div>
          <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
              <PostItem></PostItem>
              <PostItem></PostItem>
              <PostItem></PostItem>
              <PostItem></PostItem>
            </div>
          </div>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
