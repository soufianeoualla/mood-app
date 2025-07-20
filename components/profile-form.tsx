import { View, Text, TextInput, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";

import Typography from "@/constants/typography";
import Colors from "@/constants/colors";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CoverUploader from "./cover-uploader";
import Button from "./ui/button";

const profileSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  cover: z.url({ message: "Cover must be a valid URL" }).optional(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;

const ProfileForm = ({
  title,
  description,
  defaultValues = {
    name: "",
    cover: "",
  },
  onSubmit,
  isPending = false,
  buttonText = "Save Changes",
}: {
  title: string;
  defaultValues?: ProfileSchemaType;
  description: string;
  onSubmit: (data: ProfileSchemaType) => void;
  isPending?: boolean;
  buttonText: string;
}) => {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues,
    mode: "onChange",
  });
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success"
  >("idle");

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View>
          <Text style={styles.label}>Name</Text>
          <Controller
            name="name"
            control={form.control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Jane Appleseed"
              />
            )}
          />
        </View>

        <CoverUploader
          control={form.control}
          name="cover"
          uploadStatus={uploadStatus}
          setUploadStatus={setUploadStatus}
        />
      </ScrollView>
      <View style={styles.footer}>
        <Button
          disabled={!form.formState.isValid}
          isLoading={isPending || uploadStatus === "uploading"}
          onPress={form.handleSubmit(onSubmit)}
          buttonText={buttonText}
          styles={{ container: styles.button }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...Typography.preset3,
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  description: {
    ...Typography.preset6,
    color: Colors.neutral[600],
    marginBottom: 32,
  },
  label: {
    ...Typography.preset6Regular,
    color: Colors.neutral[900],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    paddingHorizontal: 20,
    height: 52,
    borderRadius: 10,
    ...Typography.preset6,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  button: {
    flex: 1,
  },
});

export default ProfileForm;
