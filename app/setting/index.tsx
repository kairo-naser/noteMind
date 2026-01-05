
import BottomTabsNav from '@/navigation/bottomTabs';
import { useTheme } from '@/theme/themeContext';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  const { theme, mode, toggle } = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={["top", "bottom"]}>
      <View style={styles.container}>
        <Text style={{ color: theme.text, fontSize: 18, marginBottom: 12 }}>Appearance</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: theme.text }}>Dark mode</Text>
          <Switch
            value={mode === 'dark'}
            onValueChange={toggle}
            thumbColor={mode === 'dark' ? '#fff' : '#fff'}
            trackColor={{ false: '#767577', true: theme.accent }}
          />
        </View>
      </View>
      <BottomTabsNav />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "transparent",
    paddingTop: 12, 
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
 
});
export default index