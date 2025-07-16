import { View, Image } from "react-native";
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
    </View>
  );
};

export default Avatar;
