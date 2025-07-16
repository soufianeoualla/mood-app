import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import useAuthStore from "@/store/use-auth-store";
import { format } from "date-fns";

const Greeting = () => {
  const { user } = useAuthStore();
  const firstName = user?.name?.split(" ")[0] || "There";
  const today = new Date();
  const formattedDay = format(today, "EEEE, MMMM do, yyyy");
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>Welcome, {firstName}!</Text>
      <Text style={styles.welcomeText}>How are you feeling today?</Text>
      <Text style={styles.dateText}>{formattedDay}</Text>
    </View>
  );
};

export default Greeting;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  greetingText: {
    color: Colors.blue[600],
    ...Typography.preset3,
    textTransform: "capitalize",
  },
  dateText: {
    marginTop: 16,
    color: Colors.neutral[600],
    ...Typography.preset6,
  },
  welcomeText: {
    textAlign: "center",
    color: Colors.neutral[900],
    ...Typography.preset1,
    marginTop: 16,
  },
});
