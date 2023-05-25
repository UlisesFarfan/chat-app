import { Fragment, useContext, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  Bars3CenterLeftIcon,
  XMarkIcon,
  ChevronDownIcon,
  HomeIcon
} from "@heroicons/react/24/outline";
import { Outlet } from 'react-router-dom'
import { TbMessages } from "react-icons/tb";
import { FaUsers } from 'react-icons/fa'
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { LogoutAsync } from '../redux/async/authAsync'
import { useLocation } from "react-router-dom";
import { logoutSocket } from "../redux/async/socketAsync";
import { Toaster } from "react-hot-toast";

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Layout() {
  const dispatch = useAppDispatch();
  const params = useLocation()
  const { authUser, logged }: any = useAppSelector((state: any) => state.auth);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navigation, setNavigation] = useState([
    {
      name: "Dashboard",
      href: "/",
      icon: HomeIcon,
      current: false,
    },
    {
      name: "Chats",
      href: "/chats",
      icon: TbMessages,
      current: false,
    },
    {
      name: "Contact",
      href: "/contacts",
      icon: FaUsers,
      current: false,
    }
  ]);
  useEffect(() => {
    let activeNav = navigation.map((el) =>
      params.pathname.length > 1 ?
        params.pathname.includes(el.href) && el.href.length > 1
          ? { ...el, current: true }
          : { ...el, current: false }
        : params.pathname.includes(el.href)
          ? { ...el, current: true }
          : { ...el, current: false }
    );
    setNavigation(activeNav);
  }, [params]);

  const handleLogout = async () => {
    await dispatch(LogoutAsync())
      .unwrap()
      .then(() => { })
      .catch((err: any) => { });
    dispatch(logoutSocket(authUser._id))
  };

  return (
    <>
      <div className="flex flex-col h-screen">
        <Toaster
          position="bottom-right"

        />
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        type="button"
                        className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <p className="text-xs font-medium text-gray-400">MAIN</p>
                  <div className="mt-5 h-0 flex-1 overflow-y-auto">
                    <nav>
                      <div className="space-y-1">
                        {navigation.map((item) => (
                          <NavLink
                            key={item.name}
                            to={item.href}
                            className={classNames(
                              item.current
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                              "group border-l-4 py-2 px-3 flex items-center text-base font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-indigo-500"
                                  : "text-gray-400 group-hover:text-gray-500",
                                "mr-4 flex-shrink-0 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            {item.name}
                          </NavLink>
                        ))}
                      </div>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className="w-14 flex-shrink-0" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-52 lg:flex-col lg:border-r z-10 lg:border-gray-300 lg:bg-gray-100 lg:pb-4">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="mt-5 flex h-0 flex-1 flex-col overflow-y-auto pt-1">
            {/* User account dropdown */}
            <Menu as="div" className="relative inline-block px-3 text-left">
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              ></Transition>
            </Menu>
            {/* Navigation */}
            <h1 className="text-xl ml-6 font-medium text-gray-400">CHAT APP</h1>
            <nav className="mt-6 h-full flex flex-col justify-between">
              <div className="space-y-1">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? "border-indigo-600 text-indigo-600"
                        : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-600",
                      "group border-l-4 py-2 px-3 flex items-center text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    <item.icon
                      className={
                        "mr-3 flex-shrink-0 h-6 w-6"
                      }
                      aria-hidden="true"
                    />
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <NavLink to="/aboutme" className="w-full flex items-center text-base font-medium gap-2 text-center border py-2 justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-600">
                ABOUT ME<AiOutlineQuestionCircle />
              </NavLink>
            </nav>
          </div>
        </div>
        <div className="flex flex-1 flex-col lg:ml-52">
          <div className="flex h-16 flex-shrink-0 border-b border-gray-300 bg-white fixed inset-x-0">
            <button
              type="button"
              className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex flex-1 justify-end px-6">

              <div className="flex items-center">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="hover:text-gray-500 text-gray-400 w-8 h-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="ml-1 hidden flex w-24 text-sm font-medium text-gray-700 lg:block">
                        {authUser?.name}
                      </span>
                      <ChevronDownIcon
                        className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <>
                            <button
                              onClick={() => { }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              Perfile
                            </button>
                            <button
                              onClick={() => {
                                handleLogout()
                              }}
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                            >
                              Logout
                            </button>
                          </>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-16 w-full h-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};
