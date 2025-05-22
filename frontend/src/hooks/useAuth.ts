// hooks/useAuth.ts
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAuth = () => {
  const { accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );
  const user = JSON.parse(localStorage.getItem("user")!)
  const isAuthenticated = !!accessToken && !!user;
  return { user, accessToken, refreshToken, isAuthenticated };
};
