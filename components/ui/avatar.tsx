import { View, Text, Image } from "react-native";
import React from "react";
import { AvatarIcon } from "@/assets";

const Avatar = ({
  size = 40,
  imageUrl = "",
}: {
  size?: number;
  imageUrl?: string;
}) => {
  return (
    <View>
      {imageUrl ? (
        <Image src={imageUrl} />
      ) : (
        <AvatarIcon width={size} height={size} />
      )}
    </View>
  );
};

export default Avatar;
