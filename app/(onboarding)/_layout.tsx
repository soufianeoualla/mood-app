import React from "react";
import { OnboardingGuard } from "@/components/auth-wrappers";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

import { Slot } from "expo-router";

const OnboardingLayout = () => {
  return (
    <OnboardingGuard>
      <LinearGradient
        colors={[
          "rgba(245, 245, 255, 1)",
          "rgba(245, 245, 255, 1)",
          "rgba(224, 224, 255, 1)",
        ]}
        locations={[0, 0.85, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          flex: 1,
        }}
      >
        <StatusBar style="auto" />

        <Slot />
      </LinearGradient>
    </OnboardingGuard>
  );
};

export default OnboardingLayout;
