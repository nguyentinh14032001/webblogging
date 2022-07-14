import React from "react";
import styled from "styled-components";
import Layout from "../component/layout/Layout";
import PostImage from "../component/module/post/PostImage";
const PostDetailsPageStyles = styled.div``;
const PostDetailsPage = () => {
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <PostImage
            url="https://images.unsplash.com/photo-1649837867356-6c7ef7057f32?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
            className="post-feature"
          ></PostImage>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
