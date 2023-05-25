import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { UpdateUsersConects } from "../redux/async/socketAsync";
import { resiveAMessage } from "../redux/async/chatsAsync";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";

const SocketIoMiddleware = (): any => {
  const { authUser }: any = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const socket = useAppSelector(state => state.socket.socketIo)
  const location = useLocation()
  // socket funtions
  useEffect(() => {
    socket.emit("addUser", authUser);
    socket.emit("getAllUsersConect", authUser._id);
    socket.on("sentAllUsersConect", (users: any) => {
      dispatch(UpdateUsersConects(users));
    });
    socket.on("getMessage", (message: any) => {
      dispatch(resiveAMessage(message));
      console.log(message), console.log(location)
      if (location.pathname.includes(message.chatId)) return;
      toast.success('Successfully toasted!');
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
