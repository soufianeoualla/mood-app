import { View, ScrollView, Text } from "react-native";

import Button from "@/components/ui/button";
import { useRouter } from "expo-router";

import { useMoodContext } from "./context/mood-context";
import Header from "./components/header";
import Greeting from "./components/greeting";
import LoggedMood from "./components/logged-mood";

const Home = () => {
  const router = useRouter();
  const { currentMoodEntry } = useMoodContext();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 30 }}>
        <Greeting />
        <Text onPress={() => router.push("/onboarding")}>go onboarding</Text>
        <Text onPress={() => router.push("/settings")}>go settings</Text>
        <Text onPress={() => router.push("/inseights")}>go iseights</Text>


        {currentMoodEntry ? (
          <LoggedMood />
        ) : (
          <Button
            onPress={() => router.push("/log-mood")}
            buttonText="Log today's mood"
            styles={{
              container: {
                marginTop: 48,
                width: "auto",
                paddingHorizontal: 32,
                paddingVertical: 12,
              },
            }}
          />
        )}
      </ScrollView>
      
    </View>
  );
};

export default Home;
