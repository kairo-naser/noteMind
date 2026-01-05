import Header from '@/components/header';
import { useTheme } from '@/theme/themeContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PrivacyPage: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]} edges={["top","bottom"]}>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.card, { backgroundColor: theme.card, shadowColor: theme.text }]}> 
          <Text style={[styles.title, { color: theme.text }]}>Privacy Policy</Text>
          <Text style={[styles.p, { color: theme.text + 'dd' }]}>We respect your privacy. This app stores notes locally on your device and does not share your data with third parties.</Text>
          {/* <Text style={[styles.p, { color: theme.text + 'dd' }]}>If you have questions about data handling, contact us at support@example.com.</Text> */}
        </View>

        <TouchableOpacity style={[styles.backBtn, { borderColor: theme.text + '22' }]} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={18} color={theme.accent} />
          <Text style={[styles.backText, { color: theme.accent }]}>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 20, paddingBottom: 120 },
  card: { borderRadius: 12, padding: 16, marginBottom: 16, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 10, elevation: 3 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  p: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  backBtn: { flexDirection: 'row', alignItems: 'center', padding: 12, borderWidth: 1, borderRadius: 10, alignSelf: 'flex-start' },
  backText: { marginLeft: 8, fontWeight: '700' },
});

export default PrivacyPage;
