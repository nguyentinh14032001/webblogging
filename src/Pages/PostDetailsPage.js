import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Layout from "../component/layout/Layout";
import PostCategory from "../component/module/post/PostCategory";
import PostImage from "../component/module/post/PostImage";
import PostMeta from "../component/module/post/PostMeta";
import { db } from "../firebase/firebase-config";
import NotFoundPage from "./NotFoundPage";
import parse from "html-react-parser";
import AuthorBox from "../component/author/AuthorBox";
import PostRelated from "../component/module/post/PostRelated";

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
      color: ${(props) => props.theme.primary};
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
  const { slug } = useParams();
  const [postInfo, setpostInfo] = useState("");
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          console.log(doc.data());
          doc.data() && setpostInfo(doc.data());
        });
      });
    }
    fetchData();
  }, [slug]);
  console.log(postInfo);
  if (!slug || !postInfo.title) return <NotFoundPage></NotFoundPage>;
  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-top">
            <PostImage
              url={postInfo?.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory className="mb-6">
                {postInfo?.category?.name}
              </PostCategory>
              <h1 className="post-heading">{postInfo?.title}</h1>
              <PostMeta></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(postInfo?.content || "")}
            </div>
            <AuthorBox userId={postInfo?.user.id}></AuthorBox>
          </div>
          <PostRelated categoryId={postInfo?.categoryId}></PostRelated>
        </div>
     
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
