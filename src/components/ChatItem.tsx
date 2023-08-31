import { useLocation } from "react-router-dom"
import { MdNotificationsActive } from "react-icons/md"
import { useEffect, useState } from "react"
import ContextMenu from "./ContextMenu";
import { ContextProps, ChatItemProps } from "../interfaces/Chat/chat.interface";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  getAllChatsByUserId,
  putArchiveUserChat,
  deleteArchiveUserChat,
  deleteUserChat,
  putBlockUser
} from "../redux/async/socialAsync";
import toast from "react-hot-toast";
import { chatOtherUser } from "../utils/utils";

const initialValue = { x: 0, y: 0, show: false }

export default function ChatItem({ name, index, newMessage, onClick, lastMessage, user }: ChatItemProps) {
  const indexChat = useLocation();
  const dispatch = useAppDispatch()
  const [contextMenu, setContextMenu] = useState<ContextProps>(initialValue);
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const { currentChat, block_users, friends } = useAppSelector(state => state.social)
  const [isBlock, setIsBlock] = useState<boolean>(false)
  const { authUser, accessToken } = useAppSelector(state => state.auth)
  const { socketIo } = useAppSelector(state => state.socket)
  //onContextMenuCapture={(e) => handle(e)}
  const handleContext = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setContextMenu({ x: pageX, y: pageY, show: true });
  };
  const closeMenu = () => setContextMenu(initialValue);

  useEffect(() => {
    socketIo.emit("isThisUserChatConnected", user);
    socketIo.on("resUserChatConnected", (res: any) => {
      if (res.user === user) setIsOnline(res.isOnline)
    });
    socketIo.on("userConnected", (data: any) => {
      socketIo.emit("isThisUserChatConnected", user);
    });
    socketIo.on("userDisconnected", (data: any) => {
      socketIo.emit("isThisUserChatConnected", user);
    });
    socketIo.on("userIsLogout", (data: any) => {
      socketIo.emit("isThisUserChatConnected", user);
    });
    return () => {
      socketIo.off("isThisUserChatConnected");
      socketIo.off("resUserChatConnected");
      socketIo.off("userConnected");
      socketIo.off("userDisconnected");
      socketIo.off("userIsLogout");
    };
  }, []);

  useEffect(() => {
    if (block_users !== null && block_users.length !== 0) {
      for (let i = 0; i < block_users.length; i++) {
        if (block_users[i]._id === user) {
          setIsBlock(true)
        }
      }
    } else {
      setIsBlock(false)
    }
  }, [block_users, friends]);

  return (
    <>
      <div
        key={index}
        className={`py-3 relative flex flex flex-col px-4 ${currentChat?._id === index
          ?
          "bg-white cursor-pointer border-l-4 border-l-indigo-500 border-t border-b"
          :
          "cursor-pointer border-l-4 border-l-transparent bg-white hover:bg-slate-50"
          }`}
        onContextMenuCapture={(e) => handleContext(e)}
        onClick={onClick}
      >
        <div className="flex items-center w-full justify-between">
          <span x-text={name} className={`${indexChat.pathname.includes(index)
            ?
            "text-md font-semibold text-indigo-600 m-0 p-0"
            :
            "text-md font-semibold text-slate-600 m-0 p-0"
            }`}
          >
            {name}
          </span>
          <div className="flex w-8 justify-between">
            {newMessage ? <MdNotificationsActive /> : <div />}
            {!isBlock && isOnline ? <div className="h-3 w-3 bg-green-400 rounded-full" /> : <div />}
          </div>
        </div>
        <div className="flex items-center relative pr-8">
          <span className="text-slate-500 text-xs whitespace-nowrap overflow-hidden">
            {!isBlock ? lastMessage.message : "User blocked."}
          </span>
          {!isBlock &&
            <span className="text-slate-500 absolute right-0 text-xs whitespace-nowrap overflow-hidden">
              {new Date(lastMessage.date).getHours()}:{new Date(lastMessage.date).getMinutes().toString().length == 1 ? `0${new Date(lastMessage.date).getMinutes()}` : new Date(lastMessage.date).getMinutes()}
            </span>
          }
        </div>
      </div>
      {
        contextMenu.show &&
        <ContextMenu context={contextMenu} closeMenu={closeMenu}>
          <div className="flex flex-col gap-2 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <button className="hover:bg-slate-100 p-1 rounded-md flex"
              onClick={() => {
                dispatch(putArchiveUserChat({
                  token: accessToken,
                  userId: authUser._id,
                  chatId: index,
                  action: location.pathname.includes("archive") ?
                    "unarchive"
                    :
                    "archive"
                }))
                  .unwrap()
                  .then(() => {
                    dispatch(getAllChatsByUserId({ token: accessToken, id: authUser._id }));
                  });
                toast.success(location.pathname.includes("archive") ?
                  "Unarchive successfully."
                  :
                  "Archive successfully.", {
                  position: "top-center"
                });
              }}
            >
              {
                location.pathname.includes("archive") ?
                  "Unarchive"
                  :
                  "Archive"
              }
            </button>
            <button className="hover:bg-slate-100 p-1 rounded-md flex"
              onClick={() => {
                dispatch(putBlockUser({ token: accessToken, userId: authUser._id, otherUser: user, action: isBlock ? "unblock" : "block" }))
              }}
            >
              {isBlock ? "Unblock" : "Block"}
            </button>
            <button className="hover:bg-slate-100 p-1 rounded-md flex"
              onClick={() => {
                if (location.pathname.includes("archive")) {
                  dispatch(deleteArchiveUserChat({
                    token: accessToken,
                    userId: authUser._id,
                    chatId: index,
                  }))
                    .unwrap()
                    .then(() => {
                      dispatch(getAllChatsByUserId({ token: accessToken, id: authUser._id }));
                    });
                  toast.success("Delete successfully.", {
                    position: "top-center"
                  });
                } else {
                  dispatch(deleteUserChat({
                    token: accessToken,
                    userId: authUser._id,
                    chatId: index,
                  }))
                    .unwrap()
                    .then(() => {
                      dispatch(getAllChatsByUserId({ token: accessToken, id: authUser._id }));
                    });
                  toast.success("Delete successfully.", {
                    position: "top-center"
                  });
                }
              }}
            >
              Delete
            </button>
          </div>
        </ContextMenu>
      }
    </>
  )
};