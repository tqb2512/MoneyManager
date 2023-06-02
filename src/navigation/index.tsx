import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'

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
import Daily from '../screens/Home/Daily';
import EditTransaction from '../screens/AddTransaction/components/EditTransaction';
import CalendarView from '../screens/Home/Calendar';
const BottomBar = createBottomTabNavigator();
const TopTabNavigatior = createMaterialTopTabNavigator();


const Stack = createNativeStackNavigator();
const StackEdit = createNativeStackNavigator();

export type RootStackParams = {
  Account: undefined
  AddAccount: undefined
  DeleteAccount: undefined
  Add: undefined
  IncomeCategory: undefined
  EditIncomeCategory: {categoryName: String}
  CategoryButton: {categoryType: String, categoryName: String}
  AccountSetting: undefined
  EditAccountView: { accountGroup: String, accountName: String, accountAmount: String, accountDescription: String }
  Daily: undefined
  EditTransaction: { _id: any, _type: any, _category: any, _account: any, _amount: any, _note: any, _day: any, _month: any, _year: any, _time: any }
};

export type RootStackParams2 = {
  Add: undefined
  IncomeCategory: undefined
  EditIncomeCategory: {categoryName: String}
  CategoryButton: {categoryType: String, categoryName: String}
  AccountSetting: undefined
  AddAccount: undefined
  EditAccountView: { accountGroup: String, accountName: String, accountAmount: String, accountDescription: String }
  Daily: undefined
  EditTransaction: { _id: any, _type: any, _category: any, _account: any, _amount: any, _note: any, _day: any, _month: any, _year: any, _time: any }
};


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
        }
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
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} options={{headerShown: false}} />
        <StackEdit.Screen name="EditAccountView" component={AccountEditView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function StackEditNavigation () {
  return (
    <NavigationContainer independent={true}>
      <StackEdit.Navigator>
        <StackEdit.Screen name="Add" component={AddTransaction}/>
        <StackEdit.Screen name="AccountSetting" component={AccountSetting} options={{headerShown: false}} />
        <StackEdit.Screen name="AddAccount" component={AddAccount} />
        <StackEdit.Screen name="EditAccountView" component={AccountEditView} />
        <StackEdit.Screen name="Daily" component={Daily} />
        <StackEdit.Screen name="EditTransaction" component={EditTransaction} options={{headerShown: true}} />
        <StackEdit.Screen name="Calendar" component={CalendarView} />
      </StackEdit.Navigator>
    </NavigationContainer>
  )
}

export function StackTransEditNavigation () {
  return (
    <NavigationContainer independent={true}>
      <StackEdit.Navigator>
        <StackEdit.Screen name="Daily" component={Daily} />
        <StackEdit.Screen name="EditTransaction" component={EditTransaction} options={{headerShown: true}} />
        <StackEdit.Screen name="AccountSetting" component={AccountSetting} options={{headerShown: false}} />
        <StackEdit.Screen name="Calendar" component={CalendarView} />
      </StackEdit.Navigator>
    </NavigationContainer>
  )
}

export function CalendarStackNavigation () {
  return (
    <NavigationContainer independent={true}>
      <StackEdit.Navigator>
        <StackEdit.Screen name="Calendar" component={CalendarView} />
        <StackEdit.Screen name="EditTransaction" component={EditTransaction} options={{headerShown: false}} />
        {/* <StackEdit.Screen name="AccountSetting" component={AccountSetting} options={{headerShown: false}} /> */}
      </StackEdit.Navigator>
    </NavigationContainer>
  )
}

export default BottomBarTabs;