import { NavLink, Outlet } from "react-router-dom";
import ChatItem from "../components/ChatItem";
import { getChatsById } from "../redux/async/chatsAsync";
import { clearCurrentChat } from "../redux/slices/ChatsSlice";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { useEffect } from "react";
import { getAllChatsByUserId } from "../redux/async/chatsAsync";
import { chatName } from "../utils/utils";
import Loading from "../components/Loading";
import { ChatInterface } from "../interfaces/Chat/chat.interface";
import ChatListHeader from "../components/ChatListHeader";
import Sadface from "../assets/sadface.svg"
import Chat from "../components/Chat";

export default function Message() {

  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth);
  const chat = useAppSelector(state => state.chat)

  useEffect(() => {
    dispatch(getAllChatsByUserId({ token: auth.accessToken, id: auth.authUser._id }))
  }, [])

  const hableChatSelect = (el: ChatInterface) => {
    dispatch(clearCurrentChat())
    dispatch(getChatsById({ token: auth.accessToken, id: el._id }))
  }

  return (
    <div className="h-full flex lg:ml-52 ">
      <div className="flex flex-col w-80 bg-slate-50 border-r">
        <ChatListHeader token={auth.accessToken} id={auth.authUser._id} />
        {chat.chats ?
          chat.chats.length === 0 ?
            <div className="flex justify-center items-center flex-col pt-2">
              <span>you have no chats</span>
            </div>
            : chat.chats?.map((el: ChatInterface, index: number) =>
              auth.authUser._id === el._id ?
                null
                :
                <ChatItem
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
        {
          chat.currentChat ?
            <Chat />
            :
            null
        }
      </div>
    </div>
  );
}

