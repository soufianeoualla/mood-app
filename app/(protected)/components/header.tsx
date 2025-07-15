import { View, Text } from "react-native";
import React from "react";
import { Logo } from "@/assets";
import Avatar from "@/components/ui/avatar";

const Header = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 48,
      }}
    >
      <Logo />
      <Avatar />
    </View>
  );
};

export default Header;
