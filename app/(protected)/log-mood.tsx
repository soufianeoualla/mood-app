import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import { ChevronLeftIcon } from "@/assets";
import MoodStep from "./components/steps/mood-step";
import Button from "@/components/ui/button";
import { useLogMoodContext } from "./context/log-mood-context";
import FeelingsStep from "./components/steps/feelings-step";
import CommentStep from "./components/steps/comment-step";
import SleepHoursStep from "./components/steps/sleep-hours-step";
import { useMutation } from "@tanstack/react-query";
import logMoodService from "./services/log-mood.service";
import Popup from "@/components/ui/popup";
import { useRouter } from "expo-router";
import { useMoodContext } from "./context/mood-context";

interface MoodData {
  mood: number;
  feelings: string[];
  comment: string;
  sleepHours: number;
}

interface ValidationErrors {
  mood?: string;
  feelings?: string;
  comment?: string;
  sleepHours?: string;
}

export const MIN_JOURNAL_LENGTH = 10;

const validateStep = (step: number, data: MoodData): ValidationErrors => {
  const errors: ValidationErrors = {};

  switch (step) {
    case 1:
      if (!data.mood) {
        errors.mood = "Please select a mood before continuing.";
      }
      break;
    case 2:
      if (data.feelings.length === 0) {
        errors.feelings = "Please select at least one feeling";
      }
      break;
    case 3:
      if (data.comment.trim().length < MIN_JOURNAL_LENGTH) {
        errors.comment = `Please write a few words about your day before continuing. Minimum ${MIN_JOURNAL_LENGTH} characters required.`;
      }
      break;
    case 4:
      if (!data.sleepHours) {
        errors.sleepHours = "Please select your sleep duration";
      }
      break;
  }

  return errors;
};

const LogMood = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const { data, resetData, setErrors } = useLogMoodContext();
  const { refetch } = useMoodContext();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { mutate, isPending, isError } = useMutation({
    mutationFn: logMoodService,
    onSettled: () => {
      setShowPopup(true);
    },
    onSuccess: () => {
      resetData();
      setMessage("Mood logged successfully!");
    },
    onError: (error) => {
      console.error("Error submitting mood data:", error);
      setMessage("Failed to log mood. Please try again.");
    },
  });

  const handleNext = useCallback(() => {
    const stepErrors = validateStep(currentStep, data);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      mutate(data);
    }
  }, [currentStep, data, setErrors, mutate]);

  const currentStepComponent = useMemo(() => {
    switch (currentStep) {
      case 1:
        return <MoodStep />;
      case 2:
        return <FeelingsStep />;
      case 3:
        return <CommentStep />;
      case 4:
        return <SleepHoursStep />;
      default:
        return null;
    }
  }, [currentStep]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ChevronLeftIcon color={Colors.neutral[900]} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={[Typography.preset1, styles.title]}>Log your mood</Text>

        <View style={styles.progressContainer}>
          {[1, 2, 3, 4].map((step) => (
            <View
              key={step}
              style={[
                styles.progressStep,
                {
                  backgroundColor:
                    currentStep === step ? Colors.blue[600] : Colors.blue[200],
                },
              ]}
            />
          ))}
        </View>

        {currentStepComponent}
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity
            onPress={() => setCurrentStep((prev) => prev - 1)}
            style={styles.prevButton}
          >
            <ChevronLeftIcon width={32} height={32} strokeWidth={2} />
          </TouchableOpacity>
        )}

        <Button
          disabled={isPending}
          onPress={handleNext}
          buttonText="Next"
          styles={{ container: styles.nextButton }}
        />
      </View>

      <Popup
        isVisible={showPopup}
        isError={isError}
        onClose={() => {
          setShowPopup(false);
          refetch();
          if (!isError) router.push("/");
        }}
        message={message}
      />
    </View>
  );
};

export default LogMood;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderColor: Colors.blue[200],
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  scrollContent: {
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  title: {
    color: Colors.neutral[900],
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
  },
  progressStep: {
    height: 6,
    width: "23%",
    borderRadius: 9999,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  prevButton: {
    height: 52,
    width: 52,
    backgroundColor: Colors.neutral[0],
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    flex: 1,
  },
});
