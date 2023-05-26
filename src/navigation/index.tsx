import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Home from '../screens/Home';
import Stats from '../screens/Stats';
import Budget from '../screens/Budget';
import Account from '../screens/Account';
import Transaction from '../screens/Transaction';
import AddAccount from '../screens/AddAccount';
import {NavigationContainer} from '@react-navigation/native';
const BottomBar = createBottomTabNavigator();
const TopTabNavigatior = createMaterialTopTabNavigator();


const Stack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  Home: undefined
  Account: undefined
  AddAccount: undefined
  Stats: undefined
};

function BottomBarTabs() {
  return (
    <BottomBar.Navigator>
      <BottomBar.Screen name="Home" component={Home} />
      <BottomBar.Screen name="Stats" component={Stats} />
      <BottomBar.Screen name="Budget" component={Budget} />
      <BottomBar.Screen
        name="Account"
        component={Account}
        options={{headerShown: false}}
      />
      <BottomBar.Screen
        name="Transaction"
        component={Transaction}
        options={{headerShown: false}}
      />
    </BottomBar.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Account'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Stats" component={Stats} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="AddAccount" component={AddAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default BottomBarTabs;
