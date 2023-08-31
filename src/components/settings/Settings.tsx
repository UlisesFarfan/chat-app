import { useState } from "react";
import { BsPencil } from "react-icons/bs";
import { RiLogoutBoxLine } from "react-icons/ri";
import { VscKey, VscAccount } from "react-icons/vsc";
import ProfileSettings from "./ProfileSettings";
import AccountSettings from "./AccountSettings";

export default function Settings({ handleLogout }: {
  handleLogout: () => Promise<void>
}) {
  enum Paths {
    PROFILE,
    ACOUNT
  }

  const [currentPath, setCurrentPath] = useState<Paths>(Paths.PROFILE)


  const Tabs = [
    {
      pathName: Paths.PROFILE,
      name: "Profile",
      icon: VscAccount
    },
    {
      pathName: Paths.ACOUNT,
      name: "Account",
      icon: VscKey
    }
  ]


  return (
    <>
      <div className="bg-white w-1/3 flex flex-col p-1">
        {
          Tabs.map((el, index: number) => {
            return (
              <div className={`flex items-center gap-3 w-full p-2 rounded-md cursor-pointer ${currentPath === el.pathName ?
                "bg-slate-100"
                :
                "hover:bg-slate-50"
                }`}
                onClick={() => setCurrentPath(el.pathName)}
                key={index}
              >
                <el.icon
                  className="flex-shrink-0 h-5 w-5 flex items-center text-gray-600"
                  aria-hidden="true"
                />
                {el.name}
              </div>
            )
          })
        }
        <button
          onClick={() => handleLogout()}
          className="flex items-center gap-3 w-full p-2 rounded-md hover:bg-slate-50"
        >
          <RiLogoutBoxLine
            className="flex-shrink-0 h-5 w-5 flex items-center text-gray-500"
            aria-hidden="true"
          />
          Logout
        </button>
      </div>
      {currentPath === Paths.PROFILE && <ProfileSettings />}
      {currentPath === Paths.ACOUNT && <AccountSettings />}
    </>
  )
}