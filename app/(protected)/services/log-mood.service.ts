import { Feeling, Mood, SleepHours } from "@/app/types";
import api from "@/config/axiosInstance";

const logMoodService = (data: {
  mood: Mood;
  feelings: Feeling[];
  comment: string;
  sleepHours: SleepHours;
}) => {
  const response = api.post("/mood", data);
  return response;
};

export default logMoodService;
