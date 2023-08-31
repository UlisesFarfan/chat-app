import { useRef, useState } from "react";
import { ContextProps, MessageProps } from "../interfaces/Chat/chat.interface"
import ContextMenu from "./ContextMenu";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { deleteMessage } from "../redux/async/socialAsync";
const initialValue = { x: 0, y: 0, show: false }
export default function Message({
  message,
  user,
  date,
  _delete,
  messageId
}: MessageProps) {
  const [contextMenu, setContextMenu] = useState<ContextProps>(initialValue);
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  //onContextMenuCapture={(e) => handle(e)}
  const handleContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, show: true });
  };
  const closeMenu = () => setContextMenu(initialValue);
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    //dispatch(deleteMessage({ id: messageId, token: auth.accessToken }))
    console.log(messageId)
  }

  return (
    <>
      <div className={`mt-3 bg-transparent ${user !== "Me" ? "w-full flex flex-start" : "w-full flex justify-end mt-3"}`}>
        <div className="max-w-1/2">
          <div className="flex items-center">
            <p className={`font-semibold flex w-full text-sm text-slate-600 ${user === "Me" && "justify-end"}`}
            >
              {user}
            </p>
          </div>

          <div className={`mt-1 max-w-max min-w-4 relative px-2 rounded-b-xl 
          ${user !== "Me" ?
              "bg-slate-100 rounded-tr-xl"
              :
              "justify-end bg-indigo-500 rounded-tl-xl"}
          ${!_delete ?
              "pt-1 pb-6"
              :
              "p-2"
            }
            `}
            onContextMenuCapture={(e) => handleContext(e)}
          >
            <p className={`${user !== "Me" ?
              "text-sm text-slate-900 break-all"
              :
              "text-sm text-white flex justify-end break-all"}`}
              onContextMenuCapture={(e) => handleContext(e)}
            >
              {
                !_delete ?
                  message
                  :
                  "Message Deleted."
              }
            </p>
            {
              !_delete ?
                <p className={`absolute text-xs break-all ${user !== "Me" ?
                  "text-slate-500 left-2"
                  :
                  "text-slate-300 right-2"}`}
                  onContextMenuCapture={(e) => handleContext(e)}
                >
                  {new Date(date).getHours()}:{new Date(date).getMinutes().toString().length == 1 ? `0${new Date(date).getMinutes()}` : new Date(date).getMinutes()}
                </p>
                :
                null
            }
          </div>
        </div>
      </div>
      {
        contextMenu.show && !_delete &&
        <ContextMenu context={contextMenu} closeMenu={closeMenu}>
          <div className="flex flex-col gap-2 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            onContextMenuCapture={(e) => e.preventDefault()}
          >
            {
              user === "Me" &&
              <>
                <button className="hover:bg-slate-100 p-1 rounded-md flex"
                  onContextMenuCapture={(e) => e.preventDefault()}
                  onClick={(e) => handleDelete(e)}
                >
                  Delete
                </button>
                {/* <button className="hover:bg-slate-100 p-1 rounded-md flex"
                  onContextMenuCapture={(e) => e.preventDefault()}
                >
                  Edit
                </button> */}
              </>
            }
            <button className="hover:bg-slate-100 p-1 rounded-md flex"
              onContextMenuCapture={(e) => e.preventDefault()}
              onClick={e => {
                navigator.clipboard.writeText(message);
                toast.success("Copied", {
                  position: "top-right"
                });
                closeMenu();
              }}
            >
              Copy
            </button>
          </div>
        </ContextMenu>
      }
    </>
  )

}

/**
      <div className="text-center  my-5">
        <hr className="-mb-3" />
        <span className="text-xs text-slate-300 font-medium bg-white px-3 -mt-3">
          Wednesday, Feburary 5
        </span>
      </div>
      <div className="w-full flex flex-start overflow-y-auto">
        <div className="w-1/2">
          <div className="flex items-center">
            <img className="h-5 w-5 overflow-hidden rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
              alt="" />
            <p className="font-semibold ml-3 text-sm text-slate-600">Mircel Jones <span
              className="text-slate-400 text-xs">3:21 PM</span></p>
          </div>

          <div className="mt-3 w-full bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
            <p className=" text-sm text-slate-500">
              Hey all,
              There are many variation of passages of Lorem ipsum avaliable, but the jority have alternation in some form , by injected humor, or randomise words which don't look even slightly believable.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end mt-3">
        <div className="w-1/2 ">
          <div className="flex items-center justify-end">
            <p className="font-semibold mr-3 text-sm text-slate-600">Me <span
              className="text-slate-400 text-xs">3:25 PM</span></p>

            <img className="h-5 w-5 overflow-hidden rounded-full"
              src="https://source.unsplash.com/random/500x500/?face"
              alt="" />

          </div>

          <div className="mt-3 w-full bg-blue-500 p-4 rounded-b-xl rounded-tl-xl">
            <p className=" text-sm text-white">
              Hey,
              we are own hidden lake forest which is netural lake are generaly found in mountain.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center  my-5">
        <hr className="-mb-3" />
        <span className="text-xs text-slate-300 font-medium bg-white px-3 -mt-3">Today, 2:15 AM
          5</span>
      </div>
      <div className="w-full flex flex-start">
        <div className="w-1/2">
          <div className="flex items-center">
            <img className="h-5 w-5 overflow-hidden rounded-full"
              src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
              alt="" />
            <p className="font-semibold ml-3 text-sm text-slate-600">Mircel Jones <span
              className="text-slate-400 text-xs">3:21 PM</span></p>
          </div>

          <div className="mt-3  bg-slate-50 p-4 rounded-b-xl rounded-tr-xl">
            <p className=" text-sm text-slate-500">
              ok, Thanks
            </p>
          </div>
        </div>
      </div>
 */