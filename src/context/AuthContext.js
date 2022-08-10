import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
const AuthContext = createContext();

function AuthProvider(props) {
  const [userInfo, setUserInfo] = useState({});
  const [docUser, setDocUser] = useState("");


  const values = { userInfo, setUserInfo, docUser };
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
    });
  }, []);
  // useEffect(() => {
  //   async function fetchData() {
  //     if (!userInfo?.uid) return;
  //     const docRef = doc(db, "users", userInfo?.uid);
  //     const docSnapshot = await getDoc(docRef);
  //     setDocUser(docSnapshot?.data());
  //   }
  //   fetchData();
  // }, [userInfo?.uid]);
  useEffect(() => {
    async function fetchData() {
      if (!userInfo?.email) return;
      const colRef = collection(db, "users");
      const queries = query(colRef, where("email", "==", userInfo?.email));
      onSnapshot(queries, (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setDocUser(result);
      });
    }
    fetchData();
  }, [userInfo?.email]);

  return (
    <AuthContext.Provider value={values} {...props}></AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (typeof context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { useAuth, AuthProvider };
