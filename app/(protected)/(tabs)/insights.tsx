// Imports remain unchanged
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

import AverageMood from "../components/avearge-mood";
import AverageSleep from "../components/average-sleep";

import Chart from "../components/chart";
import Header from "../components/header";

const Inseights = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingBottom: 30 }}>
        <View>
          <View style={styles.container}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Average Mood{" "}
                <Text style={styles.sectionSubtitle}>(Last 5 Check-ins)</Text>
              </Text>
              <AverageMood />
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                Average Sleep{" "}
                <Text style={styles.sectionSubtitle}>(Last 5 Check-ins)</Text>
              </Text>
              <AverageSleep />
            </View>
          </View>

          <Chart />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[0],
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    gap: 24,
    borderWidth: 1,
    borderColor: Colors.blue[100],
  },
  section: {
    flexDirection: "column",
    gap: 12,
  },
  sectionTitle: {
    ...Typography.preset5,
    color: Colors.neutral[900],
  },
  sectionSubtitle: {
    ...Typography.preset7,
    color: Colors.neutral[600],
  },
});

export default Inseights;
