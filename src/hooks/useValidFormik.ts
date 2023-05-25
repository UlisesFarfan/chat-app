import { useFormik, FormikErrors } from "formik";
import * as yup from "yup";
import "yup-phone";

export type formikError =
  | string[]
  | string
  | FormikErrors<any>
  | FormikErrors<any>[];

export const useValidSignUp = (initialValues?: any) => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Email is invalid.")
      .required("Email is required."),
    password: yup
      .string()
      .required("Password is required."),
    changepassword: yup
      .string()
      .required("Required field, confirm password.")
      .oneOf([yup.ref("password")], "The passwords do not match."),
    name: yup
      .string()
      .required("Name is required."),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  // true
  return {
    handleSubmit: formik.handleSubmit,
    values: formik.values,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    errors: formik.errors,
    isSubmitting: formik.isSubmitting,
    isValid: formik.isValid,
    actions: formik.setSubmitting,
    touched: formik.touched,
    setFieldValue: formik.setFieldValue,
    validateField: formik.validateField,
  };
};

export const useValidSignIn = (initialValues?: any) => {
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Email invalid.")
      .required("Email is required."),
    password: yup
      .string()
      .required("Password is required."),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  // true
  return {
    handleSubmit: formik.handleSubmit,
    values: formik.values,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    errors: formik.errors,
    isSubmitting: formik.isSubmitting,
    isValid: formik.isValid,
    actions: formik.setSubmitting,
    touched: formik.touched,
    setFieldValue: formik.setFieldValue,
    validateForm: formik.validateForm,
  };
};

export const useMessageText = (initialValues?: any) => {
  const validationSchema = yup.object({
    text: yup
      .string()
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setValues }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  // true
  return {
    handleSubmit: formik.handleSubmit,
    values: formik.values,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    errors: formik.errors,
    isSubmitting: formik.isSubmitting,
    isValid: formik.isValid,
    actions: formik.setSubmitting,
    touched: formik.touched,
    setValues: formik.setValues,
    setFieldValue: formik.setFieldValue,
    validateField: formik.validateField,
  };
};

export const useText = (initialValues?: any) => {
  const validationSchema = yup.object({
    text: yup
      .string()
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, setValues }) => {
      console.log(values);
      setSubmitting(false);
    },
  });

  // true
  return {
    handleSubmit: formik.handleSubmit,
    values: formik.values,
    handleBlur: formik.handleBlur,
    handleChange: formik.handleChange,
    errors: formik.errors,
    isSubmitting: formik.isSubmitting,
    isValid: formik.isValid,
    actions: formik.setSubmitting,
    touched: formik.touched,
    setValues: formik.setValues,
    setFieldValue: formik.setFieldValue,
    validateField: formik.validateField,
  };
};

export default useFormik;