import { getSleepHours } from "@/app/utils";
import { ArrowRightIcon, Shapes, SleepIcon } from "@/assets";
import Colors from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";
import { useMoodContext } from "../context/mood-context";
import Typography from "@/constants/typography";

const AverageSleep = () => {
  const { averageData } = useMoodContext();
  const averageSleepHours = averageData?.averageSleepHours;

  if (averageSleepHours === null) {
    return (
      <View style={styles.cardPlaceholder}>
        <Shapes style={styles.shapes} />
        <View style={styles.textColumn}>
          <Text style={styles.titleNeutral}>Not enough data yet!</Text>
          <Text style={styles.subtitleNeutral}>
            Track 5 nights to view average sleep.
          </Text>
        </View>
      </View>
    );
  }

  const status = averageData?.sleepStatus;
  const sleepHours = getSleepHours(averageSleepHours);

  return (
    <View style={[styles.card, { backgroundColor: Colors.blue[600] }]}>
      <Shapes style={styles.shapes} />
      <View style={styles.row}>
        <SleepIcon
          width={24}
          height={24}
          color={Colors.neutral[0]}
          opacity={0.7}
        />
        <Text style={styles.titleLight}>{sleepHours?.label}</Text>
      </View>
      <View style={styles.row}>
        <ArrowRightIcon
          width={20}
          height={20}
          color={Colors.neutral[0]}
          opacity={0.8}
          style={{
            transform: [
              {
                rotate:
                  status === "down"
                    ? "45deg"
                    : status === "up"
                    ? "-45deg"
                    : "0deg",
              },
            ],
          }}
        />
        <Text style={styles.subtitle}>
          {status === "same" && "Same as the previous 5 check-ins"}
          {status === "up" && "Better than the previous 5 check-ins"}
          {status === "down" && "Worse than the previous 5 check-ins"}
          {status === null && "No data"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "relative",
    height: 150,
    gap: 12,
  },
  cardPlaceholder: {
    padding: 20,
    borderRadius: 20,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: Colors.blue[100],
    position: "relative",
    height: 150,
    gap: 12,
  },
  shapes: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  textColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 12,
  },
  titleNeutral: {
    ...Typography.preset4,
    color: Colors.neutral[900],
  },
  subtitleNeutral: {
    ...Typography.preset7,
    color: Colors.neutral[600],
  },
  titleLight: {
    ...Typography.preset4,
    color: Colors.neutral[0],
  },
  subtitle: {
    ...Typography.preset7,
    color: Colors.neutral[0],
    opacity: 0.8,
  },
});

export default AverageSleep;
