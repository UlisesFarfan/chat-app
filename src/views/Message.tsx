import { NavLink, Outlet, useLocation } from "react-router-dom";
import MessageContact from "../components/MessageContact";
import { clearUserChat } from "../redux/async/chatsAsync";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { useEffect } from "react";
import { getAllChatsByUserId } from "../redux/async/chatsAsync";
import { chatName } from "../utils/utils";

export default function Message() {

  const dispatch = useAppDispatch()
  const { authUser }: any = useAppSelector((state) => state.auth);
  const { chats } = useAppSelector(state => state.chat)

  useEffect(() => {
    dispatch(clearUserChat())
    dispatch(getAllChatsByUserId(authUser._id))
  }, [])

  return (
    <div className="h-full flex lg:ml-52">
      <div className="flex flex-col w-60 bg-slate-50 border-r">
        <div className="h-full">
          {chats ? chats?.map((el: any, index: number) =>
            authUser._id === el._id ?
              null
              :
              <NavLink to={`/messages/${el._id}`} key={index}>
                <MessageContact
                  name={chatName(el.users, authUser)}
                  index={el._id}
                  online={false}
                  newMessage={el.messageToView}
                />
              </NavLink>
          )
            :
            <>
              Loading
            </>
          }
        </div>
      </div>
      <Outlet />
    </div>
  );
}

