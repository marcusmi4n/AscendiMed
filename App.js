import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from './src/constants/theme';

// Auth Screens
import LandingScreen from './src/screens/LandingScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LoginScreen from './src/screens/LoginScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';

// Main Screens
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NotificationScreen from './src/screens/NotificationScreen';

// Feature Screens
import LiveSOSScreen from './src/screens/LiveSOSScreen';
import ChatScreen from './src/screens/ChatScreen';
import ChatWithDriverScreen from './src/screens/ChatWithDriverScreen';
import BookAppointmentScreen from './src/screens/BookAppointmentScreen';
import MembershipScreen from './src/screens/MembershipScreen';
import MembershipCheckoutScreen from './src/screens/MembershipCheckoutScreen';
import MyMembershipScreen from './src/screens/MyMembershipScreen';
import ImportMediaScreen from './src/screens/ImportMediaScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingTop: 5,
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false,
          }}
        >
          {/* Auth Flow */}
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />

          {/* Main App */}
          <Stack.Screen name="Main" component={MainTabs} />
          <Stack.Screen name="Home" component={HomeScreen} />

          {/* Feature Screens */}
          <Stack.Screen 
            name="Notification" 
            component={NotificationScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="LiveSOS" 
            component={LiveSOSScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Chat" 
            component={ChatScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="ChatWithDriver" 
            component={ChatWithDriverScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="BookAppointment" 
            component={BookAppointmentScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Membership" 
            component={MembershipScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="MembershipCheckout" 
            component={MembershipCheckoutScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="MyMembership" 
            component={MyMembershipScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="ImportMedia" 
            component={ImportMediaScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen 
            name="Settings" 
            component={SettingsScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

