import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import { ChevronLeftIcon } from "@/assets";
import MoodStep from "./components/steps/mood-step";
import Button from "@/components/ui/button";
import { LogMoodProvider } from "./context/log-mood-context";
import FeelingsStep from "./components/steps/feelings-step";
import CommentStep from "./components/steps/comment-step";

const LogMood = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{
            width: 48,
            height: 48,
            borderRadius: 8,
            borderColor: Colors.blue[200],
            borderWidth: 1,
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <ChevronLeftIcon color={Colors.neutral[900]} strokeWidth={2} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 20,
        }}
      >
        <Text
          style={{
            ...Typography.preset1,
            color: Colors.neutral[900],
          }}
        >
          Log your mood
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            marginTop: 24,
          }}
        >
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={{
                height: 6,
                width: "23%",
                backgroundColor:
                  currentStep === step ? Colors.blue[600] : Colors.blue[200],
                borderRadius: 9999,
              }}
            />
          ))}
        </View>
        <LogMoodProvider>
          {/* <MoodStep /> */}
          {/* <FeelingsStep/> */}
          <CommentStep />
        </LogMoodProvider>
      </ScrollView>

      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,

          borderTopColor: Colors.neutral[200],
        }}
      >
        {currentStep > 1 && (
          <TouchableOpacity
            style={{
              height: 52,
              width: 52,
              backgroundColor: Colors.neutral[0],
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ChevronLeftIcon width={32} height={32} strokeWidth={2} />
          </TouchableOpacity>
        )}
        <Button
          buttonText="Next"
          styles={{
            container: {
              flex: 1,
            },
          }}
        />
      </View>
    </View>
  );
};

export default LogMood;
