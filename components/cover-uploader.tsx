import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Controller } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import Colors from "@/constants/colors";
import Avatar from "./ui/avatar";
import Button from "./ui/button";
import Typography from "@/constants/typography";
import uploadService, { PickedImage } from "@/lib/upload.service";

const validateFile = (file: PickedImage): string | null => {
  const maxSize = 250 * 1024; // 250KB

  if (file.fileSize && file.fileSize > maxSize) {
    return "File size must be less than 250KB";
  }

  return null;
};

const CoverUploader = ({
  control,
  name = "cover",
}: {
  control: any;
  name?: string;
}) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success"
  >("idle");

  const handleUploadClick = async (fieldOnChange: (value: any) => void) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      setUploadStatus("uploading");

      const asset = result.assets[0];
      const fileInfo = await FileSystem.getInfoAsync(asset.uri);

      const file: PickedImage = {
        uri: asset.uri,
        type: asset.type ?? "image/jpeg",
        fileSize: fileInfo.exists ? fileInfo.size : undefined,
      };

      const error = validateFile(file);
      if (error) {
        setUploadStatus("idle");
        Alert.alert("Upload Failed", error);
        return;
      }

      try {
        const result = await uploadService(file);
        setUploadStatus("success");
        setUploadedImageUrl(result.secure_url);
        fieldOnChange(result.secure_url);
      } catch (e) {
        setUploadStatus("idle");
        Alert.alert("Upload Failed", "Something went wrong during upload.");
      }
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <View style={styles.avatarContainer}>
          <Avatar size={64} imageUrl={uploadedImageUrl || field.value} />
          <View>
            <Text style={styles.uploadTitle}>Upload Image</Text>
            <Text style={styles.uploadSubtitle}>Max 250KB, PNG or JPEG</Text>
            <Button
              variant="secondary"
              isLoading={uploadStatus === "uploading"}
              onPress={() => handleUploadClick(field.onChange)}
              disabled={uploadStatus === "uploading"}
              buttonText="Upload"
              styles={{
                container: styles.uploadButton,
              }}
            />
            {uploadStatus === "success" && uploadedImageUrl && (
              <View style={{ marginTop: 8 }}>
                <Text
                  style={{
                    ...Typography.preset7,
                    color: Colors.green[300],
                  }}
                >
                  Upload successful!
                </Text>
              </View>
            )}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
  },
  uploadTitle: {
    ...Typography.preset6Regular,
    color: Colors.neutral[900],
  },
  uploadSubtitle: {
    ...Typography.preset7,
    color: Colors.neutral[600],
    marginTop: 4,
  },
  uploadButton: {
    width: 96,
    marginTop: 16,
  },
});

export default CoverUploader;
