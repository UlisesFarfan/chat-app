import { useEffect } from "react";
import Kpi from "../components/Kpi"
import { useAppDispatch, useAppSelector } from "../hooks/useRedux"
import { getKpisUsers } from "../redux/async/friendsAsync";

export default function Dashboard() {

  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const { friends_number, friends_online, users_total, users_online, users_blocked, requests_number } = useAppSelector(state => state.social)
  const socket = useAppSelector(state => state.socket.socketIo);

  useEffect(() => {
    if (!friends_number && !friends_online && !users_total && !users_online && !users_blocked && !requests_number) {
      dispatch(getKpisUsers({ token: auth.accessToken, id: auth.authUser._id }))
        .unwrap()
        .then((res: any) => {
          socket.emit("getUsersOnline", {
            userId: auth.authUser._id,
            contacts: res.contacts
          })
        });
    };
  }, [])

  return (
    <div className="h-full flex lg:ml-52 bg-gray-200">
      <div className="flex p-6 w-full overflow-x-scroll hidden-scroll overscroll-contain snap-proximity gap-6 justify-between">
        <Kpi
          title="Total Users"
          number={users_total}
          second_title="Online"
          second_number={users_online}
        />
        <Kpi
          title="Contacts"
          number={friends_number}
          second_title="Online"
          second_number={friends_online}
        />
        <Kpi
          title="Users Blocked"
          number={users_blocked}
        />
        <Kpi
          title="Requests"
          number={requests_number}
        />
      </div>
    </div>
  )
}