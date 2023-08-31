import ChatItem from "../components/ChatItem";
import { getChatsById, getContactBlocked } from "../redux/async/socialAsync";
import { clearCurrentChat } from "../redux/slices/SocialSlice";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { useEffect } from "react";
import { getAllChatsByUserId } from "../redux/async/socialAsync";
import { chatName, chatOtherUser } from "../utils/utils";
import Loading from "../components/Loading";
import { ChatInterface } from "../interfaces/Chat/chat.interface";
import ChatListHeader from "../components/ChatListHeader";
import Chat from "../components/Chat";

export default function ArchiveChats() {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth);
  const { archive_chats, currentChat } = useAppSelector(state => state.social)

  useEffect(() => {
    dispatch(getAllChatsByUserId({ token: auth.accessToken, id: auth.authUser._id }));
    dispatch(clearCurrentChat());
    dispatch(getContactBlocked({
      userId: auth.authUser._id,
      token: auth.accessToken
    }));
  }, []);

  const hableChatSelect = (el: ChatInterface) => {
    dispatch(clearCurrentChat())
    dispatch(getChatsById({ token: auth.accessToken, id: el._id }))
  }

  return (
    <div className="h-full flex ml-16">
      <div className={`flex flex-col w-80 bg-white border-r w-full md:w-64
      ${currentChat
          ?
          "hidden md:flex"
          :
          ""
        }
      `}>
        <ChatListHeader token={auth.accessToken} id={auth.authUser._id} />
        {archive_chats ?
          archive_chats.length === 0 ?
            <div className="flex justify-center items-center flex-col pt-2">
              <span>you have no chats</span>
            </div>
            : archive_chats?.map((el: ChatInterface, index: number) =>
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
                  user={chatOtherUser(el.users, auth.authUser)}
                  lastMessage={el.lastMessage}
                />
            )
          :
          <div className="mt-10 flex items-center justify-center">
            <Loading />
          </div>
        }
      </div>
      <div className={`w-full h-full flex ${currentChat
        ?
        "flex"
        :
        "hidden md:flex"
        }`}>
        {
          currentChat ?
            <Chat />
            :
            null
        }
      </div>
    </div>
  );
}

