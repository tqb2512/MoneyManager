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
import EditAccount from '../screens/EditAccount';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../screens/Home/Header';
import StatsHeaderLeft from '../screens/Stats/StatsHeaderLeft';
import StatsHeaderRight from '../screens/Stats/StatsHeaderRight';
import { View } from 'native-base';
import { styles } from 'react-native-gifted-charts/src/BarChart/styles';
import Settings from '../screens/Settings';
import ChangeCurrency from '../screens/Settings/components/ChangeCurrency';



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
          headerTitle: '',
          // headerRight: () => (<Header />),
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-home' : 'ios-home-outline'} color={focused ? '#2A7BDB': 'grey'} size={20} />
        }} 
        />
      <BottomBar.Screen 
        name="bottom_bar_stats" 
        component={StatsScreenTopBar}
        options={{
          headerShown: true,
          headerTitle: '',
          headerLeft: () => (<StatsHeaderLeft />),
          headerRight: () => (<StatsHeaderRight />),
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-pie-chart' : 'ios-pie-chart-outline'} color={focused ? '#2A7BDB': 'grey'} size={20} />
        }} 
      />

      <BottomBar.Screen 
        name="bottom_bar_accounts" 
        component={AccountsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'ios-card' : 'ios-card-outline'} color={focused ? '#2A7BDB': 'grey'} size={20} />
        }} 
      />
      <BottomBar.Screen 
        name="bottom_bat_settings"
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => 
            <Ionicons name={focused ? 'settings' : 'settings-outline'} color={focused ? '#2A7BDB': 'grey'} size={20} />
        }} 
      />
    </BottomBar.Navigator>
  )
}

function HomeScreenTopBar()
{
  return (
      <View style={{flex: 1}}>
      <HomeTopBar.Navigator initialRouteName="home_top_bar_daily">
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
      </View>
  ) 
}

function StatsScreenTopBar()
{
  return (
      <View style={{flex: 1}}>
        <StatsTopBar.Navigator>
      <StatsTopBar.Screen 
      name="stats_top_bar_income" 
      component={IncomeScreen}
      options={{ 
        tabBarLabel: 'Income',
        tabBarLabelStyle: {fontSize: 18, fontWeight: 'bold'},
        tabBarActiveTintColor: '#7DCEA0',
        tabBarInactiveTintColor: '#D5D8DC',
        tabBarBounces: false,
        tabBarIndicatorStyle: {borderBottomColor: '#7DCEA0', borderBottomWidth: 1, backgroundColor: 'white'},
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
      </View>
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
      <AppStack.Screen name="edit_account" component={EditAccount} />
      <AppStack.Screen name="account_detail" component={AccountDetail} />
      <AppStack.Screen name="transaction_detail" component={TransactionDetail} />
      <AppStack.Screen name="bottom_bar" component={BottomBarTabs} />
      <AppStack.Screen name="change_currency" component={ChangeCurrency} />
      <AppStack.Screen name="settings" component={Settings} />
    </AppStack.Navigator>
  );
}

export default AppNavigation;