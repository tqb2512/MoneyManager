import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getDBConnection, dropDatabaseAndRecreate, clearDatabase, createTable, importTestData } from '../../services/db-services';


import Daily from './Daily';
import Monthly from './Monthly';
import CalendarView from './Calendar';


const TopTabNavigatior = createMaterialTopTabNavigator();

const Home = () => {
  const insets = useSafeAreaInsets()

  useEffect(() => {
    getDBConnection().then((db) => {
      /*dropDatabaseAndRecreate(db).then(() => {
        console.log("Database dropped and recreated");
      });*/

      /*clearDatabase(db).then(() => {
        console.log("Database cleared");
      });*/
      
      createTable(db).then(() => {
         //console.log("Table created");
      });

      /*importTestData(db).then(() => {
          console.log("Test data imported");
      });*/
    });
  }, []);
  return (
    <TopTabNavigatior.Navigator style={{marginTop: insets.top}}>
      <TopTabNavigatior.Screen
        name="Daily"
        component={Daily}
        options={{tabBarLabel: 'Daily'}}
      />
      <TopTabNavigatior.Screen
        name="Monthly"
        component={Monthly}
        options={{tabBarLabel: 'Monthly'}}
      />
      <TopTabNavigatior.Screen 
        name="Calendar"
        component={CalendarView}
        options={{tabBarLabel: 'Calendar', swipeEnabled: false}}
      />
    </TopTabNavigatior.Navigator>
  );
};

export default Home;

const styles = StyleSheet.create({});
