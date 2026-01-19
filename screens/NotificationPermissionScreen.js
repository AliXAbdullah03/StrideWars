import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import Constants from 'expo-constants';

export default function NotificationPermissionScreen({ navigation }) {
  const [status, setStatus] = useState('undetermined');
  const isExpoGo =
    Constants.appOwnership === 'expo' || Constants.executionEnvironment === 'storeClient';

  const requestPermission = useCallback(async () => {
    const { requestPermissionsAsync } = await import('expo-notifications');
    const result = await requestPermissionsAsync();
    setStatus(result.status);
    return result;
  }, []);

  useEffect(() => {
    if (!isExpoGo) {
      requestPermission();
    }
  }, [requestPermission]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Enable Permissions</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.content}>
          <View style={styles.illustration}>
            <Image
              source={require('../assets/New Notification.png')}
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.title}>Enable Notifications</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.allowButton}
              activeOpacity={0.8}
              onPress={() => {
                if (!isExpoGo) {
                  requestPermission();
                }
                navigation.navigate('Home');
              }}
            >
              <Text style={styles.allowButtonText}>Allow</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.laterButton} activeOpacity={0.7}>
              <Text style={styles.laterText}>Maybe Later</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 10 : 10,
    paddingBottom: 16,
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  illustration: {
    marginTop: 200,
    marginBottom: -150,
    height: 200,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationImage: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: -25,
    marginBottom: 0,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
  },
  allowButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  allowButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  laterButton: {
    marginTop: 16,
  },
  laterText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
});
