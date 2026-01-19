import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Platform, StatusBar, Image } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function TerritoryScreen({ navigation }) {
  const [region, setRegion] = useState(DEFAULT_REGION);
  const [hasLocation, setHasLocation] = useState(false);
  const [cityName, setCityName] = useState('Locating...');
  const mapRef = useRef(null);
  const [territories, setTerritories] = useState([]);
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [showTerritory, setShowTerritory] = useState(false);
  const [showMapKey, setShowMapKey] = useState(false);

  const randomName = () => {
    const names = [
      'Ali Abdullah',
      'Aisha Khan',
      'Omar Malik',
      'Noor Fatima',
      'Hassan Raza',
      'Sara Ahmed',
      'Zain Shah',
    ];
    return names[Math.floor(Math.random() * names.length)];
  };

  useEffect(() => {
    let subscription;
    let isMounted = true;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 5 },
        async (position) => {
          if (!isMounted) return;
          const nextRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          };
          setRegion(nextRegion);
          setHasLocation(true);
          if (mapRef.current) {
            mapRef.current.animateToRegion(nextRegion, 500);
          }
          if (!territories.length) {
            const baseLat = position.coords.latitude;
            const baseLng = position.coords.longitude;
            setTerritories([
              {
                id: 't1',
                strokeColor: '#20C997',
                fillColor: 'rgba(32, 201, 151, 0.25)',
                coordinates: [
                  { latitude: baseLat + 0.0065, longitude: baseLng - 0.006 },
                  { latitude: baseLat + 0.006, longitude: baseLng - 0.001 },
                  { latitude: baseLat + 0.0025, longitude: baseLng - 0.002 },
                  { latitude: baseLat + 0.003, longitude: baseLng - 0.0065 },
                ],
              },
              {
                id: 't2',
                strokeColor: '#3F8CFF',
                fillColor: 'rgba(63, 140, 255, 0.25)',
                coordinates: [
                  { latitude: baseLat + 0.0065, longitude: baseLng + 0.002 },
                  { latitude: baseLat + 0.006, longitude: baseLng + 0.0075 },
                  { latitude: baseLat + 0.001, longitude: baseLng + 0.006 },
                  { latitude: baseLat + 0.0015, longitude: baseLng + 0.0025 },
                ],
              },
              {
                id: 't3',
                strokeColor: '#D633FF',
                fillColor: 'rgba(214, 51, 255, 0.2)',
                coordinates: [
                  { latitude: baseLat - 0.002, longitude: baseLng - 0.007 },
                  { latitude: baseLat + 0.001, longitude: baseLng - 0.0045 },
                  { latitude: baseLat - 0.003, longitude: baseLng - 0.0025 },
                  { latitude: baseLat - 0.0055, longitude: baseLng - 0.005 },
                ],
              },
            ]);
          }
          if (cityName === 'Locating...') {
            try {
              const [place] = await Location.reverseGeocodeAsync({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
              const resolvedCity = place?.city || place?.region || place?.subregion || 'Unknown';
              if (isMounted) {
                setCityName(resolvedCity);
              }
            } catch (error) {
              if (isMounted) {
                setCityName('Unknown');
              }
            }
          }
        }
      );
    };

    startTracking();

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.remove();
      }
    };
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.name}>Ali Abdullah</Text>
            <Text style={styles.rank}>Beginner</Text>
          </View>
        </View>
        <View style={styles.headerBadges}>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🚲</Text>
            <Text style={styles.badgeText}>2000</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeIcon}>🚩</Text>
            <Text style={styles.badgeText}>2 territories</Text>
          </View>
        </View>
      </View>

      <View style={styles.mapArea}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          showsUserLocation={hasLocation}
          followsUserLocation={hasLocation}
        >
          {territories.map((territory, index) => (
            <Polygon
              key={`territory-${index}`}
              coordinates={territory.coordinates}
              strokeColor={territory.strokeColor}
              fillColor={territory.fillColor}
              strokeWidth={3}
              tappable
              onPress={() => {
                if (showTerritory && selectedTerritory?.id === territory.id) {
                  setShowTerritory(false);
                  setSelectedTerritory(null);
                  return;
                }
                setSelectedTerritory({
                  id: territory.id,
                  name: territory.ownerName || randomName(),
                  strength: territory.strength || 'Strong',
                  opponents: territory.opponents || '3',
                });
                setShowTerritory(true);
              }}
            />
          ))}
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
        <TouchableOpacity
          style={styles.mapButton}
          activeOpacity={0.7}
          onPress={() => setShowMapKey(true)}
        >
          <Text style={styles.mapButtonText}>?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSheet}>
        <View style={styles.sheetHandle} />
        <View style={styles.sheetHeader}>
          <View style={styles.sheetAvatar} />
          <View style={styles.sheetInfo}>
            <Text style={styles.sheetName}>Ali Abdullah</Text>
            <Text style={styles.sheetRank}>Beginner</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Image
              source={require('../assets/Vector.png')}
              style={styles.statIconImage}
              resizeMode="contain"
            />
            <Text style={styles.statValue}>{cityName}</Text>
          </View>
          <View style={styles.statItem}>
            <Image
              source={require('../assets/twemoji_shield.png')}
              style={styles.statIconImage}
              resizeMode="contain"
            />
            <Text style={styles.statLabel}>Territory strength</Text>
            <Text style={styles.statValue}>Strong</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statIcon}>🎯</Text>
            <Text style={styles.statLabel}>Nearby Opponents</Text>
            <Text style={styles.statValue}>3</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.85}
          onPress={() => navigation.navigate('SelectMode')}
        >
          <Text style={styles.startButtonText}>Start</Text>
        </TouchableOpacity>
      </View>

      <ExpoStatusBar style="light" />

      {showTerritory && (
        <View style={styles.territorySheetWrapper} pointerEvents="box-none">
          <View style={styles.territorySheet}>
            <View style={styles.sheetHeader}>
              <View style={styles.sheetAvatar} />
              <View style={styles.sheetInfo}>
                <Text style={styles.sheetName}>{selectedTerritory?.name || 'Unknown'}</Text>
                <Text style={styles.sheetRank}>Beginner</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Image
                  source={require('../assets/Vector.png')}
                  style={styles.statIconImage}
                  resizeMode="contain"
                />
                <Text style={styles.statValue}>{cityName}</Text>
              </View>
              <View style={styles.statItem}>
                <Image
                  source={require('../assets/twemoji_shield.png')}
                  style={styles.statIconImage}
                  resizeMode="contain"
                />
                <Text style={styles.statLabel}>Territory strength</Text>
                <Text style={styles.statValue}>{selectedTerritory?.strength}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statIcon}>🎯</Text>
                <Text style={styles.statLabel}>Nearby Opponents</Text>
                <Text style={styles.statValue}>{selectedTerritory?.opponents}</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.startButton}
              activeOpacity={0.85}
              onPress={() => navigation.navigate('SelectMode')}
            >
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {showMapKey && (
        <View style={styles.mapKeyOverlay}>
          <TouchableOpacity
            style={styles.mapKeyBackdrop}
            activeOpacity={1}
            onPress={() => setShowMapKey(false)}
          />
          <View style={styles.mapKeyCard}>
            <Text style={styles.mapKeyTitle}>Map Key</Text>
            <View style={styles.mapKeyRow}>
              <Text style={styles.mapKeyLabel}>Your Territory</Text>
              <View style={[styles.mapKeyDot, { backgroundColor: '#20C997' }]} />
              <Text style={styles.mapKeyPin}>📍</Text>
            </View>
            <View style={styles.mapKeyRow}>
              <Text style={styles.mapKeyLabel}>Nearby Territory</Text>
              <View style={[styles.mapKeyDot, { backgroundColor: '#D633FF' }]} />
              <Text style={styles.mapKeyPin}>📍</Text>
            </View>
            <View style={styles.mapKeyRow}>
              <Text style={styles.mapKeyLabel}>Neutral Territory</Text>
              <View style={[styles.mapKeyDot, { backgroundColor: '#3F8CFF' }]} />
              <Text style={styles.mapKeyPin}>📍</Text>
            </View>
            <View style={styles.mapKeyRow}>
              <Text style={styles.mapKeyLabel}>Faded Territory</Text>
              <View style={[styles.mapKeyDot, { backgroundColor: '#9E9E9E' }]} />
              <Text style={styles.mapKeyPin}>📍</Text>
            </View>
            <View style={styles.mapKeyRow}>
              <Text style={styles.mapKeyLabel}>Enemy Territory</Text>
              <View style={[styles.mapKeyDot, { backgroundColor: '#FF3B30' }]} />
              <Text style={styles.mapKeyPin}>📍</Text>
            </View>
            <Text style={styles.mapKeyFooter}>Rules and Regulations</Text>
          </View>
        </View>
      )}
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
    paddingHorizontal: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFE8C8',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  rank: {
    color: '#BEBEBE',
    fontSize: 12,
  },
  headerBadges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeIcon: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  mapArea: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 22,
    backgroundColor: '#1F2B20',
    overflow: 'hidden',
    position: 'relative',
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
    top: 12,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapButtonText: {
    fontSize: 14,
    color: '#333',
  },
  mapKeyOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  mapKeyBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  mapKeyCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
  },
  mapKeyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  mapKeyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E6E6E6',
  },
  mapKeyLabel: {
    flex: 1,
    fontSize: 13,
    color: '#333',
  },
  mapKeyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  mapKeyPin: {
    fontSize: 12,
  },
  mapKeyFooter: {
    marginTop: 14,
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#D9D0C8',
    alignSelf: 'center',
    marginBottom: 12,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 16,
  },
  sheetAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE8C8',
  },
  sheetInfo: {
    alignItems: 'center',
  },
  sheetName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  sheetRank: {
    fontSize: 12,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  statIconImage: {
    width: 26,
    height: 26,
    marginBottom: 2,
  },
  statIcon: {
    fontSize: 18,
  },
  statLabel: {
    fontSize: 12,
    color: '#444',
    textAlign: 'center',
  },
  statValue: {
    fontSize: 12,
    color: '#000',
    fontWeight: '600',
  },
  startButton: {
    backgroundColor: '#000000',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  territorySheetWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  territorySheet: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
  },
});
