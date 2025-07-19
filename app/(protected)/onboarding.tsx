import { ScrollView, View } from "react-native";
import React, { useState } from "react";
import ProfileForm, { ProfileSchemaType } from "@/components/profile-form";
import useAuthStore from "@/store/use-auth-store";
import onboardingService from "./services/onboarding.service";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Popup from "@/components/ui/popup";
import { Logo } from "@/assets";

const Onboarding = () => {
  const { setUser } = useAuthStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: ProfileSchemaType) => onboardingService(data),
  });

  const onSubmit = (data: ProfileSchemaType) => {
    setErrorMessage("");
    mutate(data, {
      onSuccess: (response) => {
        setUser(response.user);
      },
      onError: (err: unknown) => {
        if (err instanceof AxiosError)
          setErrorMessage(err?.response?.data || "Failed to submit the form");
      },
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Logo
        style={{
          margin: "auto",
          marginBottom: 32,
          marginTop: 20,
        }}
      />

      <ProfileForm
        buttonText="Start Tracking"
        onSubmit={onSubmit}
        isPending={isPending}
        description="Add your name and a profile picture to make Mood yours."
        title="Personalize your experience"
      />
      <Popup
        isVisible={showPopup}
        isError={isError}
        onClose={() => {
          setShowPopup(false);
        }}
        message={errorMessage}
      />
    </View>
  );
};

export default Onboarding;
