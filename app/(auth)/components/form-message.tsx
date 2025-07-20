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
  if (!message) return null;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 8,
        backgroundColor: isError
          ? "hsla(352, 100%, 45%, 0.1)"
          : "hsla(158, 60%, 52%, 0.1)",
        borderRadius: 10,
        marginBottom: 16,
      }}
    >
      {isError ? (
        <InfoIcon color={Colors.red[700]} width={28} height={28} />
      ) : (
        <CircleCheckIcon color={Colors.emeraled[300]} width={28} height={28} />
      )}
      <Text
        style={{
          color: isError ? Colors.red[700] : Colors.emeraled[300],
          ...Typography.preset7,
          flexShrink: 1,
        }}
      >
        {message}
      </Text>
    </View>
  );
};

export default FormMessage;
