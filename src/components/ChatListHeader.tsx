import { Menu } from "@headlessui/react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SearchType, SearchWhere } from "../interfaces/Search/search.interface";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { addUserContact, getAllContactsByUserId } from "../redux/async/socialAsync";
import Loading from "./Loading";
import Search from "./Search";
import ContactItem from "./ContactItem";
import { PropsFriend } from "../interfaces/Chat/friend.interface";
import { useLocation } from "react-router-dom";
import InputMessage from "./Inputs/InputMessage";
import { useMessageText } from "../hooks/useValidFormik";
import { AiOutlineSend } from "react-icons/ai";
import { toast } from "react-hot-toast";

export default function ChatListHeader({ token, id }: any) {
  const dispatch = useAppDispatch()
  const { friends } = useAppSelector(state => state.social)
  const location = useLocation()
  const handleGetContacts = () => {
    dispatch(getAllContactsByUserId({ token, id }));
  }
  const auth = useAppSelector((state: any) => state.auth);
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
    //"userId":"6417f66e0a6ba1a5f7f84e0c","contactId": "64a6e8ad898ec62b432223fa"
    dispatch(addUserContact({
      token: auth.accessToken,
      body: {
        userId: auth.authUser._id,
        userTag: values.text
      }
    })).unwrap()
      .catch((e: any) => {
        if(e.includes("404")){
          toast.error("User not found.",{
            position: "top-center"
          })
        }
      })
  }

  return (
    <div className="border-b flex flex-col justify-between bg-white relative items-center w-full p-2 gap-2 shadow-sm">
      <div className="flex w-full justify-between h-8">
        <h2 className="text-slate-600">
          {
            location.pathname.includes("archive") ?
              "Archive"
              :
              "Chat"
          }
        </h2>
        {!location.pathname.includes("archive") &&
          <>
            <Menu as="div" className="h-full flex">
              <Menu.Button onClick={handleGetContacts} className="px-2 h-full bg-white outline outline-0 hover:outline-1 flex items-center hover:outline-slate-300 rounded-lg text-slate-400 hover:text-slate-500">
                <IoMdAddCircleOutline className="h-6 w-6" />
              </Menu.Button>
              <Menu.Items aria-disabled={"false"} className="absolute left-0 z-10 mt-8 border w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-black ring-opacity-5 focus:outline-none">
                <div className="h-14 p-2">
                  <Search where={SearchWhere.CONTACT} placeholder="Search a contact..." />
                </div>
                <div className="p-2 max-h-[15rem] overflow-y-auto">
                  {
                    friends !== null ?
                      friends.length === 0 ?
                        <div className="px-2 h-36 w-full border flex-col bg-white border-transparent flex justify-center items-center rounded-md text-sm text-slate-400">
                          <IoMdAddCircleOutline className="h-10 w-10" />
                          Add a Contact.
                        </div>
                        :
                        friends.map((el: PropsFriend, index: number) => {
                          return (
                            <ContactItem name={el.name} description={el.description} userId={el._id} key={index} />
                          )
                        })
                      : <Loading />
                  }
                </div>
                <div className="h-14 p-2">
                  <form
                    className="w-full h-full pr-3 flex justify-between items-center border focus-within:border-slate-300 hover:border-slate-300 rounded-lg"
                    onSubmit={(e) => handleSubmit(e)}
                  >
                    <InputMessage
                      id="text"
                      placeholder="Add by tag..."
                      onBlur={handleBlur}
                      onChange={handleChange}
                      initialValue={values?.text ? values?.text : ""}
                    />
                    <button type='submit' >
                      <AiOutlineSend className="h-6 w-6 text-slate-400" />
                    </button>
                  </form >
                </div>
              </Menu.Items>
            </Menu>
          </>
        }
      </div >
      <div className="h-8">
        <Search where={SearchWhere.CHAT} type={
          location.pathname.includes("archive") ?
            SearchType.ARCHIVE
            :
            SearchType.UNARCHIVE
        } placeholder="Search a chat..." />
      </div>
    </div >
  )
}