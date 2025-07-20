import { Image, Pressable } from "react-native";
import React from "react";
import { AvatarIcon } from "@/assets";

const Avatar = ({
  size = 40,
  imageUrl = "",
  onPress = () => {},
}: {
  size?: number;
  imageUrl?: string;
  onPress?: () => void;
}) => {
  return (
    <Pressable onPress={() => onPress?.()}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          style={{
            width: size,
            height: size,
            borderRadius: 999,
          }}
        />
      ) : (
        <AvatarIcon width={size} height={size} />
      )}
    </Pressable>
  );
};

export default Avatar;
