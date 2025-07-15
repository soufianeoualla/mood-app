import { Slot } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "@/assets";
import { AuthGuard } from "@/components/auth-wrappers";

export default function AuthLayout() {
  return (
    <AuthGuard>
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
        <SafeAreaView>
          <View
            style={{
              paddingTop: 50,
              paddingHorizontal: 20,
            }}
          >
            <Logo
              style={{
                margin: "auto",
              }}
            />

            <Slot />
          </View>
        </SafeAreaView>
      </LinearGradient>
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
});
