import {
  StyleProp,
  TextStyle,
  ViewStyle,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import Colors from "@/constants/colors";
import Typography from "@/constants/typography";

const Button = ({
  buttonText,
  variant = "primary",
  onPress,
  styles = {},
  disabled = false,
  isLoading = false,
}: {
  buttonText: string;
  variant?: "primary" | "secondary";
  onPress?: () => void;
  styles?: {
    container?: StyleProp<ViewStyle>;
    text?: StyleProp<TextStyle>;
  };
  disabled?: boolean;
  isLoading?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
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
            variant === "secondary" ? Colors.neutral[300] : "transparent",
          opacity: disabled || isLoading ? 0.5 : 1,
        },
        styles.container,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          size="small"
          color={
            variant === "primary" ? Colors.neutral[0] : Colors.neutral[900]
          }
        />
      ) : (
        <Text
          style={[
            {
              color:
                variant === "primary" ? Colors.neutral[0] : Colors.neutral[900],
              ...Typography.preset5,
            },
            styles.text,
          ]}
        >
          {buttonText}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
