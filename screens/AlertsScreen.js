import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, TouchableOpacity } from 'react-native';

export default function AlertsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Raven Missives Delivered</Text>

        <View style={[styles.alertCard, styles.alertCardPurple]}>
          <View style={styles.alertIcon} />
          <View style={styles.alertContent}>
            <View style={styles.alertHeaderRow}>
              <Text style={styles.alertTitlePurple}>Imperial Rank Update</Text>
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>New</Text>
              </View>
            </View>
            <Text style={styles.alertText}>
              Weekly ranks updated. Lets, Take a look.
            </Text>
            <Text style={styles.alertTime}>3 min ago</Text>
          </View>
        </View>

        <View style={[styles.alertCard, styles.alertCardRed]}>
          <View style={[styles.alertIcon, styles.alertIconRed]} />
          <View style={styles.alertContent}>
            <View style={styles.alertHeaderRow}>
              <Text style={styles.alertTitleRed}>Imperial Rank Update</Text>
              <View style={styles.alertBadge}>
                <Text style={styles.alertBadgeText}>New</Text>
              </View>
            </View>
            <Text style={styles.alertText}>
              Your Territory is under attack. Defend it.
            </Text>
            <Text style={styles.alertTime}>3 min ago</Text>
            <View style={styles.alertActions}>
              <TouchableOpacity style={styles.alertButtonDark} activeOpacity={0.8}>
                <Text style={styles.alertButtonText}>Ignore</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.alertButtonGreen} activeOpacity={0.8}>
                <Text style={styles.alertButtonText}>Defend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.footerText}>With every step, A prophecy unfolds</Text>
      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 14 : 14,
    paddingBottom: 12,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 18,
  },
  alertCard: {
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  alertCardPurple: {
    backgroundColor: '#D7C4E4',
    borderColor: '#9E7CB3',
  },
  alertCardRed: {
    backgroundColor: '#F8C4BC',
    borderColor: '#F08B7E',
  },
  alertIcon: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: '#6B3B87',
  },
  alertIconRed: {
    backgroundColor: '#F0463A',
  },
  alertContent: {
    flex: 1,
  },
  alertHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertTitlePurple: {
    color: '#5D2D7C',
    fontSize: 14,
    fontWeight: '700',
  },
  alertTitleRed: {
    color: '#E23E32',
    fontSize: 14,
    fontWeight: '700',
  },
  alertBadge: {
    backgroundColor: '#E53B2D',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  alertBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  alertText: {
    color: '#5B4B4B',
    fontSize: 12,
    marginTop: 6,
  },
  alertTime: {
    color: '#5B4B4B',
    fontSize: 11,
    marginTop: 10,
  },
  alertActions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  alertButtonDark: {
    backgroundColor: '#8B1D1D',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  alertButtonGreen: {
    backgroundColor: '#1F5D3A',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  footerText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 10,
  },
});
