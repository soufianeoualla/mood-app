import { Text, View } from "react-native";

import AuthForm from "./components/authForm";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import { Logo } from "@/assets";

const Login = () => {
  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Logo
        style={{
          margin: "auto",
          marginTop: 48,
        }}
      />
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
    </View>
  );
};

export default Login;
