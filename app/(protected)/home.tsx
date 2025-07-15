import { View, Text } from "react-native";
import React from "react";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import useAuthStore from "@/store/use-auth-store";
import Greeting from "./components/greeting";
import { Logo } from "@/assets";
import Avatar from "@/components/ui/avatar";
import Header from "./components/header";

const Home = () => {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(" ")[0] || "There";

  return (
    <View
      style={{
        paddingHorizontal: 20,
      }}
    >
      <Header />
      <Greeting />
    </View>
  );
};

export default Home;
