import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import LocationPermissionScreen from './screens/LocationPermissionScreen';
import MotionPermissionScreen from './screens/MotionPermissionScreen';
import NotificationPermissionScreen from './screens/NotificationPermissionScreen';
import HomeScreen from './screens/HomeScreen';
import TerritoryScreen from './screens/TerritoryScreen';
import SelectModeScreen from './screens/SelectModeScreen';
import LiveRouteScreen from './screens/LiveRouteScreen';
import AlertsScreen from './screens/AlertsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen}
        />
        <Stack.Screen
          name="LocationPermission"
          component={LocationPermissionScreen}
        />
        <Stack.Screen
          name="MotionPermission"
          component={MotionPermissionScreen}
        />
        <Stack.Screen
          name="NotificationPermission"
          component={NotificationPermissionScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          name="Territory"
          component={TerritoryScreen}
        />
        <Stack.Screen
          name="SelectMode"
          component={SelectModeScreen}
        />
        <Stack.Screen
          name="LiveRoute"
          component={LiveRouteScreen}
        />
        <Stack.Screen
          name="Alerts"
          component={AlertsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
