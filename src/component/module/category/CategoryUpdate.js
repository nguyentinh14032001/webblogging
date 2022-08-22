import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import slugify from "slugify";
import RemoveVietnameseTones from "../../../draft/RemoveVietnameseTones";
import { db } from "../../../firebase/firebase-config";
import { categoryStatus } from "../../../utils/constants";
import { Button } from "../../button";
import { Radio } from "../../checkbox";
import { Field, FieldCheckboxes } from "../../field";
import { Input } from "../../input";
import { Label } from "../../label";
import DashboardHeading from "../dashboard/DashboardHeading";
import { toast } from "react-toastify";

const CategoryUpdate = () => {
  const {
    control,
    watch,
    handleSubmit,
    reset,
    formState: {  isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      slug: "",
      status: 1,
      createdAt: new Date(),
    },
  });
  const [params] = useSearchParams();
  const categoryId = params.get("id");
  useEffect(() => {
    async function fetchData() {
      const colRef = doc(db, "categories", categoryId);
      const singleDoc = await getDoc(colRef);
      reset(singleDoc.data());
    }
    fetchData();
  }, [categoryId, reset]);
  if (!categoryId) return null;

  const watchStatus = watch("status");
  const handleUpdateCategory = async (values) => {
    try {
      const cloneValues = { ...values };
      const removeNameTones = RemoveVietnameseTones(values.name);
      const removeSlugTones = RemoveVietnameseTones(values.slug);
      cloneValues.status = Number(values.status);
      cloneValues.slug = slugify(removeSlugTones || removeNameTones, {
        lower: true,
      });
      const colRef = doc(db, "categories", categoryId);
      await updateDoc(colRef, {
        ...cloneValues,
      });
      toast.success("Update category successfully!", {
        pauseOnHover: false,
        delay: 100,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };
  return (
    <div>
      <DashboardHeading
        title="Update category"
        desc={`Update your category id: ${categoryId}`}
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleUpdateCategory)} autoComplete="off">
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
          Update category
        </Button>
      </form>
    </div>
  );
};

export default CategoryUpdate;
