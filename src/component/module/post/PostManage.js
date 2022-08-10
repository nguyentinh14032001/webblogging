import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../../../firebase/firebase-config";
import { postStatus } from "../../../utils/constants";
import { ActionDelete, ActionEdit, ActionView } from "../../action";
import { Button } from "../../button";
import { LabelStatus } from "../../label";
import Table from "../../table/Table";
import DashboardHeading from "../dashboard/DashboardHeading";
const POST_PER_PAGE = 1;
const PostManage = () => {
  const navigate = useNavigate();
  const [postlist, setPostlist] = useState([]);
  const [filter, setFilter] = useState("");
  const [lastDoc, setLastDoc] = useState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const colRef = collection(db, "posts");
      onSnapshot(colRef, (snapshot) => {
        setTotal(snapshot.size);
      });
      const newRef = filter
        ? query(
            colRef,
            where("title", ">=", filter),
            where("title", "<=", filter + "utf8")
          )
        : query(colRef, limit(POST_PER_PAGE));
      const documentSnapshots = await getDocs(newRef);

      //get last doc
      const lastVisible =
        documentSnapshots.docs[documentSnapshots.docs.length - 1];
      onSnapshot(newRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPostlist(results);
      });
      setLastDoc(lastVisible);
    }
    fetchData();
  }, [filter]);

  async function handleDeletePost(postId) {
    const docRef = doc(db, "posts", postId);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docRef);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
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
  const handleOnChange = debounce((e) => {
    setFilter(e.target.value);
  }, 250);

  const handleLoadMorePost = async () => {
    const nextRef = query(
      collection(db, "posts"),
      startAfter(lastDoc || 0),
      limit(2)
    );
    onSnapshot(nextRef, (snapshot) => {
      let results = [];
      snapshot.forEach((doc) => {
        results.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPostlist([...postlist, ...results]);
    });
    //get first doc
    const documentSnapshots = await getDocs(nextRef);

    //get last doc
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1];
    setLastDoc(lastVisible);
  };
  return (
    <div>
      <DashboardHeading
        title="All Posts"
        desc="Manage your post"
      ></DashboardHeading>
      <div className="mb-10 flex justify-end ">
        <div className="w-full  max-w-[300px]">
          <input
            type="text"
            onChange={handleOnChange}
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
                  <span className="text-gray-500">{post.user?.username}</span>
                </td>
                <td>{renderPostStatus(post.status)}</td>
                <td>
                  <div className="flex items-center  text-gray-500  gap-x-3">
                    <ActionView
                      onClick={() => navigate(`/${post.slug}`)}
                    ></ActionView>
                    <ActionEdit
                      onClick={() =>
                        navigate(`/manage/update-post?id=${post?.id}`)
                      }
                    ></ActionEdit>
                    <ActionDelete
                      onClick={() => handleDeletePost(post?.id)}
                    ></ActionDelete>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      {total > postlist.length && (
        <div className="mt-10 text-center ">
          <Button
            className="w-[200px] mx-auto"
            onClick={handleLoadMorePost}
            type="button"
            kind="ghost"
          >
            Load more
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostManage;
