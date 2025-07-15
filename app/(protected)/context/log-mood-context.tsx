"use client";
import { Feeling, Mood, SleepHours } from "@/app/types";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export const MAX_FEELINGS = 3;

interface ValidationErrors {
  mood?: string;
  feelings?: string;
  comment?: string;
  sleepHours?: string;
}
interface MoodData {
  mood: Mood;
  feelings: Feeling[];
  comment: string;
  sleepHours: SleepHours;
}

export interface LogMoodContextType {
  data: MoodData;
  setMood: (mood: Mood) => void;
  errors: ValidationErrors;
  setErrors: React.Dispatch<React.SetStateAction<ValidationErrors>>;
  setFeelings: (feeling: Feeling) => void;
  setComment: (comment: string) => void;
  setSleepHours: (hours: SleepHours) => void;
  resetData: () => void;
}

const LogMoodContext = createContext<LogMoodContextType | undefined>(undefined);

const LogMoodProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<{
    mood: Mood;
    feelings: Feeling[];
    comment: string;
    sleepHours: SleepHours;
  }>({
    mood: 0,
    feelings: [],
    comment: "",
    sleepHours: 7.5,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const setMood = useCallback((mood: Mood) => {
    setData((prev) => ({ ...prev, mood }));
    setErrors((prev) => ({ ...prev, mood: undefined }));
  }, []);

  const setFeelings = useCallback((feeling: Feeling) => {
    setData((prev) => ({
      ...prev,
      feelings: prev.feelings.includes(feeling)
        ? prev.feelings.filter((f) => f !== feeling)
        : prev.feelings.length < MAX_FEELINGS
        ? [...prev.feelings, feeling]
        : prev.feelings,
    }));
    setErrors((prev) => ({ ...prev, feelings: undefined }));
  }, []);

  const setComment = useCallback((comment: string) => {
    setData((prev) => ({ ...prev, comment }));
    setErrors((prev) => ({ ...prev, comment: undefined }));
  }, []);

  const setSleepHours = useCallback((hours: SleepHours) => {
    setData((prev) => ({ ...prev, sleepHours: hours }));
    setErrors((prev) => ({ ...prev, sleepHours: undefined }));
  }, []);

  const resetData = useCallback(() => {
    setData({
      mood: -1,
      feelings: [],
      comment: "",
      sleepHours: 1,
    });
  }, []);

  return (
    <LogMoodContext.Provider
      value={{
        data,
        setMood,
        setFeelings,
        setComment,
        setSleepHours,
        resetData,
        errors,
        setErrors,
      }}
    >
      {children}
    </LogMoodContext.Provider>
  );
};

const useLogMoodContext = () => {
  const context = useContext(LogMoodContext);
  if (!context) {
    throw new Error("useLogMood must be used within a LogMoodProvider");
  }
  return context;
};

export { LogMoodProvider, useLogMoodContext };
