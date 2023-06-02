import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { UpdateUsersConects } from "../redux/async/socketAsync";
import { getChatsById, resiveAMessage } from "../redux/async/chatsAsync";
import { clearCurrentChat } from "../redux/slices/ChatsSlice";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const SocketIoMiddleware = (): any => {

  const auth = useAppSelector((state) => state.auth);
  const { authUser }: any = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const socket = useAppSelector(state => state.socket.socketIo)
  const location = useLocation()

  const hableChatSelect = (el: any) => {
    dispatch(clearCurrentChat())
    dispatch(getChatsById({ headers: auth.accessToken, id: el.chatId }))
  }

  // socket funtions
  useEffect(() => {
    socket.emit("addUser", authUser);
    socket.emit("getAllUsersConect", authUser._id);
    socket.on("sentAllUsersConect", (users: any) => {
      dispatch(UpdateUsersConects(users));
    });
    socket.on("getMessage", (message: any) => {
      dispatch(resiveAMessage(message));
      if (location.pathname.includes(message.chatId)) return;
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
          <NavLink
            to={`/chats/${message.chatId}`}
            className="flex-1 w-0 p-4"
            onClick={() => hableChatSelect(message)}
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
      ))
    });
    return () => {
      socket.off("addUser");
      socket.off("getAllUsersConect");
      socket.off("sentAllUsersConect");
      socket.off("getMessage");
    }
  }, [location])

  return (
    <>
      <Outlet />
    </>
  );
};

export default SocketIoMiddleware;
