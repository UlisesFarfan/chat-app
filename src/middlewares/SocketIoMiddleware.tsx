import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { useEffect } from "react";
import { UpdateUsersConects } from "../redux/async/socketAsync";
import { resiveAMessage } from "../redux/async/chatsAsync";

const SocketIoMiddleware = (): any => {

  const { authUser }: any = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const socket = useAppSelector(state => state.socket.socketIo)

  // dispatch(AddUserSocketIo(authUser))
  useEffect(() => {
    socket.emit("addUser", authUser);
    socket.emit("getAllUsersConect", authUser._id);
    socket.on("sentAllUsersConect", (users: any) => {
      dispatch(UpdateUsersConects(users))
    });
    socket.on("getMessage", (message: any) => {
      dispatch(resiveAMessage(message))
    })
    return () => {
      socket.off("addUser")
      socket.off("getAllUsersConect")
      socket.off("sentAllUsersConect")
      socket.off("getMessage")
    }
  }, [])

  return (
    <>
      <Outlet />
    </>
  );
};

export default SocketIoMiddleware;
