import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation";
import BottomBarTabs from "./navigation";
import { NativeBaseProvider } from "native-base";

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <BottomBarTabs />
            </NavigationContainer>
        </NativeBaseProvider>
    );
}