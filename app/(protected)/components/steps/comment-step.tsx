import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import Typography from "@/constants/typography";

import { useLogMoodContext } from "../../context/log-mood-context";
import ErrorMessage from "@/components/ui/error-message";
import Colors from "@/constants/colors";

const CommentStep = () => {
  const {
    data: { comment },
    errors: { comment: error },
    setComment,
  } = useLogMoodContext();

  return (
    <View>
      <Text style={styles.heading}>Write about your day...</Text>
      <TextInput
        multiline
        placeholder="Today, I felt…"
        onChangeText={(text) => setComment(text)}
        numberOfLines={5}
        maxLength={150}
        style={[
          styles.input,
          { borderColor: error ? Colors.red[300] : Colors.neutral[200] },
        ]}
      />
      <View style={styles.counterWrapper}>
        <Text style={styles.counterText}>{comment.length} / 150</Text>
      </View>
      <ErrorMessage message={error} />
    </View>
  );
};

export default CommentStep;

const styles = StyleSheet.create({
  heading: {
    ...Typography.preset3,
    color: Colors.neutral[900],
    marginVertical: 24,
  },
  input: {
    backgroundColor: Colors.neutral[0],
    borderRadius: 10,
    padding: 16,
    height: 150,
    textAlignVertical: "top",
    color: Colors.neutral[900],
    ...Typography.preset6,
    borderWidth: 1,
  },
  counterWrapper: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  counterText: {
    ...Typography.preset8,
    color: Colors.neutral[600],
  },
});
