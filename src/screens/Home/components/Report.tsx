import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Box } from "native-base";
import { Text, View } from "react-native";
import { NativeBaseProvider } from "native-base";

export default function Report() {
    return (
        <NativeBaseProvider>
            <Box>
                <Text>Tháng này</Text>
                <View style={{ backgroundColor: "red" }}>
                </View>
            </Box>
        </NativeBaseProvider>
    )
}
