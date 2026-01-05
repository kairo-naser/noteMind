import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Bottom tab bar pinned to the bottom safe area.
 * Uses theme colors for background and icons.
 */
const BottomTabsNav: React.FC = () => {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <SafeAreaView style={styles.safeArea} edges={["bottom"]}>
      <View style={[styles.container, { backgroundColor: theme.card, borderTopColor: theme.accent + "22", borderTopWidth: 1 }]}> 
        <TouchableOpacity accessibilityLabel="Home tab" onPress={() => router.push('/') }>
          <Ionicons name="home" size={24} color={theme.accent} />
        </TouchableOpacity>

        <TouchableOpacity accessibilityLabel="Settings tab" onPress={() => router.push('/setting')}>
          <Ionicons name="settings" size={24} color={theme.accent} />
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
  },
});

export default BottomTabsNav;