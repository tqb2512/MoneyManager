import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Daily from "../screens/Daily";
import Monthly from "../screens/Monthly";
import Celander from "../screens/Celander";

const Tab = createMaterialTopTabNavigator();

export default function HomeNavigation() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Daily" component={Daily} />
            <Tab.Screen name="Monthly" component={Monthly} />
            <Tab.Screen name="Celander" component={Celander} />
        </Tab.Navigator>
    )
}