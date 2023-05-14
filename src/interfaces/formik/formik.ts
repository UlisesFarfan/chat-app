import { FormikErrors } from "formik";

export type formikError =
  | string[]
  | string
  | FormikErrors<any>
  | FormikErrors<any>[];