import { Await, Navigate, Outlet, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../hooks/useRedux";

const AuthenticatedMiddleware = (): any => {
  const { authUser, logged }: any = useAppSelector((state) => state.auth);

  return (
    <Await
      resolve={authUser}
      children={() => (logged === true ? <Outlet /> : <Navigate to="/login" />)}
    />
  );
};

export default AuthenticatedMiddleware;
