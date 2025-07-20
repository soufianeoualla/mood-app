import { ArrowRightIcon, Shapes } from "@/assets";
import { useMoodContext } from "../context/mood-context";
import { StyleSheet, Text, View } from "react-native";
import { getMoodConfig } from "@/app/utils";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

const AverageMood = () => {
  const { averageData } = useMoodContext();
  const mood = averageData?.averageMood;

  if (mood === null) {
    return (
      <View style={styles.cardPlaceholder}>
        <Shapes style={styles.shapes} />
        <View style={styles.textColumn}>
          <Text style={styles.titleNeutral}>Keep tracking!</Text>
          <Text style={styles.subtitleNeutral}>
            Log 5 check-ins to see your average mood.
          </Text>
        </View>
      </View>
    );
  }

  const { color, Icon, moodText } = getMoodConfig(mood);
  const status = averageData?.moodStatus;

  return (
    <View style={[styles.card, { backgroundColor: color }]}>
      <Shapes style={styles.shapes} />
      <View style={styles.row}>
        <Icon
          width={24}
          height={24}
          color={Colors.neutral[0]}

        />
        <Text style={styles.title}>{moodText}</Text>
      </View>
      <View style={styles.row}>
        <ArrowRightIcon
          width={20}
          height={20}
          color={Colors.neutral[900]}
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
        <Text style={styles.subtitleDark}>
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
  title: {
    ...Typography.preset4,
    color: Colors.neutral[900],
  },
  subtitleDark: {
    ...Typography.preset7,
    color: Colors.neutral[900],
  },
});

export default AverageMood;
