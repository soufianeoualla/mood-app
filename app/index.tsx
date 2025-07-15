import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <TouchableOpacity>
        <Text>
          <Text
            onPress={() => {
              router.replace("/login");
            }}
            style={{
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Go to Login
          </Text>
        </Text>
        <Text>
          <Text
            onPress={() => {
              router.replace("/home");
            }}
            style={{
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Go home
          </Text>
        </Text>
        <Text>
          <Text
            onPress={() => {
              router.replace("/log-mood");
            }}
            style={{
              color: "blue",
              textDecorationLine: "underline",
            }}
          >
            Go mood
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
