import {
  collection,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Heading from "../component/layout/Heading";
import Layout from "../component/layout/Layout";
import PostItem from "../component/module/post/PostItem";
import { db } from "../firebase/firebase-config";

const CategoryPage = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState({});
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "posts"),
        where("category.slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(results);
      });
    }
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "categories"),
        where("slug", "==", params.slug)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCategory(results);
      });
    }

    fetchData();
  }, [params.slug]);
  console.log(category);
  return (
    <Layout>
      <div className="container">
        <div className="pt-10"></div>
        <Heading>Danh mục {category[0]?.name}</Heading>
        <div className="grid-layout">
          {posts.map((item) => (
            <PostItem key={item.id} data={item}></PostItem>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
