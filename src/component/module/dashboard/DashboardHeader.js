import React from "react";
import styled from "styled-components";
import { Button } from "../../button";
const DashboardHeaderStyles = styled.div`
  background-color: white;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #eee;
  gap: 20px;
  .header-avatar {
    width: 52px;
    height: 52px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 100rem;
    }
  }
`;
const DashboardHeader = () => {
  return (
    <DashboardHeaderStyles>
      <Button to="/dashboard" className="header-button" height="52px">
        Write new post
      </Button>
      <div className="header-avatar">
        <img
          src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t39.30808-6/272865576_1026501861233390_6672108800918033642_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=KzK10CiuO98AX9DMie-&tn=ZTHW_0A2NPQGiVlz&_nc_ht=scontent.fsgn2-6.fna&oh=00_AT8pFw4JNC0UQVtFKEXOTNVrYWfddOkOlyQPMdcWlzRMiw&oe=62D719DD"
          alt=""
        />
      </div>
    </DashboardHeaderStyles>
  );
};

export default DashboardHeader;
