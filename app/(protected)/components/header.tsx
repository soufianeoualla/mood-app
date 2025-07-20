import { Pressable, Text, View, StyleSheet } from "react-native";
import React from "react";
import { Logo, LogOutIcon } from "@/assets";
import Avatar from "@/components/ui/avatar";
import useAuthStore from "@/store/use-auth-store";
import Modal from "react-native-modal";
import Typography from "@/constants/typography";
import Colors from "@/constants/colors";

const Header = () => {
  const { user, clearAuth } = useAuthStore();
  const [showDrawer, setShowDrawer] = React.useState(false);

  return (
    <View style={styles.headerContainer}>
      <Logo />
      <Avatar imageUrl={user?.cover} onPress={() => setShowDrawer(true)} />
      <Modal
        onBackdropPress={() => setShowDrawer(false)}
        onSwipeComplete={() => setShowDrawer(false)}
        swipeDirection={["down"]}
        swipeThreshold={50}
        backdropOpacity={0.5}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={250}
        backdropTransitionInTiming={300}
        backdropTransitionOutTiming={250}
        style={styles.modal}
        isVisible={showDrawer}
      >
        <View style={styles.drawerContainer}>
          <View style={styles.drawerHandle} />
          <View style={styles.drawerContent}>
            <Text style={styles.userName}>{user?.name}</Text>
            <Text style={styles.userEmail}>{user?.email}</Text>
          </View>

          <View style={styles.separator} />

          <Pressable onPress={clearAuth} style={styles.logoutButton}>
            <LogOutIcon width={28} height={28} />
            <Text style={styles.logoutText}>Log Out</Text>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  drawerContainer: {
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    paddingBottom: 20,
  },
  drawerHandle: {
    alignSelf: "center",
    width: 40,
    height: 4,
    backgroundColor: Colors.neutral[300],
    borderRadius: 2,
    marginTop: 8,
    marginBottom: 16,
  },
  drawerContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  userName: {
    textTransform: "capitalize",
    ...Typography.preset6,
    color: Colors.neutral[900],
  },
  userEmail: {
    textTransform: "lowercase",
    ...Typography.preset7,
    color: Colors.neutral[300],
  },
  separator: {
    marginVertical: 16,
    backgroundColor: Colors.blue[100],
    height: 1,
    width: "100%",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 8,
  },
  logoutText: {
    ...Typography.preset7,
    color: Colors.neutral[900],
  },
});

export default Header;
