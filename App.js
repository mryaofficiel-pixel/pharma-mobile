import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Recherche from './screens/Recherche';
import Resultats from './screens/Resultats';
import Connexion from './screens/Connexion';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Recherche' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Recherche' component={Recherche} />
        <Stack.Screen name='Resultats' component={Resultats} />
        <Stack.Screen name='Connexion' component={Connexion} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
