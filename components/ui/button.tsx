import {
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
  TouchableOpacity,
} from "react-native";

import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

const Button = ({
  buttonText,
  variant = "primary",
  onPress,
  styles = {},
}: {
  buttonText: string;
  variant?: "primary" | "secondary";
  onPress?: () => void;
  styles?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          paddingVertical: 12,
          borderRadius: 10,
          height: 52,
          backgroundColor:
            variant === "primary" ? Colors.blue[600] : "transparent",
          borderWidth: variant === "secondary" ? 1 : 0,
          borderColor:
            variant === "secondary" ? Colors.blue[600] : "transparent",
        },
        styles.container,
      ]}
    >
      <Text
        style={[
          {
            color: variant === "primary" ? Colors.neutral[0] : Colors.blue[600],
            ...Typography.preset5,
          },
          styles.text,
        ]}
      >
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
