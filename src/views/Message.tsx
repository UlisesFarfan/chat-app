import { NavLink, Outlet } from "react-router-dom";
import ChatListItem from "../components/ChatListItem";
import { getChatsById } from "../redux/async/chatsAsync";
import { clearCurrentChat } from "../redux/slices/ChatsSlice";
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

  const hableChatSelect = (el: Chat) => {
    dispatch(clearCurrentChat())
    dispatch(getChatsById({ headers: auth.accessToken, id: el._id }))
  }

  return (
    <div className="h-full flex lg:ml-52">
      <div className="flex flex-col w-80 bg-slate-50 border-r">
        <ChatListHeader headers={auth.accessToken} id={auth.authUser._id} />
        {chats ? chats?.map((el: Chat, index: number) =>
          auth.authUser._id === el._id ?
            null
            :
            <ChatListItem
              name={chatName(el.users, auth.authUser)}
              index={el._id}
              online={false}
              newMessage={el.messageToView}
              onClick={() => {
                hableChatSelect(el)
              }}
              key={index}
            />
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

