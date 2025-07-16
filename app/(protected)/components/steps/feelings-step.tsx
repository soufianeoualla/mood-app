import { feelingsTags } from "@/app/utils";
import Checkbox from "@/components/ui/checkbox";
import ErrorMessage from "@/components/ui/error-message";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import React from "react";
import { Pressable, Text, View } from "react-native";
import {
  MAX_FEELINGS,
  useLogMoodContext,
} from "../../context/log-mood-context";

const FeelingsStep = () => {
  const {
    data: { feelings },
    errors: { feelings: error },
    setFeelings,
  } = useLogMoodContext();

  return (
    <View>
      <Text
        style={{
          ...Typography.preset3,
          color: Colors.neutral[900],
          marginTop: 24,
          marginBottom: 6,
        }}
      >
        How did you feel?
      </Text>
      <Text
        style={{
          marginBottom: 24,
          ...Typography.preset6,
          color: Colors.neutral[600],
        }}
      >
        Select up to {MAX_FEELINGS} tags ({feelings.length}/{MAX_FEELINGS}{" "}
        selected):
      </Text>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {feelingsTags.map((feeling, index) => {
          const isDisabled =
            feelings.length >= MAX_FEELINGS && !feelings.includes(feeling);
          return (
            <Pressable
              disabled={isDisabled}
              onPress={() => setFeelings(feeling)}
              key={index}
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
                borderRadius: 10,
                backgroundColor: Colors.neutral[0],
                borderWidth: feelings.includes(feeling) ? 2 : 1,
                borderColor: feelings.includes(feeling)
                  ? Colors.blue[600]
                  : Colors.blue[200],
                paddingVertical: 12,
                paddingHorizontal: 14,
                opacity: isDisabled ? 0.6 : 1,
              }}
            >
              <Checkbox
                isChecked={feelings.includes(feeling)}
                onPress={() => setFeelings(feeling)}
              />

              <Text
                style={{
                  ...Typography.preset6,
                  color: Colors.neutral[900],
                  textTransform: "capitalize",
                }}
              >
                {feeling.toLowerCase()}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <ErrorMessage message={error} />
    </View>
  );
};

export default FeelingsStep;
