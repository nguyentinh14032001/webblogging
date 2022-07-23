import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";

export default function useFireBaseImage(setValue, getValues) {
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");

  if(!setValue || !getValues) return;
  
  //upload image
  function handleUploadImage(file) {
    const storage = getStorage();
    const storageRef = ref(storage, "images/" + getValues("image_name"));
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            console.log("nothing at all");
        }
      },
      (error) => {
        console.log("error");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImage(downloadURL);
        });
      }
    );
  }

  //select image
  const handleSelecteImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(file);
    setValue("image_name", file.name);
    console.log(file.name);
    handleUploadImage(file);
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues("image_name"));
    deleteObject(imageRef)
      .then(() => {
        console.log("Remove image successfully");
        setImage("");
        setProgress(0);
      })
      .catch((error) => {
        console.log("can not delete image");
      });
  };
  const handleResetUpload = ()=>{
    setImage("");
    setProgress(0);
  }
  return {
    image,
    progress,
    handleSelecteImage,
    handleDeleteImage,
    handleResetUpload,

  };
}
