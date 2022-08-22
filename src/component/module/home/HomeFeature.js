import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { db } from "../../../firebase/firebase-config";
import Heading from "../../layout/Heading";
import LoadingSkeleton from "../../loading/LoadingSkeleton";
import PostFeatureItem from "../post/PostFeatureItem";

const HomeFeatureStyles = styled.div``;
const HomeFeature = () => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const colRef = collection(db, "posts");

        const queries = query(
          colRef,
          where("status", "==", 1),
          where("hot", "==", true),
          limit(5)
        );

        await onSnapshot(queries, (snapshot) => {
          if (snapshot.docs.length > 0) {
            const result = [];
            snapshot.forEach((doc) => {
              result.push({
                id: doc.id,
                ...doc.data(),
              });
            });
            setPosts(result);
            setLoading(false);
          }
        });
      } catch (error) {}
    }
    fetchData();
  }, []);

  useEffect(() => {}, []);
  return (
    <HomeFeatureStyles className="home-block">
      <div className="container">
        <Heading>Featured Posts</Heading>
        <div className="">
          {loading && (
            <Slider {...settings}>
              <LoadingSkeleton
                width="100%"
                height="280px"
                radius="16px"
              ></LoadingSkeleton>
              <LoadingSkeleton
                width="100%"
                height="280px"
                radius="16px"
              ></LoadingSkeleton>
              <LoadingSkeleton
                width="100%"
                height="280px"
                radius="16px"
              ></LoadingSkeleton>
            </Slider>
          )}
          {!loading && (
            <Slider {...settings}>
              {posts.map((post) => (
                <PostFeatureItem key={post.id} data={post}></PostFeatureItem>
              ))}
            </Slider>
          )}
        </div>
      </div>
    </HomeFeatureStyles>
  );
};

export default HomeFeature;
