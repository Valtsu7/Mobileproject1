import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack"
import Home from './screens/Home/Home';
import Login from './screens/login/Login';
import Profile from './screens/profile/Profile';
import Register from './screens/login/Register';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AddRecipe from './screens/AddRecipe/AddRecipe';
import ShoppingScreen from './screens/shoppingList/ShoppingScreen';
import CreateShoppingListScreen from './screens/shoppingList/CreateShoppingListScreen';
import BrowseShoppingListsScreen from './screens/shoppingList/BrowseShoppingListsScreen';
import ShoppingListDetailsScreen from './screens/shoppingList/ShoppingListDetailsScreen';
import EditShoppingListScreen from './screens/shoppingList/EditShoppingListScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PastaScreen from './screens/Categories/Pasta';
import SaladScreen from './screens/Categories/Salad';
import FishScreen from './screens/Categories/Fish';
import { db, auth } from './firebase/Config';
import VegeScreen from './screens/Categories/Vegetarian';
import MeatScreen from './screens/Categories/Meat';
import BurgersScreen from './screens/Categories/Burgers';
import PizzaScreen from './screens/Categories/Pizza';
import GrilledfoodsScreen from './screens/Categories/Grilledfoods';
import SoupsScreen from './screens/Categories/Soups';
import DessertsScreen from './screens/Categories/Desserts';
import BreadandrollsScreen from './screens/Categories/Breadsandrolls';
import GlutenFreeScreen from './screens/Categories/GlutenFree';
import Search from './screens/Search/Search';
import RecipeScreen from './screens/Recipe/Recipe';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Create a stack navigator
const Drawer = createDrawerNavigator();
const Stack1 = createStackNavigator();

// Function to render the bottom navigation
const BottomNavigation = () => {
  return (
    <Tab.Navigator
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
      <Tab.Screen name='Add Recipe' component={AddRecipe} />
      <Tab.Screen name='Shopping List' component={ShoppingStack} />
      <Tab.Screen name='Profile' component={Profile} />
    </Tab.Navigator>
  );
};

// Function to render the stack navigator for shopping screens
const ShoppingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name=" " component={ShoppingScreen} />
      <Stack.Screen name="Create Shopping List" component={CreateShoppingListScreen} />
      <Stack.Screen name="Saved lists" component={BrowseShoppingListsScreen} />
      <Stack.Screen name="Selected list" component={ShoppingListDetailsScreen} /> 
      <Stack.Screen name="Edit list" component={EditShoppingListScreen} /> 
    </Stack.Navigator>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setIsLoggedIn(!!user);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomNavigation />
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default App;
