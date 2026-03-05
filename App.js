import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Connexion from './screens/Connexion';
import Inscription from './screens/Inscription';
import Recherche from './screens/Recherche';
import MesCommandes from './screens/MesCommandes';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MenuPrincipal() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#1d6d80', tabBarInactiveTintColor: '#888888', tabBarStyle: { backgroundColor: '#ffffff', borderTopColor: '#e0e0e0', height: 60, paddingBottom: 8 } }}>
      <Tab.Screen name='Recherche' component={Recherche} options={{ tabBarLabel: 'Recherche', tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>Recherche</Text> }} />
      <Tab.Screen name='MesCommandes' component={MesCommandes} options={{ tabBarLabel: 'Commandes', tabBarIcon: ({ color }) => <Text style={{ fontSize: 20, color }}>Commandes</Text> }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Connexion' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Connexion' component={Connexion} />
        <Stack.Screen name='Inscription' component={Inscription} />
        <Stack.Screen name='Menu' component={MenuPrincipal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
