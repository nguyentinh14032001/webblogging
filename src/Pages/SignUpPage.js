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
import { doc, setDoc } from "firebase/firestore";
import AuthenticationPage from "./AuthenticationPage";
import { NavLink } from "react-router-dom";
import InputPasswordToggle from "../component/input/InputPasswordToggle";
import slugify from "slugify";
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
  const handleSignUp = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      await updateProfile(auth.currentUser, {
        displayName: values.fullName,
      });
      await setDoc(doc(db, "users", auth.currentUser.uid), {
        fullname: values.fullName,
        email: values.email,
        password: values.password,
        user: slugify(values.fullName, { lower: true }),
      });
      toast.success("Regiter successfully");
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
