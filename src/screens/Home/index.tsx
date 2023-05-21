import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { SafeAreaView } from "react-native";
import Report from "./components/Report";
import AppNavigation from "../../navigation";
import { NativeBaseProvider } from "native-base";
import { Text, View } from "react-native";

export default function Home() {
    return (
        <NativeBaseProvider>
            <Report />
        </NativeBaseProvider>
    )
}