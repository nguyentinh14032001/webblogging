import React, { Fragment, useState } from "react";
import { IconEyeClose, IconEyeOpen } from "../icon";
import Input from "./Input";

const InputPasswordToggle = ({control, errors}) => {
  const [togglePassword, setTogglePassword] = useState(false)

  if (!control) return null;
  return (
    <Fragment>
      <Input
        control={control}
        type={togglePassword ? "text" : "password"}
        name="password"
        focusinput={errors?.password && "#c1592e"}
        className="input"
        placeholder="Enter your password"
      >
        {!togglePassword ? (
          <IconEyeClose onClick={() => setTogglePassword(true)}></IconEyeClose>
        ) : (
          <IconEyeOpen onClick={() => setTogglePassword(false)}></IconEyeOpen>
        )}
      </Input>
    </Fragment>
  );
};

export default InputPasswordToggle;
