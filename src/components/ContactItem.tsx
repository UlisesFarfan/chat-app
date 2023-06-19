import { useState, useRef } from "react"
import { ContactItemProps } from "../interfaces/Chat/chat.interface"
import { useOnClickOutSide } from "../hooks/useOnClickOutSide"
import InputText from "./Inputs/InputText"
import { useMessageText } from "../hooks/useValidFormik"
import { AiOutlineSend } from "react-icons/ai"
import InputMessage from "./Inputs/InputMessage"

export default function ContactItem({ name, description, index }: ContactItemProps) {

  const contextItem = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<Boolean>(false)

  useOnClickOutSide(contextItem, () => setIsOpen(false))

  const {
    values,
    handleBlur,
    handleChange,
    setValues
  } = useMessageText({
    text: ""
  });

  return (
    <div className="flex relative" key={index} onClick={() => setIsOpen(true)} ref={contextItem}>
      <div className="flex flex-col w-full hover:bg-slate-100 p-2 gap-1 rounded-md">
        <h3 className="leading-none">
          {name}
        </h3>
        <p className="text-slate-500 text-xs whitespace-nowrap text-ellipsis overflow-hidden hover:whitespace-normal">
          {description}
        </p>
      </div>
      {isOpen && (
        <div className="absolute h-14 bg-white flex justify-center items-center border rounded-md -right-72">
          <form className="flex" onSubmit={() => { }}>
            <div className="w-full h-12 flex justify-between px-3 mx-2 items-center border border-transparent bg-white focus-within:border-slate-300 rounded-lg">
              <InputMessage
                id="text"
                placeholder="Type your message..."
                onBlur={handleBlur}
                onChange={handleChange}
                initialValue={values?.text ? values?.text : ""}
              />
              <button type='submit'>
                <AiOutlineSend className="h-6 w-6 text-slate-500" />
              </button>
            </div>
          </form >
        </div>
      )}
    </div>
  )
}

// https://teams.microsoft.com/l/meetup-join/19%3ameeting_YmQwOGY5MzUtMzY5OS00NGJjLTlhMDYtMzA2MDFlYzVhMGYx%40thread.v2/0?context=%7b%22Tid%22%3a%22e0793d39-0939-496d-b129-198edd916feb%22%2c%22Oid%22%3a%223e32becf-f369-4e3f-815b-02ff89a1650d%22%7d

/* 
[16:28] Arce, Celeste
    Acciones: Estudiar en pág british counsil. Tomar nuevamente el test EF SET y mejorar english skills a por lo menos B1

*/