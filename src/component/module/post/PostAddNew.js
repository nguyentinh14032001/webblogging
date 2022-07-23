import React, { useEffect, useState } from "react";
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
import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import ImageUpload from "../../image/ImageUpload";
import { db } from "../../../firebase/firebase-config";
import useFireBaseImage from "../../../hook/useFirebaseImage";
import Toggle from "../../checkbox/Toggle";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const PostAddNewStyles = styled.div``;
const PostAddNew = () => {
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectcategory, setSelectCategory] = useState("");

  const { control, watch, reset, handleSubmit, setValue, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: "",
    },
  });
  //hookFireBaseImage
  const {
    image,
    handleResetUpload,
    progress,
    handleSelecteImage,
    handleDeleteImage,
  } = useFireBaseImage(setValue, getValues);
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const watchTitle = watch("title");
  console.log("title", watchStatus);
  //add posts
  const addPostHandler = async (values) => {
    setLoading(true);
    try {
      console.log(values);
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || values.title, { lower: true });
      cloneValues.title = values.title.toLowerCase();
      cloneValues.status = Number(values.status);
      const colRef = collection(db, "posts");
      //add post
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: userInfo.uid,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new post successfully!");
      reset({
        title: "",
        slug: "",
        status: 2,
        categoryId: "",
        idUser: "",
        hot: false,
        image: "",
      });
      setSelectCategory(null);
      handleResetUpload();
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  //get data categories
  useEffect(() => {
    let postCategories = [];
    async function getData() {
      const colRef = collection(db, "categories");
      const q = query(colRef, where("status", "==", 1));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        postCategories.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(postCategories);
    }
    getData();
  }, []);

  //select Category
  function handleClickOption(item) {
    setValue("categoryId", item.id);
    setSelectCategory(item);
  }

  useEffect(() => {
    document.title = "Superb Blogging - Add new post";
  }, []);
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
              onChange={handleSelecteImage}
              image={image}
            ></ImageUpload>
          </Field>
          <Field>
            <Label>Category</Label>
            <Dropdown>
              <Dropdown.Select placeholder="Select the category"></Dropdown.Select>
              <Dropdown.List>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <Dropdown.Option
                      key={item.id}
                      onClick={() => handleClickOption(item)}
                    >
                      {item.name}
                    </Dropdown.Option>
                  ))}
              </Dropdown.List>
            </Dropdown>
            {selectcategory?.name && (
              <span className="inline-block p-3 rounded-lg  bg-purple-50 text-sm font-semibold text-purple-800 font-s ">
                {selectcategory?.name}
              </span>
            )}
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label> Feature Post</Label>
            <Toggle
              on={watchHot}
              onClick={() => {
                setValue("hot", !watchHot);
              }}
            ></Toggle>
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
        </div>
        <Button
          type="submit"
          style={{ width: "100%", maxWidth: 250, margin: "0 auto" }}
          isLoading={loading}
          disabled={loading}
          className="mx-auto"
        >
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
