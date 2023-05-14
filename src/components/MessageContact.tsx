import { useAppSelector, useAppDispatch } from "../hooks/useRedux"
import { useLocation } from "react-router-dom"
import { MdNotificationsActive } from "react-icons/md"

export default function MessageContact({ name, index, newMessage, online }: any) {

  const indexChat = useLocation()

  return (
    <div key={index}
      className={`${indexChat.pathname.includes(index)
        ?
        "px-1 py-4 justify-between flex items-center bg-white cursor-pointer border-l-4 border-l-indigo-500 border-t border-b"
        :
        "px-1 py-4 justify-between  flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"
        }`}
    >
      <div className="flex items-center w-full justify-between mx-4">
        <p x-text={name} className={`${indexChat.pathname.includes(index)
          ?
          "text-md font-semibold text-indigo-600 m-0 p-0"
          :
          "text-md font-semibold text-slate-600 m-0 p-0"
          }`}
        >
          {name}
        </p>
        <div className="flex w-8 justify-between">
          {newMessage ? <MdNotificationsActive /> : <div />}
          {online ? <div className="h-3 w-3 bg-green-400 rounded-full" /> : <div />}
        </div>
      </div>
    </div>
  )
}