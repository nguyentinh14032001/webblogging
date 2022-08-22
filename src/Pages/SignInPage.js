import React, { createContext, useEffect, useState } from "react";
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
import { auth, db } from "../firebase/firebase-config";
import InputPasswordToggle from "../component/input/InputPasswordToggle";
import { toast } from "react-toastify";
import { useSignIn } from "../context/SignInContext";
import { collection, onSnapshot, query, where } from "firebase/firestore";

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
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();

  const {  setValue, user } = useSignIn();

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, errors },
  } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

  async function Login(email, password) {
    
    
  }
  const handleSignIn = async (values) => {
    if (!isValid) return;
    // try {
    //   await signInWithEmailAndPassword(auth, values.email, values.password);
    //  setValue(values.email);
    //   navigate("/");
    // } catch (error) {
    //   if (error.message.includes("wrong-password")) {
    //     toast.error("It seems your password was wrong");
    //   }
    // }
    setLoading(true)
    async function Login(){
      const docRef = query(collection(db, "users"), where("email", "==", values.email));
      await onSnapshot(docRef, (snapshot) => {
        setLoading(false)
        if (snapshot.docs.length > 0) {
          snapshot.forEach((doc) => {
            if (doc.data().password === values.password) {
              setValue(values.email);
              navigate("/");
            } else {
              toast.error("It seems your password was wrong");
            }
          });
        } else {
          toast.error("Email does not exist");
        }
      });
    }
     Login();
   
  };
  useEffect(() => {
    document.title = "Login page";
    if (user?.email) {
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
          isLoading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};
//  export function SignInProvider (props) {

//   const values = {user};

//   return (
//     <div>
//       <SignInContext.Provider
//         value={values}
//         {...props}
//       ></SignInContext.Provider>
//     </div>
//   );
// };
export default SignInPage;
