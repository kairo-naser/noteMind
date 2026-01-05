
import Header from '@/components/header';
import BottomTabsNav from '@/navigation/bottomTabs';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  const { theme, mode, toggle } = useTheme();
  const router = useRouter();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={["top", "bottom"]}>
      <Header />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}> 
          <Text style={[styles.cardTitle, { color: theme.text }]}>Appearance</Text>
          <Text style={[styles.cardSubtitle, { color: theme.text + '99' }]}>Customize the look and feel of the app.</Text>
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name="moon-outline" size={20} color={theme.accent} style={{ marginRight: 12 }} />
              <Text style={[styles.rowText, { color: theme.text }]}>Dark mode</Text>
            </View>
            <Switch
              value={mode === 'dark'}
              onValueChange={toggle}
              thumbColor={mode === 'dark' ? '#fff' : '#fff'}
              trackColor={{ false: '#cbd5e1', true: theme.accent }}
            />
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}> 
          <Text style={[styles.cardTitle, { color: theme.text }]}>About</Text>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={[styles.optionText, { color: theme.text }]}>Version</Text>
            <Text style={[styles.optionSub, { color: theme.text + '88' }]}>1.0.0</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionRow} onPress={() => router.push('/setting/privacy')}>
            <Text style={[styles.optionText, { color: theme.text }]}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={18} color={theme.text + '66'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  scroll: {
    padding: 20,
    paddingBottom: 120,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    // shadow for iOS
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    // elevation for Android
    elevation: 3,
  },
  cardTitle: { fontSize: 16, fontWeight: '700', marginBottom: 6 },
  cardSubtitle: { fontSize: 13, marginBottom: 12 },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  rowLeft: { flexDirection: 'row', alignItems: 'center' },
  rowText: { fontSize: 15 },
  optionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderTopColor: '#00000006' },
  optionText: { fontSize: 15 },
  optionSub: { fontSize: 13 },
 
});
export default index