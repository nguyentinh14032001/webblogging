import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Field } from "../../field";
import { Label } from "../../label";
import Radio from "../../checkbox/Radio";
import { useForm } from "react-hook-form";
import { Input } from "../../input";
import { Button } from "../../button";
import { Dropdown } from "../../dropdown";
import slugify from "slugify";
import { postStatus, userRole } from "../../../utils/constants";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import ImageUpload from "../../image/ImageUpload";
import { db } from "../../../firebase/firebase-config";
import useFireBaseImage from "../../../hook/useFirebaseImage";
import Toggle from "../../checkbox/Toggle";
import { toast } from "react-toastify";
import DashboardHeading from "../dashboard/DashboardHeading";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSignIn } from "../../../context/SignInContext";
import ReactQuill from "react-quill";
import axios from "axios";

const schema = yup
  .object({
    title: yup.string().required("Please enter your title"),
    slug: yup.string().required("Please enter your slug"),
  })
  .required();
const PostAddNewStyles = styled.div``;

const PostAddNew = () => {
  const {
    control,
    watch,
    reset,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      status: 2,
      hot: false,
      image: "",
      category: {},
      user: {},
    },
    resolver: yupResolver(schema),
  });

  const { user } = useSignIn();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectcategory, setSelectCategory] = useState("");
  const [isExistsSlug, setIsExistsSlug] = useState(false);
  const [content, setContent] = useState("");
  //getuser
  useEffect(() => {
    async function fetchUserData() {
      if (!user.email) return;
      const q = query(
        collection(db, "users"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setValue("user", {
          id: doc.id,
          ...doc.data(),
        });
      });
    }
    fetchUserData();
  }, [setValue, user.email]);
  useEffect(() => {}, []);

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
  const validationSlug = async (slug) => {
    const colRef = collection(db, "posts");
    const q = query(colRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length > 0) {
      return true;
    }
    return false;
  };
  //add posts
  const addPostHandler = async (values) => {
    setLoading(true);
    validationSlug(values.slug);
    const isSlug = await validationSlug(values.slug);
    setIsExistsSlug(isSlug);

    if (!isSlug) {
      try {
        const cloneValues = { ...values };
        cloneValues.slug = slugify(values.slug || values.title, {
          lower: true,
        });
        cloneValues.status = Number(values.status);
        const colRef = collection(db, "posts");
        //add post
        await addDoc(colRef, {
          ...cloneValues,
          content,
          image,
          createdAt: serverTimestamp(),
        });
        toast.success("Create new post successfully!");
        reset({
          title: "",
          slug: "",
          status: 2,
          idUser: "",
          hot: false,
          image: "",
          category: {},
          user: {},
        });
        setSelectCategory(null);
        handleResetUpload();
      } catch (error) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
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
  async function handleClickOption(item) {
    const colRef = doc(db, "categories", item.id);
    const docData = await getDoc(colRef);
    setValue("category", {
      id: docData.id,
      ...docData.data(),
    });
    setSelectCategory(item);
  }
  useEffect(() => {
    document.title = "Superb Blogging - Add new post";
  }, []);
  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], 
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["link", "image"],
      ],
      imageUploader: {
        upload: async (file) => {
          const bodyFormData = new FormData();
          bodyFormData.append("file", file);
          bodyFormData.append("upload_preset", "cck4hgk7");
          console.log(file);
          //await handleUploadImageContent(file)
          const response = await axios({
            method: "post",
            url: "https://api.cloudinary.com/v1_1/nguyentinh14032001/image/upload",
            data: bodyFormData,
            headers: {
              "content-Type": "multipart/form-data",
            },
          });
          return response.data.url       
        },
      },
    }),
    []
  );

  return (
    <PostAddNewStyles>
      <DashboardHeading title="Add post" desc="Add new post"></DashboardHeading>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="form-layout">
          <Field>
            <Label htmlFor="title">Title</Label>
            <Input
              control={control}
              placeholder="Enter your title"
              name="title"
              focusinput={errors?.title && "#c1592e"}
            ></Input>
            {errors?.title && (
              <div style={{ color: "#c1592e", fontWeight: "500" }}>
                {errors.title.message}
              </div>
            )}
          </Field>
          <Field>
            <Label htmlFor="slug">Slug</Label>
            <Input
              control={control}
              placeholder="Enter your slug"
              name="slug"
              focusinput={(errors?.slug || isExistsSlug) && "#c1592e"}
            ></Input>
            {errors?.slug && (
              <div style={{ color: "#c1592e", fontWeight: "500" }}>
                {errors.slug.message}
              </div>
            )}
            {isExistsSlug && (
              <div style={{ color: "#c1592e", fontWeight: "500" }}>
                <p>Slug already exists</p>
              </div>
            )}
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
        {user?.role === userRole.ADMIN && (
          <div className="form-layout">
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
        )}
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
