import { View, ScrollView } from "react-native";

import Greeting from "./components/greeting";

import Header from "./components/header";
import LoggedMood from "./components/logged-mood";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";
import { useMoodContext } from "./context/mood-context";

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
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 20 }}>
        <Greeting />

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
