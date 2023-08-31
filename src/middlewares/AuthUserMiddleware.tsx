import { Suspense, useCallback, useEffect, useMemo } from "react";
import { Await, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { RefreshAsync } from "../redux/async/authAsync";

const AuthUserMiddleware = (): any => {
  const { authUser, loading }: any = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const getUserByRefresh = useCallback(() => {
    dispatch(RefreshAsync())
      .unwrap()
      .then(() => { })
      .catch((err: any) => { });
  }, []);

  useMemo(() => {
    if (!authUser) {
      getUserByRefresh();
    }
  }, [authUser]);

  return (
    <Suspense>
      <Await
        resolve={authUser}
        children={() =>
          loading === true ? <>Loading</> : <Outlet />
        }
      />
    </Suspense>
  );
};

export default AuthUserMiddleware;
