import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform, StatusBar, Modal, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

export default function LiveRouteScreen() {
  const mapRef = useRef(null);
  const [hasLocation, setHasLocation] = useState(false);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });
  const [routeCoords, setRouteCoords] = useState([]);
  const [streetName, setStreetName] = useState('Locating...');
  const [lastGeocodeAt, setLastGeocodeAt] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const lastPointRef = useRef(null);
  const [showEndModal, setShowEndModal] = useState(false);

  const toRad = (value) => (value * Math.PI) / 180;
  const distanceBetween = (a, b) => {
    const R = 6371;
    const dLat = toRad(b.latitude - a.latitude);
    const dLng = toRad(b.longitude - a.longitude);
    const lat1 = toRad(a.latitude);
    const lat2 = toRad(b.latitude);
    const sinLat = Math.sin(dLat / 2);
    const sinLng = Math.sin(dLng / 2);
    const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng;
    return 2 * R * Math.asin(Math.sqrt(h));
  };

  useEffect(() => {
    let subscription;
    let isMounted = true;

    const startTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 3 },
        (position) => {
          if (!isMounted) return;
          const nextRegion = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.015,
          };
          setRegion(nextRegion);
          setHasLocation(true);
          setRouteCoords((prev) => [
            ...prev,
            { latitude: nextRegion.latitude, longitude: nextRegion.longitude },
          ]);
          if (lastPointRef.current) {
            const segment = distanceBetween(lastPointRef.current, nextRegion);
            setDistanceKm((prev) => prev + segment);
          }
          lastPointRef.current = {
            latitude: nextRegion.latitude,
            longitude: nextRegion.longitude,
          };
          if (mapRef.current) {
            mapRef.current.animateToRegion(nextRegion, 500);
          }
          const now = Date.now();
          if (now - lastGeocodeAt > 15000) {
            setLastGeocodeAt(now);
            Location.reverseGeocodeAsync({
              latitude: nextRegion.latitude,
              longitude: nextRegion.longitude,
            })
              .then(([place]) => {
                if (!isMounted) return;
                const nextName =
                  place?.street ||
                  place?.name ||
                  place?.district ||
                  place?.city ||
                  'Unknown Street';
                setStreetName(nextName);
              })
              .catch(() => {
                if (isMounted) setStreetName('Unknown Street');
              });
          }
        }
      );
    };

    startTracking();

    return () => {
      isMounted = false;
      if (subscription) subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapArea}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          showsUserLocation={hasLocation}
          followsUserLocation={hasLocation}
        >
          {routeCoords.length > 1 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor="#F5C542"
              strokeWidth={4}
            />
          )}
          {hasLocation && (
            <Marker
              coordinate={{ latitude: region.latitude, longitude: region.longitude }}
              title="Your Location"
            />
          )}
        </MapView>
      </View>

      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>{streetName}</Text>
        </View>
        <View style={styles.headerStats}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{distanceKm.toFixed(2)} km</Text>
          </View>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>254</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.userInfo}>
          <View style={styles.avatar} />
          <View>
            <Text style={styles.userName}>Ali Abdullah</Text>
            <Text style={styles.userRank}>Beginner</Text>
          </View>
        </View>
        <View style={styles.controls}>
          <View style={styles.controlItem}>
            <Text style={styles.controlIcon}>⏸</Text>
            <Text style={styles.controlText}>Pause</Text>
          </View>
          <TouchableOpacity
            style={styles.controlItem}
            activeOpacity={0.8}
            onPress={() => setShowEndModal(true)}
          >
            <Text style={styles.controlIcon}>⏹</Text>
            <Text style={styles.controlText}>End</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ExpoStatusBar style="light" />

      <Modal
        visible={showEndModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowEndModal(false)}
      >
        <View style={styles.endOverlay}>
          <View style={styles.endCard}>
            <Text style={styles.endIcon}>⚔️</Text>
            <Text style={styles.endText}>
              One more push could make you stronger. End now or keep gaining
              Strength Points?
            </Text>
            <View style={styles.endActions}>
              <TouchableOpacity
                style={[styles.endButton, styles.endButtonDanger]}
                activeOpacity={0.85}
                onPress={() => setShowEndModal(false)}
              >
                <Text style={styles.endButtonText}>End</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.endButton, styles.endButtonSuccess]}
                activeOpacity={0.85}
                onPress={() => setShowEndModal(false)}
              >
                <Text style={styles.endButtonText}>Continue</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) + 12 : 12,
    paddingHorizontal: 18,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#BEBEBE',
    fontSize: 12,
  },
  headerStats: {
    flexDirection: 'row',
    gap: 8,
  },
  headerBadge: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  headerBadgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  mapArea: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    marginBottom: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE8C8',
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  userRank: {
    fontSize: 12,
    color: '#BEBEBE',
  },
  controls: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  controlItem: {
    alignItems: 'center',
    gap: 4,
  },
  controlIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  controlText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  endOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  endCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    alignItems: 'center',
  },
  endIcon: {
    fontSize: 28,
    marginBottom: 12,
  },
  endText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 18,
  },
  endActions: {
    flexDirection: 'row',
    gap: 12,
  },
  endButton: {
    borderRadius: 18,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  endButtonDanger: {
    backgroundColor: '#9E0B0B',
  },
  endButtonSuccess: {
    backgroundColor: '#1F5D3A',
  },
  endButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});
