import { useState, useRef, useEffect } from "react";
import { ChatInterface, ContactItemProps, UserChat } from "../interfaces/Chat/chat.interface";
import { useMessageText } from "../hooks/useValidFormik";
import { AiOutlineSend } from "react-icons/ai";
import InputMessage from "./Inputs/InputMessage";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { clearCurrentChat } from "../redux/slices/SocialSlice";
import { deleteUserContact, getAllChatsByUserId, getChatsById, postNewChat, putBlockUser } from "../redux/async/socialAsync";
import { toast } from "react-hot-toast";
import { Menu } from "@headlessui/react";
import { SlOptionsVertical } from "react-icons/sl"

export default function ContactItem({ name, description, userId }: ContactItemProps) {

  const dispatch = useAppDispatch()
  const [disable, setDisable] = useState<boolean>(false);
  const { chats, currentChat, friends } = useAppSelector((state: any) => state.social);
  const { authUser, accessToken } = useAppSelector(state => state.auth);
  const [isView, setIsView] = useState<boolean>(true);
  const auth = useAppSelector((state: any) => state.auth);
  const socket = useAppSelector((state: any) => state.socket.socketIo)
  const handleClickContact = () => {
    chats.forEach((el: ChatInterface) => {
      let users = "";
      currentChat?.users.forEach((el: any) => {
        users += el._id
      })
      el.users.forEach((e: UserChat) => {
        if (e._id === userId && !users.includes(userId)) {
          dispatch(clearCurrentChat())
          dispatch(getChatsById({ token: auth.accessToken, id: el._id }))
          return;
        };
      });
    });
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
            toast.error("invalid data.", {
              position: "top-right"
            })
          }
          if (e.includes(400)) {
            toast.error("This user has blocked you.", {
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
      setValues({
        text: ""
      })
      dispatch(getAllChatsByUserId({ token: auth.accessToken, id: auth.authUser._id }));
    }
    catch (e: any) {
      toast.error(e.message, {
        position: "top-right"
      })
    }
  };

  useEffect(() => {
    setIsView(true)
  }, [friends])

  return (
    <>
      {
        isView &&
        <Menu as="div" className="flex">
          <div className="flex w-full rounded-md">
            <Menu.Button className="flex flex-col w-full p-2 hover:bg-slate-100 gap-1"
              onClick={() => handleClickContact()}
            >
              <h3 className="leading-none text-base">
                {name}
              </h3>
              <span className="text-slate-500 text-xs whitespace-nowrap text-ellipsis overflow-hidden">
                {description}
              </span>
            </Menu.Button>
            <Menu as="div" className="flex">
              <Menu.Button className="hover:bg-slate-100 text-slate-500">
                <SlOptionsVertical />
              </Menu.Button>
              <Menu.Items className="absolute -right-[25%]">
                <div className="flex flex-col gap-2 rounded-md bg-white p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  onContextMenuCapture={(e) => e.preventDefault()}
                >
                  <button className="hover:bg-slate-100 p-1 rounded-md flex"
                    onClick={(e) => {
                      dispatch(putBlockUser({ token: accessToken, userId: authUser._id, otherUser: userId, action: "block" }))
                      setIsView(false)
                    }}
                  >
                    Block
                  </button>
                  <button className="hover:bg-slate-100 p-1 rounded-md flex"
                    onClick={(e) => {
                      dispatch(deleteUserContact({ token: accessToken, userId: authUser._id, otherUser: userId }))
                      setIsView(false)
                    }}
                  >
                    Delete
                  </button>
                </div>
              </Menu.Items>
            </Menu>
          </div>
          <Menu.Items aria-disabled={"false"} className="absolute h-14 bg-white flex justify-center items-center border rounded-md -right-72">
            <form className="flex" onSubmit={(e) => handleSubmit(e)}>
              <div className="w-full h-12 flex justify-between px-2 mx-2 items-center border border-transparent bg-white focus-within:border-slate-300 rounded-lg">
                <InputMessage
                  id="text"
                  placeholder="Type your message..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  initialValue={values?.text ? values?.text : ""}
                />
                <button type='submit' >
                  <AiOutlineSend className="h-6 w-6 text-slate-500" />
                </button>
              </div>
            </form >
          </Menu.Items>
        </Menu>
      }
    </>
  )
};

// https://teams.microsoft.com/l/meetup-join/19%3ameeting_YmQwOGY5MzUtMzY5OS00NGJjLTlhMDYtMzA2MDFlYzVhMGYx%40thread.v2/0?context=%7b%22Tid%22%3a%22e0793d39-0939-496d-b129-198edd916feb%22%2c%22Oid%22%3a%223e32becf-f369-4e3f-815b-02ff89a1650d%22%7d

/* 
[16:28] Arce, Celeste
    Acciones: Estudiar en pág british counsil. Tomar nuevamente el test EF SET y mejorar english skills a por lo menos B1

*/