import { IoMdAddCircleOutline } from "react-icons/io";
import InputSearch from "./Inputs/InputSearch";
import { useText } from "../hooks/useValidFormik";
import { BsSearch } from "react-icons/bs";
import { Search, SearchType } from "../interfaces/Search/search.interface";
import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import { getSearchChatByName } from "../redux/async/chatsAsync";
import { useEffect, useState } from "react";
import { getSearchContactByName } from "../redux/async/friendsAsync";

export default function SearchChat({ type, placeholder }: Search) {
  const [value, setValue] = useState<string>("")
  const dispatch = useAppDispatch()
  const auth = useAppSelector(state => state.auth)
  const [controller, setController] = useState<null | AbortController>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
    if (type === SearchType.CHAT) {
      if (controller) controller.abort();
      const newController = new AbortController();
      setController(newController);
      const signal = newController.signal;
      dispatch(getSearchChatByName({
        token: auth.accessToken,
        id: auth.authUser._id,
        userName: e.target.value,
        signal: signal
      }));
    };
    if (type === SearchType.CONTACT) {
      if (controller) controller.abort();
      const newController = new AbortController();
      setController(newController);
      const signal = newController.signal;
      dispatch(getSearchContactByName({
        token: auth.accessToken,
        id: auth.authUser._id,
        userName: e.target.value,
        signal: signal
      }));
    };
  };
  return (
    <form
      className="w-full h-full pr-3 flex justify-between items-center border border-transparent bg-slate-100 focus-within:border-slate-300 hover:border-slate-300 rounded-lg"
      onSubmit={e => e.preventDefault()}
    >
      <InputSearch
        id="text"
        placeholder={placeholder}
        onChange={handleChange}
        initialValue={value}
      />
      <button type='submit'>
        <BsSearch className="h-5 w-5 text-slate-400" />
      </button>
    </form>
  )
}