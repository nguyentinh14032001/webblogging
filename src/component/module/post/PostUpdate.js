import { async } from "@firebase/util";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { db } from "../../../firebase/firebase-config";
import useFireBaseImage from "../../../hook/useFirebaseImage";
import { postStatus } from "../../../utils/constants";
import { Button } from "../../button";
import { Radio, Toggle } from "../../checkbox";
import { Dropdown } from "../../dropdown";
import ReactQuill, { Quill } from "react-quill";
import { Field } from "../../field";
import ImageUpload from "../../image/ImageUpload";
import { Input } from "../../input";
import { Label } from "../../label";
import DashboardHeading from "../dashboard/DashboardHeading";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import { toast } from "react-toastify";
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

Quill.register("modules/imageUploader", ImageUploader);

const PostUpdate = () => {
  const [params] = useSearchParams();
  const postId = params.get("id");
  const {
    control,
    watch,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      categoryId: "",
      hot: false,
      image: "",
      category: {},
      user: {},
    },
  });

  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState("");
  const [selectcategory, setSelectCategory] = useState("");
  const watchHot = watch("hot");
  const watchStatus = watch("status");
  const UpdatePostHandler = async (values) => {
    if (!isValid) return;
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      ...values,
      image,
      content,
    });
    toast.success("Update post successfully");
   
  };
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
  useEffect(() => {
    async function fetchData() {
      if (!postId) return;
      const docRef = doc(db, "posts", postId);
      const docSnapShot = await getDoc(docRef);
      if (docSnapShot.data()) {
        reset({
          ...docSnapShot.data(),
        });
        setSelectCategory(docSnapShot.data()?.category || "");
        setContent(docSnapShot.data()?.content || "");
      }
    }
    fetchData();
  }, [postId, reset]);
  const imageUrl = getValues("image");
  const imageRegex = /%2F(\S+)\?/gm.exec(imageUrl);
  const imageName = imageRegex?.length > 0 ? imageRegex[1] : "";
  const {
    image,
    setImage,
    progress,
    handleSelecteImage,
    handleDeleteImage,
  } = useFireBaseImage(setValue, getValues, imageName, deletePostImage);
  //delete Avatar
  async function deletePostImage() {
    const colRef = doc(db, "posts", postId);
    await updateDoc(colRef, {
      image: "",
    });
  }
  useEffect(() => {
    setImage(imageUrl);
  }, [imageUrl, setImage]);

  async function handleClickOption(item) {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  }
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],

      // imageUploader: {
      //   upload: async (file) => {
      //     const bodyFormData = new FormData();
      //     bodyFormData.append("image", file);
      //     const response = await axios({
      //       method: "post",
      //       url: "https://api.imgbb.com/1/upload?key=6ee3d82cea2a8c77aee10bbe49f0ae6e",
      //       data: bodyFormData,
      //       headers: {
      //         "content-Type": "multipart/form-data",
      //       },
      //     });
      //     return response.data.data.url;
      //   },
      // },
    }),
    []
  );
  //6ee3d82cea2a8c77aee10bbe49f0ae6e
  if (!postId) return;
  return (
    <>
      <DashboardHeading
        title="Update post"
        desc="Update post content"
      ></DashboardHeading>

      <form onSubmit={handleSubmit(UpdatePostHandler)}>
        <div className="form-layout">
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
        <div className="form-layout">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              handleDeleteImage={handleDeleteImage}
              progress={progress}
              onChange={handleSelecteImage}
              image={image}
              className="h-[250px]"
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
        <div>
          <Field>
            <Label>Content</Label>
            <div className="w-full entry-content">
              <ReactQuill
                modules={modules}
                theme="snow"
                value={content}
                onChange={setContent}
              />
            </div>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature Post</Label>
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
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mx-auto"
        >
          Update post
        </Button>
      </form>
    </>
  );
};

export default PostUpdate;
