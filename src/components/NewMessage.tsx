import { NavLink } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

export default function NewMessage({ t, message, newChat, toast, handleChatSelect }: any) {
  const { chats, archive_chats } = useAppSelector(state => state.social)
  let redirec = "/"
  chats.map((el: any) => {
    if (el._id === message.chatId) redirec = "/"
  })
  archive_chats.map((el: any) => {
    if (el._id === message.chatId) redirec = "/archive"
  })
  return (
    <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <NavLink
        to={redirec}
        className="flex-1 w-0 p-4"
        onClick={() => handleChatSelect(message)}
      >
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {message.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {message.message}
            </p>
          </div>
        </div>
      </NavLink >
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </div>
    </div>
  )
}