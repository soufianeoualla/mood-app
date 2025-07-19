import ProfileForm, { ProfileSchemaType } from "@/components/profile-form";
import useAuthStore from "@/store/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import updateProfileService from "./services/update-profile.service";
import { Fragment, useState } from "react";
import Popup from "@/components/ui/popup";
import Header from "./components/header";

const Settings = () => {
  const { user, setUser } = useAuthStore();
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (data: ProfileSchemaType) => updateProfileService(data),

    onSuccess: (response) => {
      setUser(response.user);
      setShowPopup(true);
      setMessage("Profile updated successfully!");
    },
    onError: (error: unknown) => {
      setShowPopup(true);
      setMessage("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    },
  });

  const handleSubmit = (data: ProfileSchemaType) => {
    mutate(data);
  };

  return (
    <Fragment>
      <Header />

      <ProfileForm
        title="Update your profile"
        description="Personalize your account with your name and photo."
        defaultValues={{
          name: user?.name || "",
          cover: user?.cover || "",
        }}
        onSubmit={handleSubmit}
        isPending={isPending}
        buttonText="Save Changes"
      />

      <Popup
        isVisible={showPopup}
        isError={isError}
        onClose={() => {
          setShowPopup(false);
        }}
        message={message}
      />
    </Fragment>
  );
};

export default Settings;
