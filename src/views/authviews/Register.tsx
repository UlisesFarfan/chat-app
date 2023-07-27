import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import InputEmail from "../../components/Inputs/InputEmail";
import InputPassword from "../../components/Inputs/InputPassword";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useValidSignUp } from "../../hooks/useValidFormik";
import { SignupAsync } from "../../redux/async/authAsync";
import { setAuthUser } from "../../redux/slices/AuthenticationSlice";
import Buttons from "../../components/Buttons";
import InputText from "../../components/Inputs/InputSearch";
import InputName from "../../components/Inputs/InputName";

export default function Register() {

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    setFieldValue,
    touched,
  } = useValidSignUp({
    email: "",
    password: "",
    changepassword: "",
    name: ""
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function isValid() {
    return !errors?.email && !errors?.password;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(SignupAsync(values))
    } catch (error: any) { }
  };

  useEffect(() => {
    //    dispatch(clearErrors());
  }, []);
  return (
    <>
      <form className="w-full max-w-xs gap-8 flex flex-col" onSubmit={(e) => { handleSubmit(e) }}>
        <InputName
          id="name"
          placeholder="Name"
          className={touched?.name && errors?.name ? "is-invalid" : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          helper={errors.name ? errors.name : ""}
          initialValue={values?.name ? values?.name : ""}
        />
        <InputEmail
          id="email"
          placeholder="Email"
          className={touched?.email && errors?.email ? "is-invalid" : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          helper={errors.email ? errors.email : ""}
          initialValue={values?.email ? values?.email : ""}
        />
        <InputPassword
          id="password"
          placeholder="Password"
          initialValue={values?.password ? values?.password : ""}
          className={touched?.password && errors.password ? "is-invalid" : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          showStrengthBar={false}
          helper={errors.password ? errors.password : ""}
        />
        <InputPassword
          id="changepassword"
          placeholder="Confirm your password"
          initialValue={values?.changepassword ? values?.changepassword : ""}
          className={touched?.changepassword && errors.changepassword ? "is-invalid" : ""}
          onBlur={handleBlur}
          onChange={handleChange}
          showStrengthBar={false}
          helper={errors.changepassword ? errors.changepassword : ""}
        />
        <div className="flex items-center justify-between">
          <Buttons
            type="button"
            buttonType="secondary"
            onClick={() => navigate("/login")}
            text="Login"
          />
          <Buttons
            type="submit"
            buttonType="primary"
            text="Register"
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSubmitting || !isValid() ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={
              isSubmitting
              ||
              !isValid()
              ||
              values.name === ""
            }
          />
        </div>
      </form>
    </>
  )
}