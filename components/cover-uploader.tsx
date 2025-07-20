import React, { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { Controller } from "react-hook-form";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import Colors from "@/constants/colors";
import Avatar from "./ui/avatar";
import Button from "./ui/button";
import Typography from "@/constants/typography";
import uploadService from "@/lib/upload.service";

// Fixed interface for mobile file validation
interface MobileFile {
  uri: string;
  type: string;
  fileSize?: number;
}

const validateFile = (file: MobileFile): string | null => {
  const maxSize = 250 * 1024; // 250KB

  if (file.fileSize && file.fileSize > maxSize) {
    return "File size must be less than 250KB";
  }

  return null;
};

const CoverUploader = ({
  control,
  name = "cover",
  uploadStatus = "idle",
  setUploadStatus,
}: {
  control: any;
  name?: string;
  uploadStatus: "idle" | "uploading" | "success";
  setUploadStatus: (status: "idle" | "uploading" | "success") => void;
}) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const handleUploadClick = async (fieldOnChange: (value: any) => void) => {
    try {
      // Request permissions
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        Alert.alert(
          "Permission Required",
          "Permission to access camera roll is required!"
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.7,
      });

      if (!result.canceled) {
        setUploadStatus("uploading");

        const asset = result.assets[0];
        const fileInfo = await FileSystem.getInfoAsync(asset.uri);

        const file: MobileFile = {
          uri: asset.uri,
          type: asset.type ?? "image/jpeg",
          fileSize: fileInfo.exists ? fileInfo.size : undefined,
        };

        const validationError = validateFile(file);
        if (validationError) {
          setUploadStatus("idle");
          Alert.alert("Upload Failed", validationError);
          return;
        }

        try {
          const uploadResult = await uploadService(file.uri);
          setUploadStatus("success");
          setUploadedImageUrl(uploadResult.secure_url);
          fieldOnChange(uploadResult.secure_url);
        } catch (error: any) {
          console.error("Upload failed:", error);
          setUploadStatus("idle");
          Alert.alert("Upload Failed", "Something went wrong during upload.");
        }
      }
    } catch (error) {
      console.error("Image picker error:", error);
      setUploadStatus("idle");
      Alert.alert("Error", "Failed to pick image");
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
