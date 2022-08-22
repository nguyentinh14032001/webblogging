import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase-config";
import Heading from "../../layout/Heading";
import PostItem from "./PostItem";

const PostRelated = ({ categoryId = "", children}) => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const colRef = query(
      collection(db, "posts"),
      where("category.id", "==", categoryId)
    );
    onSnapshot(colRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(results);
    });
  }, [categoryId]);
  if (!categoryId && !posts.length <= 0) return null;
  return (
    <div className="post-related">
      <Heading>Bài viết liên quan</Heading>
      <div className="grid-layout grid-layout--primary">
        {posts &&
          posts.length > 0 &&
          posts.map((post) => <PostItem key={post.id} data={post}></PostItem>)}
      </div>
      {children}
    </div>
  );
};

export default PostRelated;
