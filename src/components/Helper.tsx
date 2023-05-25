import React, { ReactElement } from "react";
import { formikError } from "../interfaces/formik/formik.interface";

interface PropsHelper {
  helper: formikError;
}

export default function Helper({ helper }: PropsHelper): ReactElement {
  return (
    <>
      {typeof helper === "string" && (
        <span className="absolute text-xs leading-4 traking-wider text-gray-600 mt-12 text-red-500"> {helper} </span>
      )}
    </>
  );
};
