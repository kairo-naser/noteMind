import { useTheme } from "@/theme/themeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// /**
//  * App Header shown at the top of the Home screen.
//  * Uses the theme's `accent` color as background.
//  * The title stays white for good contrast on the accent.
//  */
// const Header: React.FC = () => {
//   const { theme } = useTheme();

//   return (
//     <SafeAreaView style={[styles.safe, { backgroundColor: theme.accent }]}> 
//       <View style={[styles.container, { backgroundColor: theme.accent }]}> 
//         <Text style={[styles.title, { color: "#fff" }]}>noteMind</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safe: {
//     width: "100%",
//   },
//   container: {
//     paddingTop: Platform.OS === "android" ? 18 : 36,
//     paddingBottom: 12,
//     paddingHorizontal: 16,
//     width: "100%",
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//   },
// });

// export default Header;
/** --- HEADER COMPONENT --- **/
export const Header = () => {
  const { theme } = useTheme();
  return (
    <View style={[styles.headerContainer, { borderBottomColor: theme.accent + "11" }]}>
      <Text style={[styles.headerTitle, { color: theme.text }]}>
        Note<Text style={{ color: theme.accent }}>Mind</Text>
      </Text>
     
    </View>
  );
};

/** --- FLOATING ACTION BUTTON --- **/
export const FloatingAddBtn = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <TouchableOpacity 
        style={[styles.fab, { backgroundColor: theme.accent }]} 
        onPress={() => router.push('/addNote')}
    >
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  headerTitle: { fontSize: 28, fontWeight: "800", letterSpacing: -0.5 },
  profileBtn: { padding: 6, borderRadius: 12 },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 100,
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  }
});
export default Header;