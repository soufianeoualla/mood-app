import { View, StyleSheet } from "react-native";
import React from "react";
import { Slot } from "expo-router";
import { ProtectedRoute } from "@/components/auth-wrappers";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { LogMoodProvider } from "./context/log-mood-context";
import { MoodProvider } from "./context/mood-context";

const Layout = () => {
  return (
    <ProtectedRoute>
      <MoodProvider>
        <LogMoodProvider>
          <LinearGradient
            colors={[
              "rgba(245, 245, 255, 1)",
              "rgba(245, 245, 255, 1)",
              "rgba(224, 224, 255, 1)",
            ]}
            locations={[0, 0.85, 1]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.background}
          >
            <StatusBar style="auto" />
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  paddingTop: 10,
                  flex: 1,
                }}
              >
                <Slot />
              </View>
            </SafeAreaView>
          </LinearGradient>
        </LogMoodProvider>
      </MoodProvider>
    </ProtectedRoute>
  );
};

export default Layout;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
