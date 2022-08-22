import React from "react";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyles = styled.div`
  .post {
    &-image {
      width: 200px;
      height: 200px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 16px;
    }
    &-title {
      margin-bottom: 12px;
    }
    &-info {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 600;
      margin-left: auto;
      color: #6b6b6b;
    }
    &-dot {
      display: inline-block;
      width: 4px;
      height: 4px;
      background-color: currentColor;
      border-radius: 100rem;
    }
  }
`;
const PostItem = ({ data }) => {
  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyles>
      <PostImage
        to={data?.slug}
        alt=""
        url={
          data?.image ||
          "https://images.unsplash.com/photo-1570993492881-25240ce854f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2290&q=80"
        }
      ></PostImage>
      <PostCategory to={data?.category?.slug}>
        {data?.category?.name}
      </PostCategory>
      <PostTitle to={data?.slug}>{data?.title}</PostTitle>
      <PostMeta
        date={formatDate}
        to={
          data?.user?.username && slugify(data?.user?.fullname, { lower: true })
        }
        authorName={data?.user?.fullname}
      ></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
