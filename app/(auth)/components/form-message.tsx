import { View, Text } from "react-native";
import React from "react";
import { CircleCheckIcon, InfoIcon } from "@/assets";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

const FormMessage = ({
  message,
  isError = false,
}: {
  message: string;
  isError?: boolean;
}) => {
  if(!message) return null;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 8,
        backgroundColor: isError
          ? "hsla(352, 100%, 45%, 0.1)"
          : "hsla(115, 69%, 70%, 0.1)",
        borderRadius: 8,
        marginBottom: 16,
      }}
    >
      {isError ? (
        <InfoIcon color={Colors.red[700]} width={28} height={28}/>
      ) : (
        <CircleCheckIcon color={Colors.green[300]}width={28} height={28} />
      )}
      <Text
        style={{
          color: isError ? Colors.red[700] : Colors.green[300],
          ...Typography.preset7,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default FormMessage;
