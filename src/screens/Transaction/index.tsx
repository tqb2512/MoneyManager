import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Monthly from '../Monthly';
import Daily from '../Daily';

const TopTabNavigator = createMaterialTopTabNavigator();

const Transaction = () => {
  const insets = useSafeAreaInsets()
  return (
    <TopTabNavigator.Navigator style={{marginTop: insets.top}}>
      <TopTabNavigator.Screen
        name="Daily"
        component={Daily}
        options={{tabBarLabel: 'Daily'}}
      />
      <TopTabNavigator.Screen
        name="Monthly"
        component={Monthly}
        options={{tabBarLabel: 'Monthly'}}
      />
    </TopTabNavigator.Navigator>
  );
};

export default Transaction;

const styles = StyleSheet.create({});
