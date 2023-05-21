import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import Home from "../screens/Home";
const Stack = createNativeStackNavigator();
const BottomBar = createBottomTabNavigator();

function BottomBarTabs()
{
    return (
        <BottomBar.Navigator>
            <BottomBar.Screen name="Home" component={Home} />
        </BottomBar.Navigator>
    )
}

function AppNavigation()
{
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} /> 
        </Stack.Navigator>
    );
}

export default AppNavigation;