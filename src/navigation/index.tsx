import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Home from '../screens/Home';
import Stats from '../screens/Stats';
import Account from '../screens/Account';
import AddAccount from '../screens/Account/AddAccount';
import {NavigationContainer} from '@react-navigation/native';
import AddTransaction from '../screens/AddTransaction';
import DeleteAccount from '../screens/Account/DeleteAccount';
import AccountSetting from '../screens/Account/AccountSetting';
import AccountEditView from '../screens/Account/AccountSetting/components/AccountEditView';
import Daily from '../screens/Home/Daily';
import EditTransaction from '../screens/AddTransaction/components/EditTransaction';
const BottomBar = createBottomTabNavigator();
const TopTabNavigatior = createMaterialTopTabNavigator();


const Stack = createNativeStackNavigator();
const StackEdit = createNativeStackNavigator();
const Stack3 = createNativeStackNavigator(); // cho edit transaction

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
}

export type RootStackParams3 = {
  Daily: undefined
  EditTransaction: { _id: any, _type: any, _category: any, _account: any, _amount: any, _note: any, _day: any, _month: any, _year: any, _time: any }
}



function BottomBarTabs() {
  return (
    <BottomBar.Navigator>
      <BottomBar.Screen name="Home" component={Home} options={{headerShown: false}} />
      <BottomBar.Screen name="Stats" component={Stats} />
      <Stack.Screen
        name="Account"
        component={AppNavigation}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Add" component={StackEditNavigation} options={{headerShown: false}}/>
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
      </StackEdit.Navigator>
    </NavigationContainer>
  )
}

export default BottomBarTabs;
