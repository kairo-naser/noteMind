import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BottomTabsNav = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => router.push('/') }>
          <Ionicons name="home" size={24} style={styles.icons} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/setting') }>
          <Ionicons name="settings" size={24} style={styles.icons} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#4682bf0c',
  },
  icons: {
    color: '#4682BF',
  },
});

export default BottomTabsNav;