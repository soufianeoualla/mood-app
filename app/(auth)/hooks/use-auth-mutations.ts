"use client";

import { AxiosError } from "axios";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/use-auth-store";
import { AuthSchemaType } from "../auth.schema";
import loginService from "../services/login.service";
import signUpService from "../services/sign-up.service";

const useAuthMutation = (isLogin: boolean, reset: () => void) => {
  const { setToken, setUser } = useAuthStore();             
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const mutation = useMutation({
    mutationFn: async (data: AuthSchemaType) => {
      if (isLogin) {
        return await loginService(data);
      } else {
        return await signUpService(data);
      }
    },
    onSuccess: (data) => {
      setSuccessMessage(data.message);
      if (isLogin) {
        setToken(data.token);
        setUser({ ...data.user });
      }
      reset();
      return data;
    },
    onError: (error: AxiosError) => {
      console.error("Error during authentication:", error.response?.data);
      setErrorMessage(
        String(error.response?.data) || `${isLogin ? "Login" : "Signup"} failed`
      );

      return;
    },
  });

  return {
    mutation,
    successMessage,
    errorMessage,
    setSuccessMessage,
    setErrorMessage,
  };
};
export default useAuthMutation;
