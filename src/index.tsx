import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation";
import BottomBarTabs from "./navigation";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";
import { getDBConnection, importTestData, createTables, dropTables } from "./services/db-services";

export default function App() {

    

    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <AppNavigation/>
            </NavigationContainer>
        </NativeBaseProvider>
    );
}