import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function HomeScreen({ navigation }) {
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [hasLocation, setHasLocation] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const current = await Location.getCurrentPositionAsync({});
      if (!isMounted) return;

      const nextRegion = {
        latitude: current.coords.latitude,
        longitude: current.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };

      setRegion(nextRegion);
      setHasLocation(true);
    };

    loadLocation();

    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerLabel}>Welcome,</Text>
          <Text style={styles.headerName}>Ali Abdullah</Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon} activeOpacity={0.8}>
            <Text style={styles.headerIconText}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIcon}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Alerts')}
          >
            <Text style={styles.headerIconText}>🔔</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🦾</Text>
            <Text style={styles.statValue}>2000</Text>
            <Text style={styles.statLabel}>points</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>⚔️</Text>
            <Text style={styles.statValue}>30</Text>
            <Text style={styles.statLabel}>offers</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>20</Text>
            <Text style={styles.statLabel}>days</Text>
          </View>
        </View>

        <View style={styles.mapCard}>
          <MapView style={styles.map} region={region}>
            {hasLocation && (
              <Marker
                coordinate={{ latitude: region.latitude, longitude: region.longitude }}
                title="Your Location"
              />
            )}
          </MapView>
          {!hasLocation && (
            <View style={styles.mapOverlay}>
              <Text style={styles.mapOverlayText}>Enable location to show your position</Text>
            </View>
          )}
          <View style={styles.mapButton}>
            <Text style={styles.mapButtonText}>⤢</Text>
          </View>
        </View>

        <View style={styles.leaderboardCard}>
          <Text style={styles.leaderboardTitle}>Leader board</Text>
          {[
            { name: 'Ali Abdullah', points: '459 points', medal: '🥇' },
            { name: 'Hania', points: '459 points', medal: '🥈' },
            { name: 'Ali', points: '459 points', medal: '🥉' },
          ].map((item) => (
            <View key={item.name} style={styles.leaderboardRow}>
              <View style={styles.leaderAvatar} />
              <View style={styles.leaderInfo}>
                <Text style={styles.leaderName}>{item.name}</Text>
                <Text style={styles.leaderPoints}>{item.points}</Text>
              </View>
              <Text style={styles.leaderMedal}>{item.medal}</Text>
            </View>
          ))}
          <TouchableOpacity style={styles.seeMore} activeOpacity={0.8}>
            <Text style={styles.seeMoreText}>See More ⌄</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionHeading}>Promos</Text>
        <View style={styles.promoCard}>
          <View style={styles.promoBadge}>
            <Text style={styles.promoBadgeText}>Stars Sport Academy</Text>
          </View>
          <Text style={styles.promoDiscount}>10%{'\n'}Off on Fee</Text>
          <View style={styles.promoFooter}>
            <Text style={styles.promoTag}>⭐ Top 5 players</Text>
            <Text style={styles.promoTag}>⭐</Text>
          </View>
        </View>
        <View style={styles.dotsRow}>
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
          <View style={styles.dot} />
        </View>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Text style={styles.tabIconActive}>🏠</Text>
          <Text style={styles.tabTextActive}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.centerAction}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Territory')}
        >
          <Text style={styles.centerIcon}>🏃</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} activeOpacity={0.7}>
          <Text style={styles.tabIcon}>👤</Text>
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>

      <ExpoStatusBar style="light" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: 12,
  },
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 18 : 18,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  headerIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  headerLabel: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  headerName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  content: {
    padding: 20,
    gap: 16,
    paddingBottom: 40,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#E6E6E6',
  },
  mapCard: {
    height: 190,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 8,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mapOverlayText: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
  },
  mapButton: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  mapButtonText: {
    fontSize: 12,
    color: '#333',
  },
  leaderboardCard: {
    backgroundColor: '#A16AA2',
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  leaderboardTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 6,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
  },
  leaderAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#F6E1D3',
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  leaderPoints: {
    color: '#FFFFFF',
    fontSize: 11,
    opacity: 0.8,
  },
  leaderMedal: {
    fontSize: 16,
  },
  seeMore: {
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 12,
  },
  seeMoreText: {
    color: '#6F4C8B',
    fontSize: 11,
    fontWeight: '600',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  promoCard: {
    height: 120,
    borderRadius: 16,
    backgroundColor: '#0B111C',
    padding: 14,
    justifyContent: 'space-between',
  },
  promoBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  promoBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  promoDiscount: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
  },
  promoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  promoTag: {
    color: '#FFFFFF',
    fontSize: 10,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 6,
    alignSelf: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#C4C4C4',
  },
  dotActive: {
    backgroundColor: '#7A3E9D',
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
    borderWidth: 5,
    borderColor: '#FFFFFF',
    marginTop: -22,
  },
  centerIcon: {
    color: '#FFFFFF',
    fontSize: 35,
  },
});
