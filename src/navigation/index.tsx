import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList, HomeTopBarParamList, RootStackParamList, StatsTopBarParamList } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons'

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
    <BottomBar.Navigator
      initialRouteName='bottom_bar_home'
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
        name="bottom_bar_home" 
        component={HomeScreenTopBar}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} size={30} />
        }} 
        />
      <BottomBar.Screen 
        name="bottom_bar_stats" 
        component={StatsScreenTopBar}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-pie-chart' : 'ios-pie-chart-outline'} size={30} />
        }} 
      />
      <BottomBar.Screen 
        name="bottom_bar_accounts" 
        component={AccountsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-card' : 'ios-card-outline'} size={30} />
        }} 
      />
    </BottomBar.Navigator>
  )
}

function HomeScreenTopBar()
{
  return (
    <HomeTopBar.Navigator
      initialRouteName="home_top_bar_daily"
      tabBarOptions={{
        activeTintColor: '#000000',
        inactiveTintColor: '#000000',
        labelStyle: { fontSize: 16, fontWeight: 'bold', color: 'grey' },
        indicatorStyle: { backgroundColor: '#000000' },
        style: { backgroundColor: '#fff' },
      }}>
      <HomeTopBar.Screen 
        name="home_top_bar_daily" 
        component={DailyScreen}
        options={{
          tabBarLabel: 'Daily',
          tabBarLabelStyle: {fontSize: 18, fontWeight: 'bold'},
          tabBarActiveTintColor: '#566573',
          tabBarInactiveTintColor: '#D5D8DC',
          tabBarBounces: false,
          tabBarIndicatorStyle: {borderBottomColor: '#566573', borderBottomWidth: 1, backgroundColor: 'white'}
        }}
      />
      <HomeTopBar.Screen 
        name="home_top_bar_celandar" 
        component={CelandarScreen} 
        options={{
          tabBarLabel: 'Calendar',
          tabBarLabelStyle: {fontSize: 18, fontWeight: 'bold'},
          tabBarActiveTintColor: '#566573',
          tabBarInactiveTintColor: '#D5D8DC',
          tabBarBounces: false,
          tabBarIndicatorStyle: {borderBottomColor: '#566573', borderBottomWidth: 1, backgroundColor: 'white'}
        }}
        />
    </HomeTopBar.Navigator>
  ) 
}

function StatsScreenTopBar()
{
  return (
    <StatsTopBar.Navigator
    tabBarOptions={{
      activeTintColor: '#000000',
      inactiveTintColor: '#000000',
      labelStyle: { fontSize: 16, fontWeight: 'bold', color: 'grey' },
      indicatorStyle: { height: 0 },
      style: { backgroundColor: '#fff' },
      }}
    >
      <StatsTopBar.Screen 
      name="stats_top_bar_income" 
      component={IncomeScreen}
      options={{ 
        tabBarLabel: 'Income',
        tabBarLabelStyle: {fontSize: 18, fontWeight: 'bold'},
        tabBarActiveTintColor: '#7DCEA0',
        tabBarInactiveTintColor: '#D5D8DC',
        tabBarBounces: false,
        tabBarIndicatorStyle: {borderBottomColor: '#7DCEA0', borderBottomWidth: 1, backgroundColor: 'white'}

      }} 
    />
      <StatsTopBar.Screen 
      name="stats_top_bar_expense" 
      component={ExpenseScreen}
      options={{ 
        tabBarLabel: 'Expense',
        tabBarLabelStyle: {fontSize: 18, fontWeight: 'bold'},
        tabBarActiveTintColor: '#F1948A',
        tabBarInactiveTintColor: '#D5D8DC',
        tabBarBounces: false,
        tabBarIndicatorStyle: {borderBottomColor: '#F1948A', borderBottomWidth: 1, backgroundColor: 'white'}
      }} 
    />
    </StatsTopBar.Navigator>
  )
}

function AppNavigation()
{
  return (
    <AppStack.Navigator 
      initialRouteName="bottom_bar"
      screenOptions={{
        headerShown: false
      }}
      >
      <AppStack.Screen name="add_account" component={AddAccountScreen} />
      <AppStack.Screen name="add_transaction" component={AddTransaction} />
      <AppStack.Screen name="account_detail" component={AccountDetail} />
      <AppStack.Screen name="transaction_detail" component={TransactionDetail} />
      <AppStack.Screen name="bottom_bar" component={BottomBarTabs} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;