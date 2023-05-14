import React, {
  ChangeEvent,
  ChangeEventHandler,
  ReactElement,
  useRef,
} from "react";
import { formikError } from "../../hooks/useValidFormik";
import Helper from "../Helper";
import Label from "../Label";

interface InputTextProps {
  className?: string;
  disabled?: boolean;
  helper?: formikError;
  id: string;
  initialValue?: string;
  onBlur?: {
    (e: React.FocusEvent<any, Element>): void;
    <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
  };
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  placeholder?: string;
  readonly?: boolean;
}

function InputText({
  className,
  disabled,
  helper,
  id,
  initialValue,
  onBlur,
  onChange,
  label,
  placeholder,
  readonly,
}: InputTextProps): ReactElement {
  return (
    <div className="input-text-container relative">
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
        className={className ? className : ""}
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

export default InputText;
