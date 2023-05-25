import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { SearchType } from "../interfaces/Search/search.interface";
import Search from "./Search";

export default function ChatListHeader() {
  return (
    <>
      <div className="border-b flex justify-between relative items-center w-full px-2 gap-1 py-2 h-14 shadow-sm">
        <Search type={SearchType.CHAT} />
        <Menu as="div" className="h-full flex">
          <div>
            <Menu.Button className="px-2 h-full border border-transparent flex items-center hover:border-slate-300 rounded-lg text-slate-400 hover:text-slate-500">
              <IoMdAddCircleOutline className="h-6 w-6" />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-10 w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <Menu.Item>
                <div className="h-80">

                </div>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  )
}