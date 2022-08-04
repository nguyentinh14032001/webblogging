import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { db } from "../../../firebase/firebase-config";

import { Button } from "../../button";
import Radio from "../../checkbox/Radio";
import { Field, FieldCheckboxes } from "../../field";
import { Input } from "../../input";
import { Label } from "../../label";
import DashboardHeading from "../dashboard/DashboardHeading";
import { toast } from "react-toastify";
import RemoveVietnameseTones from "../../../draft/RemoveVietnameseTones";
import { categoryStatus } from "../../../utils/constants";

const CategoryAddNew = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const handleAddNewCategory = async (values) => {
    if (!isValid) return;
    try {
      const cloneValues = { ...values };
      const removeNameTones = RemoveVietnameseTones(values.name);
      const removeSlugTones = RemoveVietnameseTones(values.slug);
      cloneValues.status = Number(values.status);
      cloneValues.slug = slugify(removeSlugTones || removeNameTones , {
        lower: true,
      });
      const colRef = collection(db, "categories");
      await addDoc(colRef, {
        ...cloneValues,
        createdAt: serverTimestamp(),
      });
      toast.success("Create new category successfully!", {
        pauseOnHover: false,
        delay: 100,
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      reset({
        name: "",
        slug: "",
        status: 1,
      });
    }
  };

  const watchStatus = watch("status");
  console.log(watchStatus);
  return (
    <div>
      <DashboardHeading
        title="New category"
        desc="Add new category"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleAddNewCategory)} autoComplete="off">
        <div className="form-layout">
          <Field>
            <Label>Name</Label>
            <Input
              control={control}
              name="name"
              placeholder="Enter your category name"
              required
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
          <FieldCheckboxes>
            <Label>Status</Label>
            <div className="flex flex-wrap gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === categoryStatus.APPROVED}
                value={categoryStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                checked={Number(watchStatus) === categoryStatus.UNAPPROVED}
                control={control}
                value={categoryStatus.UNAPPROVED}
              >
                Unapproved
              </Radio>
            </div>
          </FieldCheckboxes>
        </div>
        <Button
          kind="primary"
          style={{ width: "100%", maxWidth: 250, margin: "0 auto" }}
          type="submit"
          isLoading={isSubmitting}
          disable={isSubmitting}
          className="mx-auto"
        >
          Add new category
        </Button>
      </form>
    </div>
  );
};

export default CategoryAddNew;
