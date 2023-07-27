import { ReactElement } from "react"
import { InputTextProps } from "../../interfaces/Inputs/inputs.interface";

export default function InputSearch({
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
    <div className="w-full px-2">
      <input
        type="text"
        placeholder={placeholder}
        pattern="\S+.*"
        id={id}
        onChange={onChange}
        disabled={disabled ? disabled : false}
        value={initialValue}
        className="w-full px-1 bg-transparent outline-none placeholder:text-slate-400"
      />
    </div>
  );
}
