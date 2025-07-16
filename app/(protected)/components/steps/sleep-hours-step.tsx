import { sleepOptions } from "@/app/utils";
import Radio from "@/components/ui/radio";
import Typography from "@/constants/typography";
import React from "react";
import { Pressable, Text, View } from "react-native";

import { useLogMoodContext } from "../../context/log-mood-context";
import ErrorMessage from "@/components/ui/error-message";
import Colors from "@/constants/colors";

const SleepHoursStep = () => {
  const {
    data: { sleepHours },
    errors: { sleepHours: error },
    setSleepHours,
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
        How many hours did you sleep last night?
      </Text>
      <View
        style={{
          flexDirection: "column",
          gap: 12,
        }}
      >
        {sleepOptions.map((option, index) => (
          <Pressable
            onPress={() => setSleepHours(option.value)}
            style={{
              paddingHorizontal: 16,
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 12,
              borderRadius: 10,
              backgroundColor: Colors.neutral[0],
              borderWidth: 1,
              borderColor: Colors.blue[200],
              paddingVertical: 12,
            }}
            key={index}
          >
            <Radio
              isChecked={sleepHours === option.value}
              onPress={() => setSleepHours(option.value)}
            />
            <Text
              style={{
                color: Colors.neutral[900],
                ...Typography.preset5,
              }}
            >
              {option.label}
            </Text>
          </Pressable>
        ))}
      </View>
      <ErrorMessage message={error} />
    </View>
  );
};

export default SleepHoursStep;
