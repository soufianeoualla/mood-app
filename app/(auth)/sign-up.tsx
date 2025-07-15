import { Text } from "react-native";
import React, { Fragment } from "react";
import AuthForm from "./components/authForm";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";


const SignUp = () => {
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
        Create an account
      </Text>
      <Text
        style={{
          ...Typography.preset6Regular,
          color: Colors.neutral[600],
        }}
      >
        Join to track your daily mood and sleep with ease.
      </Text>

      <AuthForm type="signup" />
    </Fragment>
  );
};

export default SignUp;
