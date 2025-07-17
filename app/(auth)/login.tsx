import { Text } from "react-native";

import React, { Fragment } from "react";

import AuthForm from "./components/authForm";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";

const Login = () => {
  return (
    <Fragment>
      <Text
        style={{
          marginTop: 32,
          ...Typography.preset1,
          color: Colors.neutral[900],
          marginBottom: 8,
        }}
      >
        Welcome back!
      </Text>
      <Text
        style={{
          ...Typography.preset6Regular,
          color: Colors.neutral[600],
        }}
      >
        Log in to continue tracking your mood and sleep.
      </Text>

      <AuthForm type="login" />
    </Fragment>
  );
};

export default Login;
