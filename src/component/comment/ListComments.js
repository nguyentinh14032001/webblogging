import { collection, limit, onSnapshot, orderBy, query, where } from "firebase/firestore";
import React, {  useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import UserComment from "./UserComment";

const ListComments = ({ postId = "" }) => {
  const [commentList, setCommentList] = useState([]);
  //get comments
  useEffect(() => {
    async function fetchData() {
      
      const colRef = query(
         collection(db, "comments"),
        where("post", "==", postId));
      onSnapshot(colRef, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setCommentList(results);
      });
    }
    fetchData();
  }, []);
  console.log(commentList);
 const commentListClone = commentList.sort(function(a,b){
  return -a.createdAt.seconds + b.createdAt.seconds ;
 } )

  return (
    commentListClone.length > 0 && commentListClone.map((data)=>(
      <div className="flex gap-x-4 mb-5">
        <UserComment data={data}></UserComment>
      </div>
    ))
  );
};
export default ListComments;
