import { NavLink, Outlet } from "react-router-dom";
import ChatListItem from "../components/ChatListItem";
import { clearUserChat, getChatsById } from "../redux/async/chatsAsync";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { useEffect } from "react";
import { getAllChatsByUserId } from "../redux/async/chatsAsync";
import { chatName } from "../utils/utils";
import Loading from "../components/Loading";
import { Chat } from "../interfaces/Chat/chat.interface";
import ChatListHeader from "../components/ChatListHeader";

export default function Message() {

  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth);
  const { chats } = useAppSelector(state => state.chat)

  useEffect(() => {
    dispatch(getAllChatsByUserId({ headers: auth.accessToken, id: auth.authUser._id }))
  }, [])

  const ResetChat = () => {
    dispatch(clearUserChat())
  }

  const hableChatSelect = (el: Chat) => {
    ResetChat()
    dispatch(getChatsById({ headers: auth.accessToken, id: el._id }))
  }

  return (
    <div className="h-full flex lg:ml-52">
      <div className="flex flex-col w-80 bg-slate-50 border-r">
        <ChatListHeader />
        {chats ? chats?.map((el: Chat, index: number) =>
          auth.authUser._id === el._id ?
            null
            :
            <NavLink
              to={`/chats/${el._id}`}
              key={index}
              onClick={() => {
                hableChatSelect(el)
              }}
            >
              <ChatListItem
                name={chatName(el.users, auth.authUser)}
                index={el._id}
                online={false}
                newMessage={el.messageToView}
              />
            </NavLink>
        )
          :
          <div className="mt-10 flex items-center justify-center">
            <Loading />
          </div>
        }
      </div>
      <div className="w-full h-full flex">
        <Outlet />
      </div>
    </div>
  );
}

