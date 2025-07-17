"use client";

import React, { useEffect } from "react";

import { useRouter } from "expo-router";
import useAuthStore from "@/store/use-auth-store";
import Loader from "./ui/loader";

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const { initializeAuth, isLoading, user, isInitialized } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      }
    };

    initialize();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isInitialized) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (user && user.onboardingComplete === false) {
      router.push("/onboarding");
      return;
    }
  }, [isInitialized, user, router]);

  if (isLoading || !isInitialized) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

const AuthGuard = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const { initializeAuth, isLoading, user, isInitialized } = useAuthStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeAuth();
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
      }
    };

    initialize();
  }, [initializeAuth]);

  useEffect(() => {
    if (!isInitialized) return;

    if (user) {
      if (user.onboardingComplete === false) {
        router.replace("/onboarding");
      } else if (user.onboardingComplete === true) {
        router.replace("/");
      }
    }
  }, [isInitialized, user, router]);

  if (isLoading || !isInitialized) {
    return <Loader />;
  }

  if (user) {
    return null;
  }

  return <>{children}</>;
};

const OnboardingGuard = ({ children }: { children?: React.ReactNode }) => {
  const router = useRouter();
  const { isLoading, user, isInitialized } = useAuthStore();

  useEffect(() => {
    if (user && user.onboardingComplete === true) {
      router.push("/");
      return;
    }
  }, [isInitialized, user, router]);

  if (isLoading || !isInitialized) {
    return <Loader />;
  }

  if (!user || user.onboardingComplete === true) {
    return null;
  }

  return <>{children}</>;
};

export { ProtectedRoute, AuthGuard, OnboardingGuard };
export default ProtectedRoute;
