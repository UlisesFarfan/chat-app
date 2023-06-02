import { AiOutlineArrowLeft, AiOutlineSend } from 'react-icons/ai'
import Message from './Message'
import InputMessage from './Inputs/InputMessage'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { useMessageText } from '../hooks/useValidFormik';
import { useEffect, useRef, useState } from 'react';
import { postMessage } from '../redux/async/chatsAsync';
import { chatName, chatWho, chatOtherUser } from '../utils/utils';
import { PropsMessage } from "../interfaces/Chat/chat.interface";
import Loading from './Loading';

export default function Chat() {

  const {
    values,
    handleBlur,
    handleChange,
    setValues
  } = useMessageText({
    text: ""
  });

  const dispatch = useAppDispatch();
  const chat = useAppSelector(state => state.chat.currentChat)
  const auth = useAppSelector(state => state.auth)
  const socket = useAppSelector(state => state.socket.socketIo)
  const scrollRef = useRef<any>()

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  const handleSubmitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message: PropsMessage = {
      message: values.text,
      user: auth.authUser._id,
      chatId: chat._id
    }
    setValues({
      text: ""
    })
    //    if (values.text === "") return;
    socket.emit("sendMessage", {
      message: values.text,
      user: auth.authUser._id,
      name: auth.authUser.name,
      chatId: chat._id,
      otherUser: chatOtherUser(chat.users, auth.authUser)
    })
    dispatch(postMessage({ headers: auth.accessToken, body: message }))
  };

  return (
    <div className="flex flex-col w-full">
      <div className="border-b flex justify-between items-center w-full px-5 py-2 h-16 shadow-sm">
        <div className="flex items-center">
          <AiOutlineArrowLeft className="h-6 w-6 text-slate-400" />
          {/* <img className="h-10 w-10 overflow-hidden rounded-full"
            src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=60&raw_url=true&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=500"
            alt="" /> */}
          <p className="font-semibold ml-3 text-slate-600">{chat && chatName(chat.users, auth.authUser)}</p>
        </div>
        <div className="flex items-center space-x-5">
          <svg xmlns="http://www.w3.org/2000/svg"
            className="h-9 bg-slate-50 rounded-full stroke-slate-400 p-2" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 stroke-slate-400" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        </div>
      </div>
      <div className="px-10 py-4 h-full overflow-y-auto">
        {
          chat ?
            chat.messagesId.map((el: any, index: number) => {
              return (
                <div ref={scrollRef} key={index}>
                  <Message message={el.message} user={chatWho(el.user, auth.authUser, chatName(chat.users, auth.authUser))} />
                </div>
              )
            })
            :
            <Loading />
        }
      </div>
      <form className="flex px-5 py-3" onSubmit={handleSubmitMessage}>
        <div className="w-full h-12 flex justify-between px-3 items-center border border-transparent bg-slate-50 focus-within:border-slate-300 rounded-lg">
          <InputMessage
            id="text"
            placeholder="Type your message"
            onBlur={handleBlur}
            onChange={handleChange}
            initialValue={values?.text ? values?.text : ""}
          />
          <button type='submit'>
            <AiOutlineSend className="h-8 w-8 text-slate-500" />
          </button>
        </div>
      </form >
    </div >
  )
}