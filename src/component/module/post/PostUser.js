import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignIn } from "../../../context/SignInContext";
import { db } from "../../../firebase/firebase-config";
import NotFoundPage from "../../../Pages/NotFoundPage";
import { postStatus } from "../../../utils/constants";
import { ActionDelete, ActionEdit, ActionView } from "../../action";
import { LabelStatus } from "../../label";
import { Table } from "../../table";
import DashboardHeading from "../dashboard/DashboardHeading";
const POST_PER_PAGE = 1;
const PostUser = () => {
  const [postlist, setPostlist] = useState([]);
  const [filter, setFilter] = useState("");
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const { user } = useSignIn();
  const renderPostStatus = (status) => {
    switch (status) {
      case postStatus.APPROVED:
        return <LabelStatus type="success">Approved</LabelStatus>;
      case postStatus.PENDING:
        return <LabelStatus type="warning">Pendding</LabelStatus>;
      case postStatus.REJECTED:
        return <LabelStatus type="danger">Rejectd</LabelStatus>;
      default:
        break;
    }
  };
  useEffect(() => {
    async function fetchData() {
      //const colRef = collection(db, "posts");
      const docRef = query(
        collection(db, "posts"),
        where("user.email", "==", user?.email)
      );
      onSnapshot(docRef, (snapshot) => {
        const results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostlist(results);
      });
    }
    fetchData();
  }, []);
  console.log(postlist);
  return (
    <div>
      <DashboardHeading
        title={`All posts by ${user?.fullname}`}
        desc="Manage your post"
      ></DashboardHeading>
      <div className="mb-10 flex justify-end ">
        <div className="w-full  max-w-[300px]">
          <input
            type="text"
            className=" w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {postlist.length > 0 &&
            postlist.map((post) => (
              <tr key={post.id}>
                <td></td>
                <td>{post?.id?.slice(0, 5) + "...."}</td>
                <td>
                  <div className="flex gap-x-3 items-center">
                    <img
                      src={post.image}
                      alt=""
                      className="w-[66px] h-[55px] rounded object-cover"
                    />
                    <div className="flex-1 whitespace-pre-wrap">
                      <h3 className="font-semibold max-w-[300px]">
                        {post.title}
                      </h3>
                      <time className="text-sm text-gray-500">
                        Date:{" "}
                        {new Date(
                          post.createdAt?.seconds * 1000
                        ).toLocaleDateString("vi-VI")}
                      </time>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-gray-500">{post.category?.name}</span>
                </td>
                <td>
                  <span className="text-gray-500">{post.user?.fullname}</span>
                </td>
                <td>{renderPostStatus(post.status)}</td>
                <td>
                  <div className="flex items-center  text-gray-500  gap-x-3">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                     navigate( `/manage/update-post?id=${post?.id}`) 
                      }
                    ></ActionEdit>
                    <ActionDelete
                    // onClick={() => handleDeletePost(post?.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PostUser;
