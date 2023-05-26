import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import Monthly from '../Monthly';
import Daily from '../Daily';

const TopTabNavigatior = createMaterialTopTabNavigator();

const Transaction = () => {
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

export default Transaction;

const styles = StyleSheet.create({});
