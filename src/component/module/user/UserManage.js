import React from "react";
import { Button } from "../../button";
import DashboardHeading from "../dashboard/DashboardHeading";
import OverviewTable from "./OverviewTable";

const UserManage = () => {
  // const [user, setUserAdmin] = useState("");
  // const { userInfo } = useAuth();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const docRef = doc(db, "users", userInfo.uid);
  //     const docSnapshot = await getDoc(docRef);
  //     docSnapshot.data() && setUserAdmin(docSnapshot.data());
  //   };
  //   fetchData();
  // }, [userInfo]);
  // if(user.role !== userRole.ADMIN) return <NotFoundPage></NotFoundPage>

  return (
    <div>
      <DashboardHeading
        title="Users"
        desc="Manage your user"
      ></DashboardHeading>
      <div className="flex justify-end mb-10">
        <Button kind="ghost" to="/manage/add-user">
          Add new user
        </Button>
      </div>
      <OverviewTable></OverviewTable>
    </div>
  );
};

export default UserManage;
