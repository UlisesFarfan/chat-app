import { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import InputEmail from "../../components/Inputs/InputEmail";
import InputPassword from "../../components/Inputs/InputPassword";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { useValidSignIn } from "../../hooks/useValidFormik";
import { LoginAsync } from "../../redux/async/authAsync";
import { setAuthUser } from "../../redux/slices/AuthenticationSlice";
import Buttons from "../../components/Buttons";

export default function Login() {

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    isSubmitting,
    setFieldValue,
    touched,
    validateForm,
  } = useValidSignIn({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  function isValid() {
    return !errors?.email && !errors?.password;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(setAuthUser({ email: values.email }));
      await dispatch(LoginAsync({ username: values.email, password: values.password }));
    } catch (error: any) { }
  };

  useEffect(() => {
    //    dispatch(clearErrors());
  }, []);
  return (
    <>
      <form className="w-full max-w-xs flex flex-col gap-8" onSubmit={(e) => { handleSubmit(e) }}>
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
        <div className="flex items-center justify-between">
          <Buttons
            type="button"
            buttonType="secondary"
            onClick={() => navigate("/register")}
            text="Register"
          />
          <Buttons
            type="submit"
            buttonType="primary"
            disabled={isSubmitting || !isValid() || values.email === "" || values.password === ""}
            text="Sign In"
          />
        </div>
      </form>
    </>
  )
}