import { IoMdAddCircleOutline } from "react-icons/io";
import InputText from "./Inputs/InputText";
import { useText } from "../hooks/useValidFormik";
import { BsSearch } from "react-icons/bs";
import { Search } from "../interfaces/Search/search.interface";

export default function SearchChat({ type, placeholder }: Search) {

  const {
    values,
    handleBlur,
    handleChange,
    setValues
  } = useText({
    text: ""
  });

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => {
    e.preventDefault()
  }

  return (
    <form
      className="w-full h-full pr-3 flex justify-between items-center border border-transparent bg-slate-100 focus-within:border-slate-300 hover:border-slate-300 rounded-lg"
      onClick={(e) => handleSubmit(e)}
    >
      <InputText
        id="text"
        placeholder={placeholder}
        onBlur={handleBlur}
        onChange={handleChange}
        initialValue={values?.text ? values?.text : ""}
      />
      <button type='submit'>
        <BsSearch className="h-5 w-5 text-slate-400" />
      </button>
    </form>
  )
}