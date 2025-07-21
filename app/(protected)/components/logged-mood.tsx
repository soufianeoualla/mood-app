import { View, Text, StyleSheet } from "react-native";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import { QuoteIcon, ReflectionIcon, SleepIcon } from "@/assets";
import { useMoodContext } from "../context/mood-context";
import { getMoodConfig, getSleepHours } from "@/app/utils";

const MoodContainer = () => {
  const { currentMoodEntry } = useMoodContext();
  const { moodText, Icon, color } = getMoodConfig(currentMoodEntry?.mood!);

  return (
    <View
      style={[
        styles.cardContainer,
        {
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
        },
      ]}
    >
      <View style={styles.moodTextWrapper}>
        <Text style={styles.feelingLabel}>I’m feeling</Text>
        <Text style={styles.feelingText}>{moodText}</Text>
      </View>
      <Icon width={160} height={160} color={color} />
      <View style={styles.quoteWrapper}>
        <QuoteIcon />
        <Text style={styles.quoteText}>
          {currentMoodEntry?.generatedQuote || ""}
        </Text>
      </View>
    </View>
  );
};

const SleepContainer = () => {
  const { currentMoodEntry } = useMoodContext();
  const sleepHours = getSleepHours(currentMoodEntry?.sleepHours!);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <SleepIcon />
        <Text style={styles.cardHeaderText}>Sleep</Text>
      </View>
      <Text style={styles.cardMainText}>{sleepHours?.label}</Text>
    </View>
  );
};

const ReflectionContainer = () => {
  const { currentMoodEntry } = useMoodContext();
  const comment = currentMoodEntry?.comment;
  const feelings = currentMoodEntry?.feelings;

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardHeader}>
        <ReflectionIcon />
        <Text style={styles.cardHeaderText}>Reflection of the day</Text>
      </View>
      <Text style={styles.commentText}>{comment}</Text>
      <View style={styles.feelingsWrapper}>
        {feelings?.map((feeling, index) => (
          <Text style={styles.feelingTag} key={index}>
            #{feeling.toLowerCase()}
          </Text>
        ))}
      </View>
    </View>
  );
};

const LoggedMood = () => {
  return (
    <View
    style={{
      marginBottom: 100,
    }}
    >
      <MoodContainer />
      <SleepContainer />
      <ReflectionContainer />
    </View>
  );
};

export default LoggedMood;

const styles = StyleSheet.create({
  moodTextWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  feelingLabel: {
    ...Typography.preset3,
    color: Colors.neutral[600],
  },
  feelingText: {
    ...Typography.preset3,
    color: Colors.neutral[900],
  },
  quoteWrapper: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  quoteText: {
    ...Typography.preset6Italic,
    fontStyle: "italic",
    color: Colors.neutral[600],
    textAlign: "center",
  },
  cardContainer: {
    flexDirection: "column",
    gap: 16,
    padding: 20,
    backgroundColor: Colors.neutral[0],
    borderRadius: 12,
    shadowColor: Colors.neutral[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginTop: 20,
    borderWidth: 1,
    borderColor: Colors.blue[200],
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardHeaderText: {
    ...Typography.preset6,
    color: Colors.neutral[600],
  },
  cardMainText: {
    ...Typography.preset3,
    color: Colors.neutral[900],
  },
  commentText: {
    ...Typography.preset6,
    color: Colors.neutral[900],
    maxHeight: 80,
  },
  feelingsWrapper: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
  },
  feelingTag: {
    ...Typography.preset6Italic,
    color: Colors.neutral[600],
    fontStyle: "italic",
    textTransform: "capitalize",
  },
});
