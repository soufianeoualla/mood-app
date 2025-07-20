import { MOODS_CONFIG } from "@/app/utils";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { useLogMoodContext } from "../../context/log-mood-context";
import ErrorMessage from "@/components/ui/error-message";

const MoodStep = () => {
  const {
    data: { mood },
    setMood,
    errors: { mood: error },
  } = useLogMoodContext();

  return (
    <View>
      <Text
        style={{
          ...Typography.preset3,
          color: Colors.neutral[900],
          marginVertical: 24,
        }}
      >
        How was your mood today?
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",

          gap: 16,
        }}
      >
        {MOODS_CONFIG.map(({ moodText, Icon, value,color }, index) => (
          <Pressable
            onPress={() => setMood(value)}
            key={index}
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 18,
              width: "47%",
              backgroundColor: Colors.neutral[0],
              borderRadius: 16,
              gap: 12,
              borderWidth: mood === value ? 3 : 1,
              borderColor: mood === value ? Colors.blue[600] : Colors.blue[200],
            }}
          >
            <Icon width={70} height={70} color={color} />
            <Text
              style={{
                color: Colors.neutral[900],
                ...Typography.preset5,
              }}
            >
              {moodText}
            </Text>
          </Pressable>
        ))}
      </View>
      <ErrorMessage message={error} />
    </View>
  );
};

export default MoodStep;
