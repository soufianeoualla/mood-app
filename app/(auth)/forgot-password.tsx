import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { Fragment, useState } from "react";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import Popup from "@/components/ui/popup";
import { useMutation } from "@tanstack/react-query";
import forgotPasswordService from "./services/forgot-password.service";
import { AxiosError } from "axios";
import Button from "@/components/ui/button";
import { ChevronLeftIcon } from "@/assets";
import { useRouter } from "expo-router";
import { z } from "zod";

const schema = z.object({
  email: z.email(),
});

const ForgotPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { mutate, isError, isPending } = useMutation({
    mutationFn: async (email: string) => forgotPasswordService(email),
    onSuccess: (data) => {
      setMessage("Password reset link sent to your email.");
      setError("");
      setShowPopup(true);
    },
    onError: (error: AxiosError) => {
      setError(error.message);
      setMessage(error.request.data || "An error occurred");
      setShowPopup(true);
    },
  });

  const handleForgotPassword = () => {
    setError("");
    const result = schema.safeParse({ email });
    if (!result.success) {
      setError("Please enter a valid email address.");
      return;
    }

    mutate(email);
  };

  return (
    <Fragment>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeftIcon color={Colors.neutral[900]} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Forgot your password?</Text>
        <Text style={styles.description}>
          Enter your email address below, and we will send you a link to reset
          your password.
        </Text>

        <TextInput
          style={styles.input}
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => setEmail(text)}
        />
        {error && <Text style={styles.error}>* {error}</Text>}

        <Button
          buttonText="Send Reset Link"
          isLoading={isPending}
          onPress={handleForgotPassword}
        />
      </View>

      <Popup
        isVisible={showPopup}
        isError={isError}
        message={message}
        onClose={() => {
          setShowPopup(false);
          setError("");
          setMessage("");
          setEmail("");
        }}
      />
    </Fragment>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderColor: Colors.blue[200],
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  container: {
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 32,
    marginBottom: 8,
    ...Typography.preset3,
    color: Colors.neutral[900],
  },
  description: {
    ...Typography.preset6Regular,
    color: Colors.neutral[600],
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    paddingHorizontal: 20,
    height: 52,
    borderRadius: 10,
    marginTop: 8,
    ...Typography.preset6,
    marginBottom: 20,
  },
  error: {
    color: Colors.red[700],
    ...Typography.preset8,
    marginTop: 10,
    marginBottom: 16,
  },
});
