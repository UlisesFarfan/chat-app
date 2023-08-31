import Label from "../Label";
import { InputGnrlProps } from "../../interfaces/Inputs/inputs.interface";

function InputSettingsTextArea({
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
      <textarea
        placeholder={placeholder}
        required
        id={id}
        onBlur={onBlur ? onBlur : undefined}
        onChange={onChange}
        disabled={disabled ? disabled : false}
        readOnly={readonly ? readonly : false}
        value={initialValue}
        className={`p-1 w-full border-b-2 bg-slate-50 border-indigo-500 rounded-t-md focus:outline-none
        ${className?.includes("is-invalid") ? "text-red-600" : ""}`}
        tabIndex={
          (className?.match(/readonly-text-plain/) && readonly === true) ||
            readonly === true ||
            disabled === true
            ? -1
            : 0
        }
        autoComplete="off"
        rows={5}
        cols={5}
      />
    </div>
  );
}

export default InputSettingsTextArea;
