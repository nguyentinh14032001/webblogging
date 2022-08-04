
import React, { useState } from "react";
import { Button } from "../../button";
import { Table } from "../../table";
import DashboardHeading from "../dashboard/DashboardHeading";
import OverviewTable from "./OverviewTable";

const UserManage = () => {

  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">Add new user</Button>
      </div>
     <OverviewTable></OverviewTable>
    </div>
  );
};

export default UserManage;
