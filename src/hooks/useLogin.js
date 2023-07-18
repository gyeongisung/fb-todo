import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router";

// Firebase 로그인 커스텀 훅
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        appAuth,
        email,
        password,
      );
      const user = userCredential.user;
      dispatch({ type: "login", payload: user });
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return { error, isPending, login };
};
