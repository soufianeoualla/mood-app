import { Pressable } from "react-native";
import React from "react";
import Colors from "@/constants/colors";

const Radio = ({
  isChecked,
  onPress,
}: {
  isChecked: boolean;
  onPress: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        width: 20,
        height: 20,
        borderRadius: 999,
        borderWidth: isChecked ? 4 : 1,
        borderColor: isChecked ? Colors.blue[600] : Colors.blue[200],
        backgroundColor: Colors.neutral[0],
      }}
    />
  );
};

export default Radio;
