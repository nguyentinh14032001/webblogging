import React, { useState } from "react";
import styled from "styled-components";
import { Field } from "../../field";
import { Label } from "../../label";
import Radio from "../../checkbox/Radio";
import { useForm } from "react-hook-form";
import { Input } from "../../input";
import { Button } from "../../button";
import { Dropdown } from "../../dropdown";
import slugify from "slugify";
import { postStatus } from "../../../utils/constants";
import { addDoc, collection } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import ImageUpload from "../../image/ImageUpload";
import { db } from "../../../firebase/firebase-config";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { control, watch, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      category: "",
      id: "",
    },
  });
  const watchStatus = watch("status");
  const addPostHandler = async (values) => {
    const cloneValues = { ...values };
    cloneValues.slug = slugify(values.slug || values.title);
    cloneValues.status = Number(values.status);
    const colRef = collection(db, "posts");
    //add post
    await addDoc(colRef, {
      image: image,
    });
  };
  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState("");
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
  const onSelecteImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(file);
    setValue("image_name", file.name);
    console.log(file.name);
    handleUploadImage(file);
  };
  const handleDeleteImage = () => {
    const storage = getStorage();
    const imageRef = ref(storage, "images/" + getValues('image_name'));
    deleteObject(imageRef)
      .then(() => {
        console.log("Remove image successfully");
        setImage('')
        setProgress(0)
      })
      .catch((error) => {
        console.log("can not delete image");
      });
  };
  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              required
            ></Input>
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              onChange={onSelecteImage}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                checked={Number(watchStatus) === postStatus.APPROVED}
                control={control}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
          <Field>
            <Label htmlFor="author">Author</Label>
            <Input
              name="author"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Category</Label>
            <Dropdown placeholder="Please select an option">
              <Dropdown.Option>Knowledge</Dropdown.Option>
              <Dropdown.Option>Blockchain</Dropdown.Option>
              <Dropdown.Option>Setup</Dropdown.Option>
              <Dropdown.Option>Nature</Dropdown.Option>
              <Dropdown.Option>Developer</Dropdown.Option>
            </Dropdown>
          </Field>
        </div>
        <Button type="submit" className="mx-auto">
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
