import { Await, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/useRedux";

const LoggedMiddleware = () => {
  const { authUser, logged } : any = useAppSelector((state) => state.auth);
  const history = useAppSelector((state: any) => state.history);
  return (
    <Await
      resolve={authUser}
      children={() =>
        logged === true ? (
          <Navigate
            to={
              history.rootLocation && history.rootLocation.pathname != "/login"
                ? history.rootLocation.pathname
                : "/"
            }
          />
        ) : (
          <Outlet />
        )
      }
    />
  );
};

export default LoggedMiddleware;
