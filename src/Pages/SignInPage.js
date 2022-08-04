import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import { Field } from "../component/field";
import { Label } from "../component/label";
import { Input } from "../component/input";
import { Button } from "../component/button";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase-config";
import InputPasswordToggle from "../component/input/InputPasswordToggle";
import { toast } from "react-toastify";

const schema = yup
  .object({
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
const SignInPage = () => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });
  const handleSignIn = async (values) => {
    if (!isValid) return;
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      navigate("/");
    } catch (error) {
      if (error.message.includes("wrong-password")) {
        toast.error("It seems your password was wrong");
      }
    }
  };
  useEffect(() => {
    document.title = "Login page";
    if (userInfo?.email) {
      navigate("/");
      document.title = "Home page";
    }
  }, [navigate, userInfo?.email]);
  return (
    <AuthenticationPage>
      <form
        className="form"
        onSubmit={handleSubmit(handleSignIn)}
        autoComplete="off"
      >
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            control={control}
            className="input"
            name="email"
            type="email"
            focusinput={errors?.email && "#c1592e"}
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
          You have not had an account?{" "}
          <NavLink to={"/sign-up"}>Register</NavLink>
        </div>
        <Button
          type="submit"
          style={{ width: 300, margin: "0 auto" }}
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
