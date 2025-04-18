// hooks/useAuth.ts
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useAuth = () => {
  const { user, accessToken, refreshToken } = useSelector(
    (state: RootState) => state.auth
  );
  const isAuthenticated = !!accessToken && !!user;
  return { user, accessToken, refreshToken, isAuthenticated };
};
