import { InputGnrlProps } from "../../interfaces/Inputs/inputs.interface";

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
}: InputGnrlProps) {
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