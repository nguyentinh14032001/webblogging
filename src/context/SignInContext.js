import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import useLocalStorage from "../hook/useLocalStorage";

const SignInContext = createContext();
function SignInProvider(props) {
  const { storedValue, setValue } = useLocalStorage("emailSignIn", "");
  const [loading, setLoading] = useState(false);
  const { storedValue: user, setValue: setUser } = useLocalStorage("user", "");

  // const storgeUser = (useSignIn)=>{
  //   window.localStorage.setItem(key, JSON.stringify())
  // }

  useEffect(() => {
    async function fetchData() {
      const docRef = query(
        collection(db, "users"),
        where("email", "==", storedValue)
      );
      setLoading(true);
      await onSnapshot(docRef, (snapshot) => {
        snapshot.forEach((doc) => {
          setUser({
            id: doc.id,
            ...doc.data(),
          });
        });
        setLoading(false);
      });
    }
    fetchData();
  }, [storedValue]);
  const values = { user, storedValue, setValue, loading, setUser };
  return (
    <div>
      <SignInContext.Provider
        value={values}
        {...props}
      ></SignInContext.Provider>
    </div>
  );
}
function useSignIn() {
  const context = useContext(SignInContext);
  if (typeof context === "undefined")
    throw new Error("userSignIn must be used within SignInProvider");
  return context;
}
export { SignInProvider, useSignIn };
