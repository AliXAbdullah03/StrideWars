import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, Modal } from 'react-native';

export default function SelectModeScreen({ navigation }) {
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [targetTime, setTargetTime] = useState('30 min');
  const [selectedMode, setSelectedMode] = useState('Cycle');
  const [showWaiting, setShowWaiting] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mode Selection</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Begin Conquest</Text>
        <Text style={styles.subtitle}>For the Glory of Imperium</Text>

        <Text style={styles.sectionTitle}>Select Mode</Text>
        <View style={styles.modeRow}>
          <TouchableOpacity
            style={[
              styles.modeCard,
              selectedMode === 'Cycle' && styles.modeCardActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedMode('Cycle')}
          >
            <Text style={styles.modeEmoji}>🚲</Text>
            <Text style={styles.modeTitle}>Cycle</Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Swift Attack</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Speed Bonus</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>3x points per km</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeCard,
              selectedMode === 'Jog' && styles.modeCardActive,
            ]}
            activeOpacity={0.85}
            onPress={() => setSelectedMode('Jog')}
          >
            <Text style={styles.modeEmoji}>🏃</Text>
            <Text style={styles.modeTitle}>Jog</Text>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Long Siege</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>Range Bonus</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.bulletText}>5x points per km</Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Battle Details</Text>
        <Text style={styles.label}>Target Time</Text>
        <TouchableOpacity
          style={styles.inputBox}
          activeOpacity={0.8}
          onPress={() => setShowTimeOptions(!showTimeOptions)}
        >
          <Text style={styles.inputIcon}>🕒</Text>
          <Text style={styles.inputText}>{targetTime}</Text>
          <Text style={styles.inputChevron}>⌄</Text>
        </TouchableOpacity>

        {showTimeOptions && (
          <View style={styles.dropdown}>
            {['30 min', '45 min', '60 min', '90 min', '120 min'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownItem}
                activeOpacity={0.7}
                onPress={() => {
                  setTargetTime(option);
                  setShowTimeOptions(false);
                }}
              >
                <Text style={styles.dropdownText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.85}
          onPress={() => setShowWaiting(true)}
        >
          <Text style={styles.actionButtonText}>Initiate</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={styles.tabTextActive}>Home</Text>
        </TouchableOpacity>
        <View style={styles.centerAction}>
          <Text style={styles.centerIcon}>🏃</Text>
        </View>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ExpoStatusBar style="light" />

      <Modal
        visible={showWaiting}
        transparent
        animationType="slide"
        onRequestClose={() => setShowWaiting(false)}
      >
        <View style={styles.waitingOverlay}>
          <TouchableOpacity
            style={styles.waitingBackdrop}
            activeOpacity={1}
            onPress={() => setShowWaiting(false)}
          />
          <View style={styles.waitingSheet}>
            <Text style={styles.waitingTitle}>Waiting for opponent</Text>
            <Text style={styles.waitingText}>
              Waiting for opponent to initiate fight. You can continue to wait here or go back
              you will be notified later.
            </Text>

            <TouchableOpacity
              style={styles.waitingPrimary}
              activeOpacity={0.85}
              onPress={() => {
                setShowWaiting(false);
                navigation.navigate('LiveRoute');
              }}
            >
              <Text style={styles.waitingPrimaryText}>Stay Here</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.waitingLink} activeOpacity={0.7}>
              <Text style={styles.waitingLinkText}>Notify Later</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.waitingLink}
              activeOpacity={0.7}
              onPress={() => setShowWaiting(false)}
            >
              <Text style={styles.waitingLinkText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  modeRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  modeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#D7D7D7',
    padding: 12,
  },
  modeCardActive: {
    borderColor: '#FF6A3D',
    shadowColor: '#FF6A3D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
  },
  modeEmoji: {
    fontSize: 20,
    marginBottom: 6,
  },
  modeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: 4,
  },
  bullet: {
    color: '#000',
  },
  bulletText: {
    color: '#000',
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    paddingHorizontal: 12,
    height: 48,
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
  },
  dropdown: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D0D0D0',
    backgroundColor: '#FFFFFF',
    marginBottom: 24,
    overflow: 'hidden',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  dropdownText: {
    color: '#000',
    fontSize: 14,
  },
  inputIcon: {
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    color: '#666',
  },
  inputChevron: {
    color: '#666',
  },
  actionButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  tabBar: {
    backgroundColor: '#0E0E0E',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  tabItem: {
    alignItems: 'center',
    gap: 4,
  },
  tabIconActive: {
    color: '#FF6A3D',
    fontSize: 18,
  },
  tabTextActive: {
    color: '#FF6A3D',
    fontSize: 12,
  },
  tabIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  centerAction: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginTop: -22,
  },
  centerIcon: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  waitingOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  waitingBackdrop: {
    flex: 1,
  },
  waitingSheet: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 24,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
  },
  waitingTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 10,
  },
  waitingText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 18,
    marginBottom: 16,
  },
  waitingPrimary: {
    backgroundColor: '#000000',
    borderRadius: 10,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  waitingPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  waitingLink: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  waitingLinkText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
});
