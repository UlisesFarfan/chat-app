import { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FiMessageSquare } from "react-icons/fi";
import { BsArchive } from "react-icons/bs"
import { RiLogoutBoxLine, RiNotificationLine } from "react-icons/ri"
import { VscSettingsGear } from "react-icons/vsc"
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { LogoutAsync } from '../redux/async/authAsync'
import { useLocation } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Settings from "../components/settings/Settings";
import Tooltip from "../components/Tooltip";

function classNames(...classes: String[]) {
  return classes.filter(Boolean).join(" ");
}
export default function Layout() {
  const dispatch = useAppDispatch();
  const params = useLocation()
  const { authUser }: any = useAppSelector((state: any) => state.auth);
  const socket = useAppSelector(state => state.socket.socketIo);
  const [navigation, setNavigation] = useState([
    {
      name: "Chats",
      href: "/",
      icon: FiMessageSquare,
      current: false,
    },
    {
      name: "Archive",
      href: "/archive",
      icon: BsArchive,
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
    socket.emit("logout", authUser._id);
    location.reload()
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="fixed inset-y-0 flex w-16 flex-col border-r z-10 border-gray-300 bg-white pb-4">
        <div className="mt-5 w-full flex h-0 flex-1 flex-col pt-1">
          {/* Navigation */}
          <nav className="h-full flex flex-col">
            {navigation.map((item) => (
              <Tooltip tooltip={item.name} key={item.name}>
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? "border-indigo-600 text-indigo-600"
                      : "border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-600",
                    "pr-4 group border-l-4 py-2 px-3 flex items-center justify-center text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={
                      "flex-shrink-0 h-6 w-6 flex items-center"
                    }
                    aria-hidden="true"
                  />
                </NavLink>
              </Tooltip>
            ))}
          </nav>
        </div>
        <div className="w-full gap-2 flex flex-col items-center justify-center">
          <Menu as="div" className="relative">
            <Tooltip tooltip="Settings">
              <Menu.Button className="py-2 px-3">
                <VscSettingsGear
                  className="flex-shrink-0 h-6 w-6 flex items-center text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                  aria-hidden="true"
                />
              </Menu.Button>
            </Tooltip>
            <Menu.Items aria-disabled={"false"} className="absolute rounded-md h-[35rem] w-[100vw] border flex -left-[20%] bottom-[80%] sm:w-[25rem] sm:left-[90%]">
              <Settings handleLogout={handleLogout} />
            </Menu.Items>
          </Menu>
          <Menu as="div" className="relative">
            <Tooltip tooltip="About Me">
              <Menu.Button className="py-2 px-3">
                <AiOutlineQuestionCircle
                  className="flex-shrink-0 h-6 w-6 flex items-center text-gray-500 hover:bg-gray-50 hover:text-gray-600"
                  aria-hidden="true"
                />
              </Menu.Button>
            </Tooltip>
            <Menu.Items>
            </Menu.Items>
          </Menu>
        </div>
      </div >
      <div className="w-full h-full">
        <Outlet />
      </div>
    </div >
  );
};
