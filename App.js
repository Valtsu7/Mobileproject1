import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"
import Home from './screens/Home';
import Login from './screens/Login';
import Profile from './screens/profile/Profile';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AddRecipe from './screens/AddRecipe';
import ShoppingScreen from './screens/shoppingList/ShoppingScreen';
import CreateShoppingListScreen from './screens/shoppingList/CreateShoppingListScreen';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create a stack navigator

// Function to render shopping screen
const ShoppingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} />
      <Stack.Screen name="CreateShoppingList" component={CreateShoppingListScreen} />
    </Stack.Navigator>
  );
};

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
        <Tab.Screen name='Shopping List' component={ShoppingScreen}/>
        <Tab.Screen name='Profile' component={Profile}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
