import { View } from "react-native";
import React from "react";
import { Logo } from "@/assets";
import Avatar from "@/components/ui/avatar";
import useAuthStore from "@/store/use-auth-store";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 48,
        paddingHorizontal: 20,
      }}
    >
      <Logo />
      <Avatar imageUrl={user?.cover} />
    </View>
  );
};

export default Header;
