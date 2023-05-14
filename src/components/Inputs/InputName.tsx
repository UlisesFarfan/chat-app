import React, { ChangeEvent } from "react";
import Helper from "../Helper";
import Label from "../Label";
import { formikError } from "../../interfaces/formik/formik";

interface InputEmailProps {
  className?: string;
  disabled?: boolean;
  helper?: formikError;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  onChange: (e: ChangeEvent<any>) => void;
  id: string;
  initialValue?: string;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
}

function InputName({
  className,
  disabled,
  helper,
  id,
  onBlur,
  onChange,
  initialValue,
  label,
  placeholder,
  readonly,
}: InputEmailProps) {
  return (
    <div className="flex flex-col items-start w-full relative">
      {label && <Label content={label} htmlFor={id} />}
      <input
        type="text"
        placeholder={placeholder}
        pattern="\S+.*"
        required
        id={id}
        onBlur={onBlur ? onBlur : undefined}
        onChange={onChange}
        disabled={disabled ? disabled : false}
        readOnly={readonly ? readonly : false}
        value={initialValue}
        className={`p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          className?.includes("is-invalid") ? "text-red-600" : ""
        }`}
        tabIndex={
          (className?.match(/readonly-text-plain/) && readonly === true) ||
          readonly === true ||
          disabled === true
            ? -1
            : 0
        }
      />
      {helper && <Helper helper={helper} />}
    </div>
  );
}

export default InputName;
