import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState } from 'react';

import Expense from './Expense';
import Income from './Income';
import { NativeBaseProvider } from 'native-base';

const TopTabNavigator = createMaterialTopTabNavigator();

export default function Stats() {
    const insets = useSafeAreaInsets();

    return (
        <NativeBaseProvider>
            <TopTabNavigator.Navigator style={{ marginTop: insets.top }}>
                <TopTabNavigator.Screen name="Expense" component={Expense} options={{ tabBarLabel: 'Expense' }} />
                <TopTabNavigator.Screen name="Income" component={Income} options={{ tabBarLabel: 'Income' }} />
            </TopTabNavigator.Navigator>
        </NativeBaseProvider>
    );
}