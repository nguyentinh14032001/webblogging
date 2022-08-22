import {
  addDoc,
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { useParams } from "react-router-dom";
import AuthorBox from "../component/author/AuthorBox";
import Layout from "../component/layout/Layout";
import NotFoundPage from "./NotFoundPage";
import parse from "html-react-parser";
import PostCategory from "../component/module/post/PostCategory";
import PostImage from "../component/module/post/PostImage";
import PostMeta from "../component/module/post/PostMeta";
import PostRelated from "../component/module/post/PostRelated";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LoadingSkeleton from "../component/loading/LoadingSkeleton";
import Heading from "../component/layout/Heading";
import { toast } from "react-toastify";
import { useSignIn } from "../context/SignInContext";
import { Button } from "../component/button";
import ListComments from "../component/comment/ListComments";

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
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState([]);
 

  const { user } = useSignIn();
  const date = postInfo?.createdAt?.seconds
    ? new Date(postInfo?.createdAt.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      setLoading(true);
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      await onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
       doc.data() && setpostInfo({ id: doc.id, ...doc.data() });
          setLoading(false);
        });
      });
    }
    fetchData();
  }, [slug]);
  useEffect(() => {
    document.title = "Page details";
    document.body.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [slug]);
  async function handleUpdateComment(e) {
    e.preventDefault();
    try {
      const colRef = collection(db, "comments");
      await addDoc(colRef, {
        user: user?.id,
        cmt: comment,
        post: postInfo?.id,
        createdAt: new Date(),
      });
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }
  

  if (!slug) return <NotFoundPage></NotFoundPage>;
  return (
    <PostDetailsPageStyles>
      <Layout>
        {loading && <PostDetailsPageLoading></PostDetailsPageLoading>}
        {postInfo.title && !loading && (
          <div className="container">
            <div className="post-top">
              <PostImage
                url={postInfo?.image}
                className="post-feature"
              ></PostImage>
              <div className="post-info">
                <PostCategory to={postInfo?.category?.slug} className="mb-6">
                  {postInfo?.category?.name}
                </PostCategory>
                <div className="post-heading">{postInfo?.title}</div>
                <PostMeta
                  date={formatDate}
                  authorName={postInfo?.user?.username}
                ></PostMeta>
              </div>
            </div>
            <div className="post-content">
              <div className="entry-content">
                {parse(postInfo?.content || "")}
              </div>
              <AuthorBox userId={postInfo?.user?.id}></AuthorBox>
            </div>
            <div className="mb-10">
              <Heading>COMMENT</Heading>
              <div className="flex mb-10 gap-x-4">
                <img
                  src={user?.avatar}
                  className="h-10 w-10 rounded-full object-cover"
                  alt=""
                />
                <textarea
                  onChange={(e) => setComment(e.target.value)}
                  required
                  placeholder="Nhập bình luận của bạn"
                  className="w-full max-w-[400px] border-b-2 border-gray-300 rounded-sm "
                ></textarea>
                <Button
                  height="50px"
                  isLoading={loading}
                  disabled={loading}
                  onClick={handleUpdateComment}
                  type="button"
                  kind="ghost"
                >
                  Send
                </Button>
              </div>

              
                
              <ListComments postId={postInfo?.id}></ListComments>
             
            </div>
            <PostRelated categoryId={postInfo?.category?.id}></PostRelated>
          </div>
        )}
      </Layout>
    </PostDetailsPageStyles>
  );
};
const PostDetailsPageLoading = () => {
  return (
    <div className="container">
      <div className="post-top">
        <div className="post-feature">
          <LoadingSkeleton
            width="100%"
            height="100%"
            radius="16px"
          ></LoadingSkeleton>
        </div>
        <div className="post-info">
          <div className="mb-6">
            <PostCategory>
              <LoadingSkeleton
                width="80px"
                height="24px"
                radius="0px"
              ></LoadingSkeleton>
            </PostCategory>
          </div>
          <h1 className="post-heading">
            <LoadingSkeleton
              width="100%"
              height="54px"
              radius="16px"
            ></LoadingSkeleton>
          </h1>
          <div className="flex items-center gap-x-2">
            <div>
              <LoadingSkeleton
                width="70px"
                height="21px"
                radius="16px"
              ></LoadingSkeleton>
            </div>
            <div>
              <LoadingSkeleton
                width="4px"
                height="4px"
                radius="50%"
              ></LoadingSkeleton>
            </div>
            <div>
              <LoadingSkeleton
                width="70px"
                height="21px"
                radius="16px"
              ></LoadingSkeleton>
            </div>
          </div>
        </div>
      </div>
      <div className="post-content"></div>
      <PostRelated>
        <div className="flex gap-x-4">
          <LoadingSkeleton
            width="325px"
            height="208px"
            radius="16px"
          ></LoadingSkeleton>
          <LoadingSkeleton
            width="325px"
            height="208px"
            radius="16px"
          ></LoadingSkeleton>
          <LoadingSkeleton
            width="325px"
            height="208px"
            radius="16px"
          ></LoadingSkeleton>
        </div>
      </PostRelated>
    </div>
  );
};
export default PostDetailsPage;
