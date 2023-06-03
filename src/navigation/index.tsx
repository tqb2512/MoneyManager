import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import SelectDropdown from 'react-native-select-dropdown';

import Home from '../screens/Home';
import Stats from '../screens/Stats';
import Account from '../screens/Account';
import AddAccount from '../screens/Account/AddAccount';
import {NavigationContainer} from '@react-navigation/native';
import AddTransaction from '../screens/AddTransaction';
import DeleteAccount from '../screens/Account/DeleteAccount';
import IncomeCategoryScreen from '../screens/ChangeCategory/IncomeCategoryScreen';
import CategoryEditView from '../screens/ChangeCategory/components/CategoryEditView';
import CategoryButton from '../screens/ChangeCategory/components/CategoryButton';
import AccountSetting from '../screens/Account/AccountSetting';
import AccountEditView from '../screens/Account/AccountSetting/components/AccountEditView';
import { u } from 'react-native-big-calendar';
const BottomBar = createBottomTabNavigator();
const TopTabNavigatior = createMaterialTopTabNavigator();


const Stack = createNativeStackNavigator();
const StackEdit = createNativeStackNavigator();

export type RootStackParams = {
  Account: undefined
  AddAccount: undefined
  DeleteAccount: undefined
};

export type RootStackParams2 = {
  Add: undefined
  IncomeCategory: undefined
  EditIncomeCategory: {categoryName: String}
  CategoryButton: {categoryType: String, categoryName: String}
  AccountSetting: undefined
  AddAccount: undefined
  EditAccountView: { accountGroup: String, accountName: String, accountAmount: String, accountDescription: String }
};

const timeOptions = ["Monthly", "Yearly"];

function BottomBarTabs() {

  return (
    <BottomBar.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle:{
          height: 60,
        },
        tabBarItemStyle:{
          alignItems: 'center',
          justifyContent: 'center'
        },
      }}
    >
      <BottomBar.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={30}/>
        }}
        />
      <BottomBar.Screen 
        name="Stats" 
        component={Stats} 
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-pie-chart' : 'ios-pie-chart-outline'} size={30}/>
        }}/>
      <BottomBar.Screen
        name="Account"
        component={AppNavigation}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-card' : 'ios-card-outline'} size={30}/>
        }}
      />
      <BottomBar.Screen 
        name="Add" 
        component={StackEditNavigation} 
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            <Ionicons name={focused ? 'ios-settings' : 'ios-settings-outline'} size={30}/>
        }}
      />
    </BottomBar.Navigator>
  );
}

function AppNavigation() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen name="Account" component={Account} options={{headerShown: false}} />
        <Stack.Screen name="AddAccount" component={AddAccount} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function StackEditNavigation () {
  return (
    <NavigationContainer independent={true}>
      <StackEdit.Navigator>
        <StackEdit.Screen name="Add" component={AddTransaction}/>
        <StackEdit.Screen name="IncomeCategory" component={IncomeCategoryScreen} />
        <StackEdit.Screen name="EditIncomeCategory" component={CategoryEditView} />
        <StackEdit.Screen name="AccountSetting" component={AccountSetting} options={{headerShown: false}} />
        <StackEdit.Screen name="AddAccount" component={AddAccount} />
        <StackEdit.Screen name="EditAccountView" component={AccountEditView} />
      </StackEdit.Navigator>
    </NavigationContainer>
  )
}

export default BottomBarTabs;
