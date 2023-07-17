import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";

// FB 로그아웃
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setIspending(true);
    // FB 로그아웃 API
    // try {
    // } catch (err) {
    //   console.log(err);
    // }
    signOut(appAuth)
      .then(() => {
        dispatch({ type: "logout" });
      })
      .catch(err => {
        console.log(err);
      });
  };
  return { error, isPending, logout };
};
