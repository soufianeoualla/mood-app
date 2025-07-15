import {
  RedditSans_300Light,
  RedditSans_400Regular,
  RedditSans_500Medium,
  RedditSans_700Bold,
  RedditSans_900Black,
  useFonts,
} from "@expo-google-fonts/reddit-sans";
import { Stack } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Reddit Sans": RedditSans_400Regular,
    "Reddit Sans Light": RedditSans_300Light,
    "Reddit Sans Medium": RedditSans_500Medium,
    "Reddit Sans Bold": RedditSans_700Bold,
    "Reddit Sans Black": RedditSans_900Black,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(protected)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
