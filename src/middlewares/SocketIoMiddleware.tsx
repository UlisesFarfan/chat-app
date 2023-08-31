import { NavLink, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { UpdateUsersConects } from "../redux/async/socketAsync";
import { getAllChatsByUserId, getChatsById, getSearchChatByUsersName, resiveAMessage } from "../redux/async/socialAsync";
import { clearCurrentChat } from "../redux/slices/SocialSlice";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import NewMessage from "../components/NewMessage";
import { handleConnected } from "../redux/slices/SocketIo";

const SocketIoMiddleware = (): any => {

  const auth = useAppSelector((state) => state.auth);
  const { authUser }: any = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { socketIo, isConnected } = useAppSelector(state => state.socket);
  const { currentChat, friends, block_users } = useAppSelector(state => state.social);
  const location = useLocation();

  const handleChatSelect = (el: any) => {
    dispatch(clearCurrentChat())
    if (el.chatId) {
      dispatch(getChatsById({ token: auth.accessToken, id: el.chatId }));
      return;
    } else {
      dispatch(getSearchChatByUsersName({ token: auth.accessToken, userId: el.user, secUserId: el.otherUser }))
    }
  };

  // socket funtions
  useEffect(() => {
    // CONNECT SOCKET
    if (!isConnected) {
      socketIo.emit("addUser", authUser);
    }
    socketIo.on("connectedSuccessfully", () => {
      dispatch(handleConnected())
    });
    // socketIo.on("sentAllUsersConect", (users: any) => {
    //   dispatch(UpdateUsersConects(users));
    // });
    socketIo.on("userConnected", (data: any) => {
      socketIo.emit("getUsersOnline", {
        userId: auth.authUser._id,
        contacts: friends
      });
    });
    socketIo.on("userDisconnected", (data: any) => {
      socketIo.emit("getUsersOnline", {
        userId: auth.authUser._id,
        contacts: friends
      });
    });
    socketIo.on("userIsLogout", (data: any) => {
      socketIo.emit("getUsersOnline", {
        userId: auth.authUser._id,
        contacts: friends
      });
    });

    // CHAT SOCKET
    socketIo.on("getMessage", (message: any) => {
      let isBlock = false
      if (block_users !== null && block_users.length > 0) {
        block_users.map((el: any) => {
          if (el._id === message.user) {
            isBlock = true
          };
        })
      }
      if (!isBlock) {
        dispatch(resiveAMessage(message));
        dispatch(getAllChatsByUserId({ token: auth.accessToken, id: authUser._id }));
        if (currentChat?._id.includes(message.chatId) && !location.pathname.includes("/archive")) return;
        toast.custom((t) => (
          <NewMessage t={t} message={message} toast={toast} handleChatSelect={handleChatSelect} />
        ), {
          position: "bottom-right"
        });
      }
    });
    socketIo.on("getNewChat", (message: any) => {
      let isBlock = false
      if (block_users !== null && block_users.length > 0) {
        block_users.map((el: any) => {
          if (el._id === message.user) {
            isBlock = true
          };
        })
      }
      if (!isBlock) {
        dispatch(getAllChatsByUserId({ token: auth.accessToken, id: authUser._id }));
        toast.custom((t) => (
          <NewMessage t={t} message={message} newChat={true} toast={toast} handleChatSelect={handleChatSelect} />
        ), {
          position: "bottom-right"
        });
      }
    });
    return () => {
      socketIo.off("addUser");
      socketIo.off("getAllUsersConect");
      socketIo.off("sentAllUsersConect");
      socketIo.off("getMessage");
      socketIo.off("getNewChat");
      socketIo.off("userConnected");
      socketIo.off("userDisconnected");
      socketIo.off("userIsLogout");
    }
  }, [location, friends])

  return (
    <Outlet />
  );
};

export default SocketIoMiddleware;
