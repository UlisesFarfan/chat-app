import React, { ChangeEvent } from "react";
import { formikError } from "../../interfaces/formik/formik";
import { AiOutlineSend } from "react-icons/ai";

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

export default function InputMessage({
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
    <div className="w-full pr-3">
        <input
          type="text"
          placeholder={placeholder}
          pattern="\S+.*"
          id={id}
          onBlur={onBlur ? onBlur : undefined}
          onChange={onChange}
          disabled={disabled ? disabled : false}
          readOnly={readonly ? readonly : false}
          value={initialValue}
          className="w-full px-3 bg-transparent outline-none placeholder:text-slate-400"
        />
    </div>
  )
}