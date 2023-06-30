import React, {useState, useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigation from "./navigation";
import BottomBarTabs from "./navigation";
import { NativeBaseProvider } from "native-base";
import { Text } from "react-native";
import { getDBConnection, importTestData, createTables, dropTables } from "./services/db-services";

import { EventRegister } from "react-native-event-listeners";
import themeContext from "./config/themeContext";
import theme from "./config/theme";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

    const [mode, setMode] = useState(false);

    useEffect(() => {
        const getModeValue = async () => {
            const value = await AsyncStorage.getItem('switchValue')
            if (value !== null) {
                setMode(JSON.parse(value));
            }
        };
        getModeValue()
        let eventListener = EventRegister.addEventListener(
            "changeTheme",
            (data) => {
                setMode(data);
            }
        );
        return () => {
            EventRegister.removeEventListener(eventListener.toString())
        }    
    }, []);

    return (
        <themeContext.Provider value = { mode === true ? theme.dark : theme.light } >
            <NativeBaseProvider>
                <NavigationContainer>
                    <AppNavigation/>
                </NavigationContainer>
            </NativeBaseProvider>
        </themeContext.Provider>
    );
}