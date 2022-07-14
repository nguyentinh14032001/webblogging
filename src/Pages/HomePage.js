import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";
import Layout from "../component/layout/Layout";
import HomeBanner from "../component/module/home/HomeBanner";
import HomeFeature from "../component/module/home/HomeFeature";
import HomeNewest from "../component/module/home/HomeNewest";


import { auth } from "../firebase/firebase-config";

const handleSignOut = () => {
  signOut(auth);
};
const HomePageStyles = styled.div``;
const HomePage = () => {
  return (
    <HomePageStyles>
      <Layout>
      <HomeBanner></HomeBanner>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
