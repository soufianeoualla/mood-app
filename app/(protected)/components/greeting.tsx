import { View, Text } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import useAuthStore from "@/store/use-auth-store";
import { format } from "date-fns";
import Button from "@/components/ui/button";

const Greeting = () => {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(" ")[0] || "There";
  const today = new Date();
  const formattedDay = format(today, "EEEE, MMMM do, yyyy");
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: Colors.blue[600],
          ...Typography.preset3,
          textTransform: "capitalize",
        }}
      >
        Welcome, {firstName}!
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: Colors.neutral[900],
          ...Typography.preset1,
          marginTop: 16,
        }}
      >
        How are you feeling today?
      </Text>
      <Text
        style={{
          marginTop: 16,
          color: Colors.neutral[600],
          ...Typography.preset6,
        }}
      >
        {formattedDay}
      </Text>
      <Button
        buttonText="Log today's mood"
        styles={{
          container: {
            marginTop:48,
            width: "auto",
            paddingHorizontal: 32,
            paddingVertical: 12,
          },
        }}
      />
    </View>
  );
};

export default Greeting;
