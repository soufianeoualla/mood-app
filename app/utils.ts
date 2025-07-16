import { Happy, Neutral, Sad, VeryHappy, VerySad } from "../assets";
import Colors from "../constants/colors";
import { Feeling, Mood, SleepHours } from "./types";

export const feelingsTags: Feeling[] = [
  "JOYFUL",
  "DOWN",
  "ANXIOUS",
  "CALM",
  "EXCITED",
  "FRUSTRATED",
  "LONELY",
  "GRATEFUL",
  "OVERWHELMED",
  "MOTIVATED",
  "IRRITABLE",
  "PEACEFUL",
  "TIRED",
  "HOPEFUL",
  "CONFIDENT",
  "STRESSED",
  "CONTENT",
  "DISAPPOINTED",
  "OPTIMISTIC",
  "RESTLESS",
];

export const sleepOptions: {
  label: string;
  value: SleepHours;
}[] = [
  { label: "9+ hours", value: 9 },
  { label: "7-8 hours", value: 7.5 },
  { label: "5-6 hours", value: 5.5 },
  { label: "3-4 hours", value: 3.5 },
  { label: "0-2 hours", value: 1 },
];

export interface MoodConfig {
  color: string;
  Icon: React.ComponentType<{
    width?: number;
    height?: number;
    color?: string;
  }>;
  moodText: string;
  value: Mood;
}

export const MOODS_CONFIG: MoodConfig[] = [
  {
    color: Colors.amber[300],
    Icon: VeryHappy,
    moodText: "Very Happy",
    value: 2,
  },
  { color: Colors.green[300], Icon: Happy, moodText: "Happy", value: 1 },
  { color: Colors.blue[300], Icon: Neutral, moodText: "Neutral", value: 0 },
  { color: Colors.indigo[200], Icon: Sad, moodText: "Sad", value: -1 },
  { color: Colors.red[300], Icon: VerySad, moodText: "Very Sad", value: -2 },
];

export const getMoodConfig = (mood: Mood) => {
  return (
    MOODS_CONFIG.find((config) => config.value === mood) || {
      color: Colors.blue[300],
      Icon: Neutral,
      moodText: "Neutral",
      value: 0,
    }
  );
};

export const getSleepHours = (hours?: number | null) => {
  if (!hours) return null;
  return sleepOptions.find((o) => o.value === hours);
};
