import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Colors from "@/constants/colors";
import Button from "@/components/ui/button";
import Typography from "@/constants/typography";
import { LockIcon, MailIcon } from "@/assets";
import { useRouter } from "expo-router";
import authSchema, { AuthSchemaType } from "../auth.schema";
import useAuthMutation from "../hooks/use-auth-mutations";
import FormMessage from "./form-message";

const AuthForm = ({ type }: { type?: "login" | "signup" }) => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const {
    mutation,
    errorMessage,
    successMessage,
    setErrorMessage,
    setSuccessMessage,
  } = useAuthMutation(type === "login", reset);

  const onSubmit = async (data: AuthSchemaType) => {
    setErrorMessage("");
    setSuccessMessage("");
    mutation.mutate(data);
  };

  return (
    <View style={styles.container}>
      {/* Email Field */}
      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Email address</Text>
        <View style={styles.inputWrapper}>
          <MailIcon
            color={Colors.neutral[600]}
            style={[
              styles.icon,
              {
                top: 23,
              },
            ]}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="name@mail.com"
                keyboardType="email-address"
              />
            )}
          />
        </View>
        {errors.email && (
          <Text style={styles.error}>* {errors.email.message}</Text>
        )}
      </View>

      {/* Password Field */}
      <View style={styles.fieldWrapper}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrapper}>
          <LockIcon color={Colors.neutral[600]} style={styles.icon} />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="*******"
                secureTextEntry
              />
            )}
          />
        </View>
        {errors.password && (
          <Text style={styles.error}>* {errors.password.message}</Text>
        )}
      </View>

      {/* Forgot Password */}
      <TouchableOpacity
        style={styles.forgotWrapper}
        onPress={() => router.push("/forgot-password")}
      >
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <FormMessage message={errorMessage} isError />
      <FormMessage message={successMessage} />

      {/* Submit Button */}
      <Button
        onPress={handleSubmit(onSubmit)}
        buttonText={type === "login" ? "Log In" : "Sign Up"}
      />

      {/* Switch between login/signup */}
      <TouchableOpacity
        style={styles.switchWrapper}
        onPress={() => router.replace(type === "login" ? "/sign-up" : "/login")}
      >
        <Text style={styles.switchText}>
          {type === "login"
            ? "Haven't got an account? "
            : "Already have an account? "}
          <Text style={styles.switchActionText}>
            {type === "login" ? "Sign Up" : "Log In"}
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
  },
  fieldWrapper: {
    marginBottom: 20,
  },
  label: {
    ...Typography.preset6,
    color: Colors.neutral[900],
  },
  inputWrapper: {
    position: "relative",
  },
  icon: {
    position: "absolute",
    top: 20,
    left: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    paddingHorizontal: 42,
    height: 52,
    borderRadius: 10,
    ...Typography.preset6,
    marginTop: 8,
  },
  error: {
    color: Colors.red[700],
    ...Typography.preset8,
    marginTop: 10,
  },
  forgotWrapper: {
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  forgotText: {
    color: Colors.blue[600],
    ...Typography.preset7,
  },
  switchWrapper: {
    marginTop: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  switchText: {
    color: Colors.neutral[600],
    ...Typography.preset6,
  },
  switchActionText: {
    color: Colors.blue[600],
  },
});
