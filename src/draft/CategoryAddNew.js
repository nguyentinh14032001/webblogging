import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../component/button";
import Radio from "../component/checkbox/Radio";
import { Field } from "../component/field";
import { Input } from "../component/input";
import { Label } from "../component/label";
import DashboardHeading from "../component/module/dashboard/DashboardHeading";

const CategoryAddNew = () => {
  const {
    control,
    setValue,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
  });
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form>
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              control={control}
              name="slug"
              placeholder="Enter your slug"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio name="status" control={control} checked={true}>
                Approved
              </Radio>
              <Radio name="status" control={control}>
                Unapproved
              </Radio>
            </div>
            
          </Field>
        </div>
        <Button kind="primary" className="mx-auto">
              Add new category
            </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
