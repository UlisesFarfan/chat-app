import { useState, useRef } from "react"
import { ContactItemProps } from "../interfaces/Chat/chat.interface"
import { useOnClickOutSide } from "../hooks/useOnClickOutSide"

export default function ContactItem({ name, description, index }: ContactItemProps) {

  const contextItem = useRef<HTMLDivElement>(null)
  const [isOpen, setIsOpen] = useState<Boolean>(false)

  useOnClickOutSide(contextItem, () => setIsOpen(false))

  return (
    <div className="flex" key={index} onClick={() => setIsOpen(true)} ref={contextItem}>
      <div className="flex flex-col w-full hover:bg-slate-100 p-2 gap-1 rounded-md relative">
        <h3 className="leading-none">
          {name}
        </h3>
        <p className="text-slate-500 text-xs whitespace-nowrap text-ellipsis overflow-hidden hover:whitespace-normal">
          {description}
        </p>
      </div>
      {isOpen && (
        <div className="absolute -right-14 rounded-md bg-black h-14 flex">
          HOLA
        </div>
      )}
    </div>
  )
}

// https://teams.microsoft.com/l/meetup-join/19%3ameeting_YmQwOGY5MzUtMzY5OS00NGJjLTlhMDYtMzA2MDFlYzVhMGYx%40thread.v2/0?context=%7b%22Tid%22%3a%22e0793d39-0939-496d-b129-198edd916feb%22%2c%22Oid%22%3a%223e32becf-f369-4e3f-815b-02ff89a1650d%22%7d