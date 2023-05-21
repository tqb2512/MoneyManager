import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation";
import BottomBarTabs from "./navigation";

export default function App() {
    return (
        <NavigationContainer>
            <BottomBarTabs />
        </NavigationContainer>
    );
}