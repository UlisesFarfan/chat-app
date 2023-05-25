import Helper from "../Helper";
import Label from "../Label";
import { InputGnrlProps } from "../../interfaces/Inputs/inputs.interface";

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
}: InputGnrlProps) {
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
        className={`p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className?.includes("is-invalid") ? "text-red-600" : ""
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
