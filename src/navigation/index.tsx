import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, HomeTopBarParamList, RootStackParamList, StatsTopBarParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import DailyScreen from '../screens/Home/Daily';
import CelandarScreen from '../screens/Home/Celandar';
import IncomeScreen from '../screens/Stats/Income';
import ExpenseScreen from '../screens/Stats/Expense';
import AccountsScreen from '../screens/Account';
import AddAccountScreen from '../screens/AddAccount';
import AddTransaction from '../screens/AddTransaction';
import TransactionDetail from '../screens/TransactionDetail';
import AccountDetail from '../screens/AccountDetail';


const HomeTopBar = createMaterialTopTabNavigator<HomeTopBarParamList>();
const StatsTopBar = createMaterialTopTabNavigator<StatsTopBarParamList>();
const BottomBar = createBottomTabNavigator<BottomTabParamList>();
const AppStack = createStackNavigator<RootStackParamList>();

function BottomBarTabs()
{
  return (
    <BottomBar.Navigator>
      <BottomBar.Screen name="bottom_bar_home" component={HomeScreenTopBar} />
      <BottomBar.Screen name="bottom_bar_stats" component={StatsScreenTopBar} />
      <BottomBar.Screen name="bottom_bar_accounts" component={AccountsScreen} />
    </BottomBar.Navigator>
  )
}

function HomeScreenTopBar()
{
  return (
    <HomeTopBar.Navigator>
      <HomeTopBar.Screen name="home_top_bar_daily" component={DailyScreen} />
      <HomeTopBar.Screen name="home_top_bar_celandar" component={CelandarScreen} />
    </HomeTopBar.Navigator>
  ) 
}

function StatsScreenTopBar()
{
  return (
    <StatsTopBar.Navigator>
      <StatsTopBar.Screen name="stats_top_bar_income" component={IncomeScreen} />
      <StatsTopBar.Screen name="stats_top_bar_expense" component={ExpenseScreen} />
    </StatsTopBar.Navigator>
  )
}

function AppNavigation()
{
  return (
    <AppStack.Navigator initialRouteName="bottom_bar">
      <AppStack.Screen name="add_account" component={AddAccountScreen} />
      <AppStack.Screen name="add_transaction" component={AddTransaction} />
      <AppStack.Screen name="account_detail" component={AccountDetail} />
      <AppStack.Screen name="transaction_detail" component={TransactionDetail} />
      <AppStack.Screen name="bottom_bar" component={BottomBarTabs} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;