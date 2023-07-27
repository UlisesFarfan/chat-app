import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SearchType } from "../interfaces/Search/search.interface";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { getAllContactsByUserId } from "../redux/async/friendsAsync";
import Loading from "./Loading";


import Search from "./Search";
import ContactItem from "./ContactItem";
import { PropsFriend } from "../interfaces/Chat/friend.interface";

export default function ChatListHeader({ token, id }: any) {
  const dispatch = useAppDispatch()
  const { friends } = useAppSelector(state => state.social)

  const handleGetContacts = () => {
    dispatch(getAllContactsByUserId({ token, id }));
  }

  return (
    <div className="border-b flex justify-between bg-white relative items-center w-full p-2 gap-1 h-14 shadow-sm">
      <Search type={SearchType.CHAT} placeholder="Search a chat..." />
      <Menu as="div" className="h-full flex">
        <Menu.Button onClick={handleGetContacts} className="px-2 h-full border bg-slate-100 border-transparent flex items-center hover:border-slate-300 rounded-lg text-slate-400 hover:text-slate-500">
          <IoMdAddCircleOutline className="h-6 w-6" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items aria-disabled={"false"} className="absolute left-0 z-10 mt-12 w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-black ring-opacity-5 focus:outline-none">
            <div className="h-14 p-2">
              <Search type={SearchType.CONTACT} placeholder="Search a contact..." />
            </div>
            <div className="p-2">
              {
                friends !== null ?
                  friends.length === 0 ?
                    <div className="px-2 h-36 border flex-col bg-slate-100 border-transparent flex justify-center items-center hover:border-slate-300 rounded-lg text-slate-400 hover:text-slate-500">
                      <IoMdAddCircleOutline className="h-1/2 w-1/2" />
                      Add a Contact.
                    </div>
                    :
                    <div>
                      {
                        friends.map((el: PropsFriend, index: number) => {
                          return (
                            <ContactItem name={el.name} description={el.description} userId={el._id} key={index} />
                          )
                        })
                      }
                    </div>
                  : <Loading />
              }
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}