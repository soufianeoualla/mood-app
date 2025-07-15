import { Pressable } from "react-native";
import { CheckIcon } from "@/assets";
import Colors from "@/constants/colors";

const Checkbox = ({
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
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        borderWidth:1,
        borderColor: isChecked ? Colors.blue[600] : Colors.blue[200],
        backgroundColor: isChecked ? Colors.blue[600] : "transparent",
      }}
    >
      {isChecked && <CheckIcon color={Colors.neutral[0]} width={16} height={16} />}
    </Pressable>
  );
};

export default Checkbox;
