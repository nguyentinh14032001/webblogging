import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import NotFoundPage from "../../Pages/NotFoundPage";

const AuthorBox = ({ userId = "" }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", userId);
      const docSnapshot = await getDoc(docRef);
      docSnapshot.data() && setUser(docSnapshot.data());
    }
    fetchData();
  }, [userId]);
  console.log(user);
  if (!userId || !user.email) return null;

  return (
    <div className="author">
      <div className="author-image">
        <img src={user?.avatar} alt="" />
      </div>
      <div className="author-content">
        <h3 className="author-name">{user?.fullname}</h3>
        <p className="author-desc">{user?.description || ""}</p>
      </div>
    </div>
  );
};

export default AuthorBox;