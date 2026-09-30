import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import WelcomeScreen from '../screens/WelcomeScreen';
import Screen1 from '../screens/Screen1'; // Registro
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3'; // EditarDatos
import Screen4 from '../screens/Screen4'; // ListaProductos
import LoginScreen from '../screens/LoginScreen';
import PerfilScreen from '../screens/PerfilScreen';

const Stack = createStackNavigator();
const Bottom = createBottomTabNavigator();

function MyBottom() {
  return (
    <Bottom.Navigator initialRouteName="Perfil">
      <Bottom.Screen name="EditarDatos" component={Screen3} />
      <Bottom.Screen name="ListaProductos" component={Screen4} />
      <Bottom.Screen name="Perfil" component={PerfilScreen} />
    </Bottom.Navigator>
  );
}

function MyStack({ initialRoute }: { initialRoute: string }) {
  return (
    <Stack.Navigator initialRouteName={initialRoute}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Registro" component={Screen1} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen 
        name="Bottom" 
        component={MyBottom} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

export function Navegador({ userId }: { userId: string | null }) {
  const initialRoute = userId ? "Bottom" : "Welcome";

  return (
    <NavigationContainer>
      <MyStack initialRoute={initialRoute} />
    </NavigationContainer>
  );
}
