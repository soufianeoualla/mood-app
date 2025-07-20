import { Text, View } from "react-native";
import AuthForm from "./components/authForm";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import { Logo } from "@/assets";

const SignUp = () => {
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
    </View>
  );
};

export default SignUp;
