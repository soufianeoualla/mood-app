import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { getMoodConfig, getSleepHours, sleepOptions } from "@/app/utils";
import { SleepIcon } from "@/assets";
import MoodEntry, { Mood, SleepHours } from "@/app/types";
import Modal from "react-native-modal";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";
import { useMoodContext } from "../context/mood-context";

// Constants
const LEVEL = 55;
const BASE_HEIGHT = 44;

const SLEEP_HEIGHT_MAP: Record<SleepHours, number> = {
  1: 0,
  3.5: LEVEL,
  5.5: LEVEL * 2,
  7.5: LEVEL * 3,
  9: LEVEL * 4,
};

const getBarHeight = (sleepHours: SleepHours): number => {
  return SLEEP_HEIGHT_MAP[sleepHours] || 0;
};

const EntryDetails = ({
  entry,
  isVisible,
  onClose,
}: {
  entry: MoodEntry;
  isVisible: boolean;
  onClose: () => void;
}) => {
  const { mood, sleepHours, feelings, comment } = entry;
  const { Icon, moodText,color } = getMoodConfig(mood as Mood);
  const sleepHoursLabel = getSleepHours(sleepHours as SleepHours)?.label;

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalSection}>
          <Text style={styles.modalLabel}>Mood</Text>
          <View style={styles.modalRow}>
            <Icon width={16} height={16} color={color}  />
            <Text style={styles.modalText}>{moodText}</Text>
          </View>
        </View>

        <View style={styles.modalSection}>
          <Text style={styles.modalLabel}>Sleep</Text>
          <Text style={styles.modalText}>{sleepHoursLabel}</Text>
        </View>

        <View style={styles.modalSection}>
          <Text style={styles.modalLabel}>Reflection</Text>
          <Text style={styles.modalText}>{comment}</Text>
        </View>

        <View style={styles.modalSection}>
          <Text style={styles.modalLabel}>Tags</Text>
          <Text style={styles.modalTags}>
            {feelings.map((f) => f.toLowerCase()).join(", ") ||
              "No tags selected"}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const Bar = ({ entry }: { entry: MoodEntry }) => {
  const [showPopover, setShowPopover] = useState(false);
  if (!entry) return null;

  const { color, Icon } = getMoodConfig(entry.mood as Mood);
  const barHeight = getBarHeight(entry.sleepHours as SleepHours);

  return (
    <View style={styles.barContainer}>
      <Pressable
        onPress={() => setShowPopover((prev) => !prev)}
        style={[
          styles.bar,
          {
            height: BASE_HEIGHT + barHeight,
            backgroundColor: color,
          },
        ]}
      >
        <Icon width={30} height={30} color={Colors.neutral[0]} />
      </Pressable>
      <EntryDetails
        entry={entry}
        isVisible={showPopover}
        onClose={() => setShowPopover(false)}
      />
    </View>
  );
};

const ChartEntry = ({ entry, date }: { entry: MoodEntry; date: string }) => {
  const [month, day] = new Date(date)
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
    .split(" ");
  return (
    <View style={styles.chartEntryWrapper}>
      <View style={styles.dateContainer}>
        <Text style={styles.monthText}>{month}</Text>
        <Text style={styles.dayText}>{day}</Text>
      </View>
      <Bar entry={entry} />
    </View>
  );
};

const Chart = () => {
  const { moodEntries } = useMoodContext();

  return (
    <View style={styles.trendContainer}>
      <Text style={styles.trendTitle}>Mood and sleep trends</Text>
      <View style={styles.trendContent}>
        <View style={styles.sleepLegend}>
          {sleepOptions.map((option) => (
            <View key={option.value} style={styles.sleepLegendRow}>
              <SleepIcon width={12} height={12} />
              <Text style={styles.sleepLegendText}>{option.label}</Text>
            </View>
          ))}
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.scrollContent}>
            <View style={styles.linesContainer}>
              {sleepOptions.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.line,
                    { transform: [{ translateY: LEVEL * index }] },
                  ]}
                />
              ))}
            </View>
            <View style={styles.chartEntries}>
              {moodEntries?.map((item, idx) => (
                <ChartEntry
                  key={`${item.date}-${idx}`}
                  entry={item.entry}
                  date={item.date}
                />
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Chart;

const styles = StyleSheet.create({
  trendContainer: {
    backgroundColor: Colors.neutral[0],
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.blue[100],
    marginTop: 24,
    marginBottom:100

  },
  trendTitle: {
    ...Typography.preset3,
    color: Colors.neutral[900],
  },
  trendContent: {
    flexDirection: "row",
    height: 320,
    gap: 20,
    marginTop: 32,
  },
  sleepLegend: {
    flexDirection: "column",
    gap: 40,
  },
  sleepLegendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  sleepLegendText: {
    ...Typography.preset9,
    color: Colors.neutral[900],
  },
  scrollContent: {
    flexDirection: "row",
    minWidth: Dimensions.get("window").width + 210,
    paddingBottom: 40,
  },
  linesContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop: 5,
  },
  line: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 1,
    minWidth: Dimensions.get("window").width + 200,
    backgroundColor: "#D0E2FF",
  },
  chartEntries: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  barContainer: {
    width: "100%",
    position: "absolute",
    bottom: 52,
  },
  bar: {
    width: "100%",
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 5,
  },
  chartEntryWrapper: {
    position: "relative",
  },
  dateContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    width: 44,
  },
  monthText: {
    ...Typography.preset9,
    color: Colors.neutral[600],
    textAlign: "center",
  },
  dayText: {
    ...Typography.preset8,
    color: Colors.neutral[900],
  },
  modalContainer: {
    backgroundColor: Colors.neutral[0],
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.blue[100],
  },
  modalSection: {
    flexDirection: "column",
    gap: 8,
    marginBottom: 12,
  },
  modalLabel: {
    ...Typography.preset8,
    color: Colors.neutral[600],
  },
  modalRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  modalText: {
    ...Typography.preset7,
    color: Colors.neutral[900],
  },
  modalTags: {
    ...Typography.preset7,
    color: Colors.neutral[900],
    textTransform: "capitalize",
  },
});
