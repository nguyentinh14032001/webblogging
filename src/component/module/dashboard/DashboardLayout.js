import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../../context/AuthContext";
import { useSignIn } from "../../../context/SignInContext";
import NotFoundPage from "../../../Pages/NotFoundPage";
import { userRole } from "../../../utils/constants";
import { LoadingSpinner } from "../../loading";

import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import SidebarUser from "./SidebarUser";
const DashboardStyles = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  .dashboard {
    &-heading {
      font-weight: bold;
      font-size: 25px;
      margin-bottom: 5px;
      color: ${(props) => props.theme.black};
    }
    &-short-desc {
      font-size: 14px;
      color: ${(props) => props.theme.gray80};
    }
    &-main {
      display: grid;
      grid-template-columns: 300px minmax(0, 1fr);
      padding: 40px 20px;
      gap: 0 40px;
      align-items: start;
    }
  }
`;

const DashboardLayout = () => {
  const { userInfo } = useAuth();

  const { user, loading } = useSignIn();
  if (user.length <= 0 ) return <NotFoundPage></NotFoundPage>;

  return (
    <DashboardStyles>
      <DashboardHeader></DashboardHeader>
      {loading && (
        <div className="flex items-center w-full h-[100vh] justify-center ">
          <LoadingSpinner
            size="70px"
            borderSize="8px"
            type="primary"
          ></LoadingSpinner>
        </div>
      )}
      {!loading && user && (
        <div className="dashboard-main">
          {user?.role === userRole.ADMIN ? (
            <Sidebar></Sidebar>
          ) : (
            <SidebarUser></SidebarUser>
          )}
          <div className="dashboard-children">
            <Outlet></Outlet>
          </div>
        </div>
      )}
    </DashboardStyles>
  );
};

export default DashboardLayout;
