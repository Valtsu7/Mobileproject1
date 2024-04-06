import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from './screens/Home';
import Login from './screens/Login';
import ShoppingList from './screens/Shoppinglist';
import Profile from './screens/Profile';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AddRecipe from './screens/AddRecipe';

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

            } else if (route.name === 'Add Recipe') {
              iconName = focused 
                ? 'plus-circle'
                : 'plus-circle-outline';
                
            } else if (route.name === 'Shopping List') {
              iconName = focused 
                ? 'cart'
                : 'cart-outline';
            }
             else if (route.name === 'Profile') {
              iconName = focused 
                ? 'food-apple'
                : 'food-apple-outline';
            }
          
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name='Home' component={Home}  />
        <Tab.Screen name='Add Recipe' component={AddRecipe}/>
        <Tab.Screen name='Shopping List' component={ShoppingList}/>
        <Tab.Screen name='Profile' component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
