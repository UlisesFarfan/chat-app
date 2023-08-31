import { useState } from "react";
import Label from "../Label";
import PasswordStrengthBar from "react-password-strength-bar";
import Helper from "../Helper";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputPasswordProps } from "../../interfaces/Inputs/inputs.interface";

function InputPassword({
  className,
  disabled,
  helper,
  onBlur,
  onChange,
  onChangeScore,
  id,
  initialValue,
  label,
  placeholder,
  readOnly,
  showStrengthBar,
}: InputPasswordProps) {
  const [shown, setShown] = useState(false);
  const [passwordStrength] = useState<number>(0);

  const switchShown = () => setShown(!shown);

  return (
    <div className="flex flex-col items-stretch relative">
      {label && <Label content={label} htmlFor={id} />}
      <div
        className={`items-start w-full ${className?.includes("is-invalid") ? "is-invalid" : ""
          }`}
      >
        <div
          className={`flex items-center justify-center${className?.includes("is-invalid") ? "text-red-600" : ""
            }`}
        >
          <input
            onBlur={onBlur ? onBlur : undefined}
            onChange={onChange}
            type={shown ? "text" : "password"}
            placeholder={placeholder}
            id={id}
            disabled={disabled ? disabled : false}
            readOnly={readOnly ? readOnly : false}
            value={initialValue ? initialValue : ""}
            className="flex items-center justify-center w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            tabIndex={
              (className?.match(/readonly-textplain/) && readOnly === true) ||
                readOnly === true ||
                disabled === true
                ? -1
                : 0
            }
            autoComplete="off"
          />
          <div onClick={switchShown} className="flex items-center p-3 border border-gray-300 rounded-md">
            {shown ? (
              <AiOutlineEyeInvisible className="text-gray-500" />
            ) : (
              <AiOutlineEye className="text-gray-500" />
            )}
          </div>
        </div>

        {showStrengthBar && (
          <PasswordStrengthBar
            onChangeScore={
              onChangeScore ? (score) => onChangeScore(score) : undefined
            }
            password={initialValue}
            className="password-strength-bar"
            shortScoreWord={false}
            scoreWordClassName="password-msg"
            scoreWords={[]}
            barColors={["#E9F0FF", "#FF716E", "#FFBF5E", "#1E72BE", "#5DBFA5"]}
          />
        )}
      </div>
      {helper && <Helper helper={helper} />}
    </div>
  );
}
export default InputPassword;
