// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import components
import Auth from './components/Auth';
import RegisterScreen from './components/RegisterScreen';
import ActivityList from './components/ActivityList';
import ActivityDetails from './components/ActivityDetails';
import BusinessOwnerProfile from './components/BusinessOwnerProfile';
import ManageActivities from './components/ManageActivities';
import UserProfile from './components/UserProfile';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ActivityStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ActivityList" 
      component={ActivityList} 
      options={{ title: 'Morocco Activities' }}
    />
    <Stack.Screen 
      name="ActivityDetails" 
      component={ActivityDetails} 
      options={{ title: 'Activity Details' }}
    />
  </Stack.Navigator>
);

const BusinessStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="BusinessProfile" 
      component={BusinessOwnerProfile} 
      options={{ title: 'Business Profile' }}
    />
    <Stack.Screen 
      name="ManageActivities" 
      component={ManageActivities} 
      options={{ title: 'Manage Activities' }}
    />
  </Stack.Navigator>
);

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Activities') {
          iconName = focused ? 'list' : 'list-outline';
        } else if (route.name === 'Profile') {
          iconName = focused ? 'person' : 'person-outline';
        } else if (route.name === 'Business') {
          iconName = focused ? 'briefcase' : 'briefcase-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Activities" component={ActivityStack} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={UserProfile} />
    <Tab.Screen name="Business" component={BusinessStack} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Auth} />
    <Stack.Screen name="Register" component={RegisterScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}