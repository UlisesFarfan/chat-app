export default function Buttons({
  type,
  buttonType,
  disabled,
  onClick,
  text
}: any) {
  if (buttonType === "primary") {
    return (
      <button
        type={type}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={disabled}
        onClick={onClick ? onClick : null}
      >
        {text}
      </button>
    )
  }
  if (buttonType === "secondary") {
    return (
      <button
        type={type}
        className={`bg-white hover:bg-slate-200 text-slate-600 hover:text-slate-800 border font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
        disabled={disabled}
        onClick={onClick ? onClick : null}
      >
        {text}
      </button>
    )
  } else {
    return (
      <></>
    )
  }
}