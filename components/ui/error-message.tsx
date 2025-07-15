import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { InfoIcon } from "@/assets";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <View style={styles.container}>
      <InfoIcon color={Colors.red[700]} width={28} height={28} />

      <Text style={styles.errorMessage}>{message}</Text>
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    gap: 8,
    backgroundColor: "hsla(352, 100%, 45%, 0.1)",
    borderRadius: 8,
    marginBottom: 16,
    marginTop: 20,
  },
  errorMessage: {
    color: Colors.red[700],
    ...Typography.preset7,
  },
});
