import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { Pressable } from "react-native";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  size?: number;
}) {
  return <Ionicons {...props} />;
}
const tabBarStyle = {
  backgroundColor: Colors.neutral[0],
  borderWidth: 1,
  marginHorizontal: 8,
  borderRadius: 40,
  borderColor: Colors.blue[100],
  paddingBottom: 8,
  marginVertical: 8,
  paddingTop: 8,
  height: 70,
  elevation: 3,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: -1,
  },
  shadowOpacity: 0.1,
  shadowRadius: 2,
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.blue[600],
        tabBarInactiveTintColor: Colors.neutral[300],

        tabBarLabelStyle: {
          ...Typography.preset8,
        },

        headerShown: false,
        tabBarButton: (props) => (
          //@ts-ignore
          <Pressable {...props} android_ripple={{ foreground: false }} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused, size = 36 }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
          sceneStyle: {
            backgroundColor: "transparent",
          },
          tabBarStyle: {
            ...tabBarStyle,
            position: "absolute",
          },
        }}
      />

      <Tabs.Screen
        name="insights"
        options={{
          title: "insights",
          tabBarIcon: ({ color, focused, size = 36 }) => (
            <TabBarIcon
              name={focused ? "analytics" : "analytics-outline"}
              color={color}
              size={size}
            />
          ),
          sceneStyle: {
            backgroundColor: "transparent",
          },
          tabBarStyle: {
            ...tabBarStyle,
            position: "absolute",
          },
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused, size = 36 }) => (
            <TabBarIcon
              name={focused ? "settings" : "settings-outline"}
              color={color}
              size={size}
            />
          ),
          sceneStyle: {
            backgroundColor: "transparent",
          },
          tabBarStyle: tabBarStyle,
        }}
      />
    </Tabs>
  );
}
