import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux";
import { getContactBlocked } from "../../redux/async/socialAsync";
import { FaTrash } from "react-icons/fa";
import { deleteMyAccount } from "../../redux/async/authAsync";
export default function AccountSettings() {

  const dispatch = useAppDispatch();
  const { block_users } = useAppSelector(state => state.social);
  const { authUser, accessToken } = useAppSelector(state => state.auth);
  const [check, setCheck] = useState<boolean>(false)
  useEffect(() => {
    dispatch(getContactBlocked({
      userId: authUser._id,
      token: accessToken
    }));
  }, []);

  return (
    <div className="bg-slate-50 w-2/3 flex flex-col gap-4 p-3">
      <h2>Account</h2>
      <div className="flex gap-2 text-center items-center">
        <span>Delete your account.</span>
        <button className="p-2 text-center bg-rose-500 text-slate-50 rounded-md hover:bg-rose-600"
          onClick={() => setCheck(true)}
        >
          <FaTrash />
        </button>
        {check &&
          <div className="fixed h-screen w-screen flex z-10 justify-center items-center bg-transpatent bottom-0 left-0">
            <div className="p-2 gap-2 rounded-md bg-white border flex flex-col opacity-100">
              <span className="text-slate-500">
                Are you sure?
              </span>
              <div className="gap-2 flex">
                <button className="p-2 text-center bg-rose-500 text-slate-50 rounded-md hover:bg-rose-600"
                  onClick={() => {
                    dispatch(deleteMyAccount({
                      token: accessToken,
                      userId: authUser._id,
                      email: authUser.email
                    }));
                  }}
                >
                  Delete
                </button>
                <button className="p-2 text-center bg-slate-50 text-slate-900 border rounded-md hover:bg-slate-100"
                  onClick={() => setCheck(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        }
      </div>
      <section>
        <span>Blocked contacts: {block_users == null ? "0" : block_users.length}</span>
      </section>
    </div>
  )
}