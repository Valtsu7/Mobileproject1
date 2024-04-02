import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './components/Home';
import Login from './components/Login';
import ShoppingList from './components/Shoppinglist';
import Profile from './components/Profile';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: 'transparent' }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'home-circle'
                : 'home-circle-outline';
            } else if (route.name === 'Login') {
              iconName = focused 
                ? 'login'
                : 'logout';
            } else if (route.name === 'Profile') {
              iconName = focused 
                ? 'food-apple'
                : 'food-apple-outline';
            }
             else if (route.name === 'ShoppingList') {
              iconName = focused 
                ? 'cart'
                : 'cart-outline';
          }
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Home' component={Home}  />
        <Tab.Screen name='Login' component={Login}/>
        <Tab.Screen name='Profile' component={Profile}/>
        <Tab.Screen name='ShoppingList' component={ShoppingList}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
