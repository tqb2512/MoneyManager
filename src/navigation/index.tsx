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
import AddTransaction from '../screens/AddTransaction';
import TransactionDetail from '../screens/TransactionDetail';
import AccountDetail from '../screens/AccountDetail';
import EditAccount from '../screens/EditAccount';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../screens/Home/CalendarButton';
import { View } from 'native-base';
import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import Settings from '../screens/Settings';
import ChangeCurrency from '../screens/Settings/components/ChangeCurrency';
import ChangeTheme from '../screens/Settings/components/ChangeTheme';
import themeContext from '../config/themeContext';
import { themeInterface } from '../config/themeInterface';
import { useContext } from 'react';
import Language from '../screens/Settings/components/Language';
import { Image, Platform } from 'react-native';
import { Text } from 'react-native-svg';
import { PlusCircleIcon, PlusIcon } from 'react-native-heroicons/outline'
import Data from '../screens/Settings/components/Data';
import { Language as LanguageModel, languagePack } from '../models/language';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vi from '../config/language/vi';
import en from '../config/language/en';


const HomeTopBar = createMaterialTopTabNavigator<HomeTopBarParamList>();
const StatsTopBar = createMaterialTopTabNavigator<StatsTopBarParamList>();
const BottomBar = createBottomTabNavigator<BottomTabParamList>();
const AppStack = createStackNavigator<RootStackParamList>();


function BottomBarTabs() {
  const theme = useContext(themeContext) as themeInterface

  return (
    <BottomBar.Navigator
      initialRouteName='bottom_bar_home'
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
        },
        tabBarItemStyle: {
          backgroundColor: theme.background
        },
      }}
    >
      <BottomBar.Screen
        name="bottom_bar_home"
        component={HomeScreenTopBar}
        options={{
          headerShown: false,
          headerTitle: '',
          // headerRight: () => (<Header />),
          tabBarIcon: ({ focused }) =>
            <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} color={focused ? '#2196f3' : 'grey'} size={20} />
        }}
      />

      <BottomBar.Screen
        name="bottom_bar_stats"
        component={StatsScreenTopBar}
        options={{
          headerStyle: { backgroundColor: theme.componentBackground },
          tabBarIcon: ({ focused }) =>
            <Ionicons name={focused ? 'ios-pie-chart' : 'ios-pie-chart-outline'} color={focused ? '#2196f3' : 'grey'} size={20} />
        }}
      />

      <BottomBar.Screen
        name="bottom_bar_accounts"
        component={AccountsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            <Ionicons name={focused ? 'ios-card' : 'ios-card-outline'} color={focused ? '#2196f3' : 'grey'} size={20} />
        }}
      />
      <BottomBar.Screen
        name="bottom_bar_settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) =>
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={focused ? '#2196f3' : 'grey'} size={20} />
        }}
      />
    </BottomBar.Navigator>
  )
}

function HomeScreenTopBar() {
  const theme = useContext(themeContext) as themeInterface
  const [languagePack, setLanguagePack] = React.useState<LanguageModel>({} as LanguageModel);

  useEffect(() => {
    const getLanguagePack = async () => {
      const language = await AsyncStorage.getItem('language');
      if (language === 'vi') {
        setLanguagePack(vi);
      } else {
        setLanguagePack(en);
      }
    }
    getLanguagePack();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <HomeTopBar.Navigator initialRouteName="home_top_bar_daily">
        <HomeTopBar.Screen
          name="home_top_bar_daily"
          component={DailyScreen}
          options={{
            tabBarLabel: languagePack.daily,
            tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
            tabBarActiveTintColor: theme.mode === 'dark' ? theme.color : '#566573',
            tabBarInactiveTintColor: '#D5D8DC',
            tabBarBounces: false,
            tabBarIndicatorStyle: { backgroundColor: theme.mode === 'dark' ? 'white' : '#566573' },
            tabBarStyle: { backgroundColor: theme.background }
          }}
        />
        <HomeTopBar.Screen
          name="home_top_bar_celandar"
          component={CelandarScreen}
          options={{
            tabBarLabel: languagePack.celandar,
            tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
            tabBarActiveTintColor: theme.mode === 'dark' ? theme.color : '#566573',
            tabBarInactiveTintColor: '#D5D8DC',
            tabBarBounces: false,
            tabBarIndicatorStyle: { backgroundColor: theme.mode === 'dark' ? 'white' : '#566573' },
            tabBarStyle: { backgroundColor: theme.background }
          }}
        />
      </HomeTopBar.Navigator>
    </View>
  )
}

function StatsScreenTopBar() {
  const theme = useContext(themeContext) as themeInterface;
  const [languagePack, setLanguagePack] = React.useState<LanguageModel>({} as LanguageModel);

  useEffect(() => {
    const getLanguagePack = async () => {
      const language = await AsyncStorage.getItem('language');
      if (language === 'vi') {
        setLanguagePack(vi);
      } else {
        setLanguagePack(en);
      }
    }
    getLanguagePack();
  }, [])

  return (
    <View style={{ flex: 1 }}>
      <StatsTopBar.Navigator>
        <StatsTopBar.Screen
          name="stats_top_bar_income"
          component={IncomeScreen}
          options={{
            tabBarLabel: languagePack.income,
            tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
            tabBarActiveTintColor: '#7DCEA0',
            tabBarInactiveTintColor: '#D5D8DC',
            tabBarBounces: false,
            tabBarIndicatorStyle: { backgroundColor: theme.mode === 'dark' ? 'white' : '#566573' },
            tabBarStyle: { backgroundColor: theme.componentBackground },
          }}
        />
        <StatsTopBar.Screen
          name="stats_top_bar_expense"
          component={ExpenseScreen}
          options={{
            tabBarLabel: languagePack.expense,
            tabBarLabelStyle: { fontSize: 18, fontWeight: 'bold' },
            tabBarActiveTintColor: '#F1948A',
            tabBarInactiveTintColor: '#D5D8DC',
            tabBarBounces: false,
            tabBarIndicatorStyle: { backgroundColor: theme.mode === 'dark' ? 'white' : '#566573' },
            tabBarStyle: { backgroundColor: theme.componentBackground },
          }}
        />
      </StatsTopBar.Navigator>
    </View>
  );
}

function AppNavigation() {
  return (
    <AppStack.Navigator
      initialRouteName="bottom_bar"
      screenOptions={{
        headerShown: false
      }}
    >
      <AppStack.Screen name="add_transaction" component={AddTransaction} />
      <AppStack.Screen name="edit_account" component={EditAccount} />
      <AppStack.Screen name="account_detail" component={AccountDetail} />
      <AppStack.Screen name="transaction_detail" component={TransactionDetail} />
      <AppStack.Screen name="bottom_bar" component={BottomBarTabs} />
      <AppStack.Screen name="change_currency" component={ChangeCurrency} />
      <AppStack.Screen name="change_theme" component={ChangeTheme} />
      <AppStack.Screen name="language" component={Language} />
      <AppStack.Screen name="data" component={Data} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;