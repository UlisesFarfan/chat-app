import { useState, useRef } from "react";
import { ChatInterface, ContactItemProps, UserChat } from "../interfaces/Chat/chat.interface";
import { useOnClickOutSide } from "../hooks/useOnClickOutSide";
import { useMessageText } from "../hooks/useValidFormik";
import { AiOutlineSend } from "react-icons/ai";
import InputMessage from "./Inputs/InputMessage";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { clearCurrentChat } from "../redux/slices/ChatsSlice";
import { getAllChatsByUserId, getChatsById, postNewChat } from "../redux/async/chatsAsync";
import { toast } from "react-hot-toast";

export default function ContactItem({ name, description, userId }: ContactItemProps) {

  const contextItem = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);
  const chats = useAppSelector((state: any) => state.chat.chats);
  const auth = useAppSelector((state: any) => state.auth);
  const socket = useAppSelector((state: any) => state.socket.socketIo)
  useOnClickOutSide(contextItem, () => setIsOpen(false));
  const handleClickContact = () => {
    let exist = false;
    chats.forEach((el: ChatInterface) => {
      el.users.forEach((e: UserChat) => {
        if (e._id === userId) {
          exist = true
          dispatch(clearCurrentChat())
          dispatch(getChatsById({ token: auth.accessToken, id: el._id }))
          return;
        };
      });
    });
    exist ? setIsOpen(false) : setIsOpen(true);
  }

  const {
    values,
    handleBlur,
    handleChange,
    setValues
  } = useMessageText({
    text: ""
  });
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (values.text === "") throw new Error("invalid data.");
      setDisable(true)
      await dispatch(postNewChat({
        token: auth.accessToken, body: {
          chat: {
            users: [
              auth.authUser._id,
              userId
            ]
          },
          message: {
            message: values.text,
            user: auth.authUser._id
          }
        }
      }))
        .unwrap()
        .catch((e: any) => {
          if (e.includes(403)) {
            toast.error("invalid data", {
              position: "top-right"
            })
          }
          setDisable(false)
        })
      socket.emit("getNewChat", {
        message: values.text,
        name: auth.authUser.name,
        user: auth.authUser._id,
        otherUser: userId
      });
      setDisable(true);
      dispatch(getAllChatsByUserId({ token: auth.accessToken, id: auth.authUser._id }));
    }
    catch (e: any) {
      toast.error(e.message, {
        position: "top-right"
      })
    }
  }

  return (
    <div className="flex relative" onClick={() => handleClickContact()} ref={contextItem}>
      <div className="flex flex-col w-full hover:bg-slate-100 p-2 gap-1 rounded-md">
        <h3 className="leading-none text-base">
          {name}
        </h3>
        <p className="text-slate-500 text-xs whitespace-nowrap text-ellipsis overflow-hidden hover:whitespace-normal">
          {description}
        </p>
      </div>
      {isOpen && (
        <div className="absolute h-14 bg-white flex justify-center items-center border rounded-md -right-72">
          <form className="flex" onSubmit={(e) => handleSubmit(e)}>
            <div className="w-full h-12 flex justify-between px-2 mx-2 items-center border border-transparent bg-white focus-within:border-slate-300 rounded-lg">
              <InputMessage
                id="text"
                placeholder="Type your message..."
                onBlur={handleBlur}
                onChange={handleChange}
                initialValue={values?.text ? values?.text : ""}
              />
              <button type='submit' disabled={disable}>
                <AiOutlineSend className="h-6 w-6 text-slate-500" />
              </button>
            </div>
          </form >
        </div>
      )}
    </div>
  )
};

// https://teams.microsoft.com/l/meetup-join/19%3ameeting_YmQwOGY5MzUtMzY5OS00NGJjLTlhMDYtMzA2MDFlYzVhMGYx%40thread.v2/0?context=%7b%22Tid%22%3a%22e0793d39-0939-496d-b129-198edd916feb%22%2c%22Oid%22%3a%223e32becf-f369-4e3f-815b-02ff89a1650d%22%7d

/* 
[16:28] Arce, Celeste
    Acciones: Estudiar en pág british counsil. Tomar nuevamente el test EF SET y mejorar english skills a por lo menos B1

*/