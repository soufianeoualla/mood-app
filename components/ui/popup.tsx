import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";

import React from "react";
import { CircleCheckIcon, InfoIcon } from "@/assets";
import Colors from "@/constants/colors";
import Typography from "@/constants/typography";
import Button from "./button";

const Popup = ({
  isError = false,
  isVisible = false,
  message = "",
  onClose,
}: {
  isError?: boolean;
  isVisible: boolean;
  message: string;
  onClose: () => void;
}) => {
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.container}>
        {isError ? (
          <InfoIcon color={Colors.red[700]} width={50} height={50} />
        ) : (
          <CircleCheckIcon color={Colors.green[300]} width={50} height={50} />
        )}
        <Text style={styles.messageText}>{message}</Text>
        <Button
          variant="secondary"
          buttonText="Close"
          onPress={onClose}
          styles={{
            container: {
              borderColor: Colors.blue[200],
            },
            text: {
              color: Colors.neutral[600],
            },
          }}
        />
      </View>
    </Modal>
  );
};

export default Popup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.neutral[0],
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    width: "100%",
    alignSelf: "center",
  },
  messageText: {
    color: Colors.neutral[900],
    ...Typography.preset6,
  },
});
