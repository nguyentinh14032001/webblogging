
import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase-config";
const AuthContext = createContext();

function AuthProvider(props){
  const [userInfo, setUserInfo]= useState({})
  const values ={userInfo, setUserInfo}
  useEffect(()=>{
    console.log(auth);
    onAuthStateChanged(auth,(currentUser)=>{
      setUserInfo(currentUser);
    })
  },[])
  return <AuthContext.Provider value={values} {...props} ></AuthContext.Provider>
}
function useAuth(){
  const context =useContext(AuthContext);
  if(typeof context === "undefined") throw new Error("useAuth must be used within AuthProvider")
  return context;
}
export {useAuth, AuthProvider}