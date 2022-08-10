import { useForm } from "react-hook-form";
import { Button } from "../../button";
import { Radio } from "../../checkbox";
import { Field, FieldCheckboxes } from "../../field";
import ImageUpload from "../../image/ImageUpload";
import { Input } from "../../input";
import { toast } from "react-toastify";
import { Label } from "../../label";
import DashboardHeading from "../dashboard/DashboardHeading";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { userRole, userStatus } from "../../../utils/constants";
import useFireBaseImage from "../../../hook/useFirebaseImage";

import { auth, db } from "../../../firebase/firebase-config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import slugify from "slugify";

const UserAddNew = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    watch,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
      username: "",
      status: userStatus.ACTIVE,
      role: userRole.USER,
      createdAt: new Date(),
    },
  });
  const handleCreateUser = async (values) => {
    if (!isValid) return;
    try {
      await createUserWithEmailAndPassword(
        auth,
        values.email.trim(),
        values.password.trim()
      );
      
      await addDoc(collection(db, "users"), {
        fullname: values.fullname.trim(),
        email: values.email.trim(),
        password: values.password.trim(),
        username: slugify(values.username || values.fullname, {
          lower: true,
          replacement: "",
          trim: true,
        }),
        avatar: image,
        status: Number(values.status),
        role: Number(values.role),
        createdAt: serverTimestamp(),
      });
      toast.success(
        `Create new user with email: ${values.email} successfully`,
        {
          pauseOnHover: false,
          delay: 100,
        }
      );
      reset({
        fullname: "",
        email: "",
        password: "",
        username: "",
        avatar: "",
        status: userStatus.ACTIVE,
        role: userRole.USER,
        createdAt: new Date(),
      });
      handleResetUpload();
    } catch (err) {
      console.log(err);
    }
  };

  const watchStatus = watch("status");
  const watchRole = watch("role");

  const {
    image,
    handleResetUpload,
    progress,
    handleSelecteImage,
    handleDeleteImage,
  } = useFireBaseImage(setValue, getValues);
  return (
    <div>
      <DashboardHeading
        title="New user"
        desc="Add new user to system"
      ></DashboardHeading>
      <form onSubmit={handleSubmit(handleCreateUser)} autoComplete="off">
        <div className="w-[200px] h-[200px] mx-auto mb-10 rounded-full">
          <ImageUpload
            handleDeleteImage={handleDeleteImage}
            progress={progress}
            onChange={handleSelecteImage}
            image={image}
            className="!rounded-full h-full "
          ></ImageUpload>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Fullname</Label>
            <Input
              name="fullname"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>
          <Field>
            <Label>Username</Label>
            <Input
              name="username"
              placeholder="Enter your username"
              control={control}
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Email</Label>
            <Input
              name="email"
              placeholder="Enter your email"
              control={control}
              type="email"
            ></Input>
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              name="password"
              placeholder="Enter your password"
              control={control}
              type="password"
            ></Input>
          </Field>
        </div>
        <div className="form-layout">
          <Field>
            <Label>Status</Label>
            <FieldCheckboxes>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.ACTIVE}
                value={userStatus.ACTIVE}
              >
                Active
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.PENDING}
                value={userStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === userStatus.BAN}
                value={userStatus.BAN}
              >
                Banned
              </Radio>
            </FieldCheckboxes>
          </Field>
          <Field>
            <Label>Role</Label>
            <FieldCheckboxes>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.ADMIN}
                value={userRole.ADMIN}
              >
                Admin
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.MOD}
                value={userRole.MOD}
              >
                Moderator
              </Radio>
              <Radio
                name="role"
                control={control}
                checked={Number(watchRole) === userRole.USER}
                value={userRole.USER}
              >
                User
              </Radio>
            </FieldCheckboxes>
          </Field>
        </div>
        <Button
          isLoading={isSubmitting}
          disabled={isSubmitting}
          kind="primary"
          type="submit"
          className="mx-auto w-[200px]"
        >
          Add new user
        </Button>
      </form>
    </div>
  );
};

export default UserAddNew;
