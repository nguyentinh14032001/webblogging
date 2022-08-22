import React, { useEffect } from "react";
import { Input } from "../component/input";
import { Label } from "../component/label";
import { useForm } from "react-hook-form";
import { Field } from "../component/field";
import { Button } from "../component/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import * as yup from "yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import { NavLink, useNavigate } from "react-router-dom";
import InputPasswordToggle from "../component/input/InputPasswordToggle";
import slugify from "slugify";
import { userRole, userStatus } from "../utils/constants";

const schema = yup
  .object({
    fullName: yup.string().required("Please enter your fullname"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 scharacter ")
      .required("Please enter your password"),
  })
  .required();

const SignUpPage = () => {
  const navigate = useNavigate();
  document.title = "Register";
  const {
    control,
    setFocus,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  // const registerUser= async (email)=>{
  //   const colRef = collection(db, "users");
  //   const querySnapshot = await getDocs(colRef);
  //   querySnapshot.forEach((doc) => {
  //       if(doc.data().email=== email){
  //       }
  //   });
  // }
  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      // await createUserWithEmailAndPassword(auth, values.email, values.password);
      // await updateProfile(auth.currentUser, {
      //   displayName: values.fullName.trim(),
      //   photoURL:
      //     "https://firebasestorage.googleapis.com/v0/b/monkey-blogging-ae51f.appspot.com/o/images%2Famr-taha-ooW0zaLV4Ow-unsplash.jpg?alt=media&token=40e61f6d-96c6-4e10-ae2d-d926aff84ebc",
      // });
      const colRef = collection(db, "users");
      await addDoc(colRef, {
        fullname: values.fullName.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        username: slugify(values.fullName, { lower: true }),
        avatar:
          "https://firebasestorage.googleapis.com/v0/b/monkey-blogging-ae51f.appspot.com/o/images%2Famr-taha-ooW0zaLV4Ow-unsplash.jpg?alt=media&token=40e61f6d-96c6-4e10-ae2d-d926aff84ebc",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: serverTimestamp(),
      });
      toast.success("Regiter successfully!!!", {
        pauseOnHover: false,
        delay: 100,
      });
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    }
  };

  // useEffect(() => {
  //   const arrErrors = Object.values(errors);
  //   if (arrErrors.length > 0) {
  //     toast.error(arrErrors[0]?.message, {
  //       pauseOnHover: false,
  //       delay: 100,
  //     });
  //   }
  // }, [errors]);
  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignUp)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="fullName">Fullname</Label>
          <Input
            control={control}
            type="text"
            focusinput={errors?.fullName && "#c1592e"}
            name="fullName"
            className="input"
            placeholder="Enter your fullname"
          ></Input>
          {errors?.fullName && (
            <div style={{ color: "#c1592e", fontWeight: "500" }}>
              {errors.fullName.message}
            </div>
          )}
        </Field>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            control={control}
            type="email"
            name="email"
            focusinput={errors?.email && "#c1592e"}
            className="input"
            placeholder="Enter your email"
          ></Input>
          {errors?.email && (
            <div style={{ color: "#c1592e", fontWeight: "500" }}>
              {errors.email.message}
            </div>
          )}
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle
            control={control}
            errors={errors}
          ></InputPasswordToggle>
          {errors?.password && (
            <div style={{ color: "#c1592e", fontWeight: "500" }}>
              {errors.password.message}
            </div>
          )}
        </Field>
        <div className="have-account">
          You already have an account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Button
          style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
          type="submit"
        >
          Sign up
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignUpPage;
