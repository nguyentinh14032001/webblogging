import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase/firebase-config';





const UserComment = ({data=""}) => {
  
  const [userComment, setUserComment] = useState([]);
 
  useEffect(() => {
    async function fetchData() {
      const docRef = doc(db, "users", data?.user);
      const docSnapshot = await getDoc(docRef);
      docSnapshot.data() && setUserComment(docSnapshot.data());
    }
    fetchData();
  }, [data?.user]);
  function timeSince(date) {
    //thời gian hiện tại trừ cho thời gian nhập vào
    const now = new Date();
   
    const yourDate = new Date(date);
    const newTime = Math.floor((now.getTime() - yourDate.getTime()) / 1000);
   
    if (newTime < 0) {
      alert("your time is invalid");
    }
    let timer = newTime / 31536000;
    if (timer > 1) {
      return(`${Math.floor(timer)} năm trước`);
    
    }
    timer = newTime / 2678400;
    if (timer > 1) {
      return(`${Math.floor(timer)} tháng trước`);
     
    }
    timer = newTime / 604800;
    if (timer > 1) {
      return(`${Math.floor(timer)} tuần trước`);
      
    }
    timer = newTime / 86400;
    if (timer > 1) {
      return(`${Math.floor(timer)} ngày trước`);
      
    }
    timer = newTime / 3600;
    if (timer > 1) {
      return(`${Math.floor(timer)} giờ trước`);
      
    }
    timer = newTime / 60;
    if (timer > 1) {
      return(`${Math.floor(timer)} phút trước`);
      
    }
    timer = newTime;
    if (timer > 1) {
      return(`${Math.floor(timer)} giây trước`);
    }
    
  }
  return (
    <>

    <img src={userComment?.avatar} alt="" className="w-10 h-10 object-cover rounded-full" />
    <div className="flex flex-col px-4 py-2 rounded-lg gap-y-2 bg-[#F3EDFF]">
          <strong>{userComment?.fullname}</strong>
          <p>{data?.cmt}</p>
          <p className=' text-sm font-semibold text-gray-400 '>{timeSince(data.createdAt.seconds*1000)}</p> 
        </div>
        
    </>
  );
};

export default UserComment;