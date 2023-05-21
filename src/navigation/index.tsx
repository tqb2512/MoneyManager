import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import Home from "../screens/Home";
import Stats from "../screens/Stats";
const Stack = createNativeStackNavigator();
const BottomBar = createBottomTabNavigator();

function BottomBarTabs()
{
    return (
        <BottomBar.Navigator screenOptions={{headerShown: false}}>
            <BottomBar.Screen name="Home" component={Home} />
            <BottomBar.Screen name="Stats" component={Stats} />
        </BottomBar.Navigator>
    )
}

function AppNavigation()
{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} /> 
            <Stack.Screen name="Stats" component={Stats} />
        </Stack.Navigator>
    );
}

export default BottomBarTabs;