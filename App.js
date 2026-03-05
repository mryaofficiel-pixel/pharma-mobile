import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Connexion from './screens/Connexion';
import Inscription from './screens/Inscription';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Connexion' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Connexion' component={Connexion} />
        <Stack.Screen name='Inscription' component={Inscription} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
