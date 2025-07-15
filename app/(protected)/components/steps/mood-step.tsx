import { View, Text, Pressable } from "react-native";
import React from "react";
import { MOODS_CONFIG } from "@/utils";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import { useLogMoodContext } from "../../context/log-mood-context";

const MoodStep = () => {
  const { data, setMood, errors } = useLogMoodContext();

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
        {MOODS_CONFIG.map(({ moodText, Icon, value }, index) => (
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
              borderWidth: data.mood === value ? 3 : 1,
              borderColor:
                data.mood === value ? Colors.blue[600] : Colors.blue[200],
            }}
          >
            <Icon width={70} height={70} />
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
      {errors.mood && (
        <Text
          style={{
            color: Colors.red[700],
            ...Typography.preset8,
            marginTop: 10,
          }}
        >
          * {errors.mood}
        </Text>
      )}
    </View>
  );
};

export default MoodStep;
