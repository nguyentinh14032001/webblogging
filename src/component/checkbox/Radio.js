import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...props }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        type="radio"
        checked={checked}
        className="hidden-input"
        {...field}
        {...props}
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`w-7 h-7 rounded-full ${
            checked ? " bg-purple-700 " : "bg-gray-200"
          }`}
        ></div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
