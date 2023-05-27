import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Daily from './Daily';
import Monthly from './Monthly';

const TopTabNavigatior = createMaterialTopTabNavigator();

const Home = () => {
  const insets = useSafeAreaInsets()
  return (
    <TopTabNavigatior.Navigator style={{marginTop: insets.top}}>
      <TopTabNavigatior.Screen
        name="Daily"
        component={Daily}
        options={{tabBarLabel: 'Daily'}}
      />
      <TopTabNavigatior.Screen
        name="Monthly"
        component={Monthly}
        options={{tabBarLabel: 'Monthly'}}
      />
    </TopTabNavigatior.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
