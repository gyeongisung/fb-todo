import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router";

// FB 로그아웃
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIspending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const logout = async () => {
    setError(null);
    setIspending(true);
    // FB 로그아웃 API
    try {
      await signOut(appAuth);
      dispatch({ type: "logout" });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return { error, isPending, logout };
};
