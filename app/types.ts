export type Feeling =
  | "JOYFUL"
  | "DOWN"
  | "ANXIOUS"
  | "CALM"
  | "EXCITED"
  | "FRUSTRATED"
  | "LONELY"
  | "GRATEFUL"
  | "OVERWHELMED"
  | "MOTIVATED"
  | "IRRITABLE"
  | "PEACEFUL"
  | "TIRED"
  | "HOPEFUL"
  | "CONFIDENT"
  | "STRESSED"
  | "CONTENT"
  | "DISAPPOINTED"
  | "OPTIMISTIC"
  | "RESTLESS";

export type Mood = -2 | -1 | 0 | 1 | 2;

export type SleepHours = 1 | 3.5 | 5.5 | 7.5 | 9;

type MoodEntry = {
  id: number;
  userId: number;
  mood: Mood;
  comment: string;
  feelings: Feeling[];
  sleepHours: SleepHours;
  generatedQuote?: string;
  createdAt: Date;
  updatedAt: Date;
};

export default MoodEntry;
