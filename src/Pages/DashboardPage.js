import { collection, doc, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import Modal from "react-modal";
import { toast } from "react-toastify";
import Table from "../component/table/Table";
import ActionCheck from "../component/action/ActionCheck";
import { ActionDelete } from "../component/action";
import { postStatus } from "../utils/constants";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const DashboardPage = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const colRef = query(
      collection(db, "posts"),
      where("status", "==", postStatus.PENDING)
    );
    onSnapshot(colRef, (snapshot) => {
      setTotal(snapshot.size);
    });
   onSnapshot(colRef, (snapshot) => {
      if (snapshot.docs.length > 0) {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPosts(result);
        setLoading(false);
      }
    });
  }, [status]);
  console.log(posts);
  const handleUpdateStatus = async(id)=>{

    try {
      
      const colRef = doc(db, "posts", id);
      await updateDoc(colRef, {
       status: postStatus.APPROVED
      });
      toast.success("Update post successfully");
    } catch (error) {
      
    }


  }
  return (
    <>
      <div className="ml-auto mr-5 flex items-center gap-5">
        <span className="relative w-8 cursor-pointer  " onClick={openModal}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            fill="none"
            height="32"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
          <span className="w-5 h-5 top-0 right-0 translate-x-2/4 absolute rounded-full flex items-center justify-center bg-red-400 ">
            {total}
          </span>
        </span>
        <p className=" text-lg font-semibold ">
          Posts are waiting for approval
        </p>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <Table>
          <thead>
            <tr>
              <th>Post</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {total> 0 && posts.length !== 0 &&  posts.map((item)=>(
              <tr>
              <td>
                <div className="flex gap-x-3 items-center">
                  <img
                    src={item?.image}
                    alt=""
                    className="w-[88px] h-[77px] rounded object-cover"
                  />
                  <div className="flex-1 whitespace-pre-wrap">
                    <h3 className="font-semibold text-lg max-w-[400px]">
                     {item.title}
                    </h3>
                  </div>
                </div>
              </td>
              <td>
                <div className="flex items-center text-lg text-gray-500  gap-x-3">
                  <ActionCheck onClick={()=>handleUpdateStatus(item.id)}></ActionCheck>
                  <ActionDelete></ActionDelete>
                </div>
              </td>
            </tr>
            ))}
          </tbody>
        </Table>
      </Modal>
    </>
  );
};

export default DashboardPage;
