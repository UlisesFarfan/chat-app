import { NavLink, useLocation } from "react-router-dom"
import { MdNotificationsActive } from "react-icons/md"
import { useState } from "react"
import ContextMenu from "./ContextMenu";
import { ContextProps, ChatItem } from "../interfaces/Chat/chat.interface";

const initialValue = { x: 0, y: 0, show: false }

export default function ChatListItem({ name, index, newMessage, online, onClick }: ChatItem) {

  const indexChat = useLocation();
  const [contextMenu, setContextMenu] = useState<ContextProps>(initialValue);

  //onContextMenuCapture={(e) => handle(e)}
  const handleContext = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const { pageX, pageY } = e
    setContextMenu({ x: pageX, y: pageY, show: true })
  };

  const closeMenu = () => setContextMenu(initialValue);

  return (
    <>
      <NavLink
        to={`/chats/${index}`}
        key={index}
        className={`${indexChat.pathname.includes(index)
          ?
          "px-1 py-4 relative justify-between flex items-center bg-white cursor-pointer border-l-4 border-l-indigo-500 border-t border-b"
          :
          "px-1 py-4 relative justify-between  flex items-center cursor-pointer border-l-4 border-l-transparent hover:bg-slate-100"
          }`}
        onContextMenuCapture={(e) => handleContext(e)}
        onClick={onClick}
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
      </NavLink>
      {contextMenu.show &&
        <ContextMenu context={contextMenu} closeMenu={closeMenu}>
          <div className="flex flex-col gap-2 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <button className="hover:bg-slate-100 p-1 rounded-md flex">
              Eliminar
            </button>
            <button className="hover:bg-slate-100 p-1 rounded-md flex">
              Bloquear
            </button>
            <button className="hover:bg-slate-100 p-1 rounded-md flex">
              Archivar
            </button>
          </div>
        </ContextMenu>
      }
    </>
  )
};