import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getDBConnection, dropDatabaseAndRecreate, clearDatabase, createTable, importTestData } from '../../services/db-services';
import Header from './Header';

import Icon from 'react-native-vector-icons/FontAwesome5'


import Daily from './Daily';
import Monthly from './Monthly';
import CalendarView from './Calendar';
import {NavigationContainer} from '@react-navigation/native';
import { CalendarStackNavigation, StackTransEditNavigation } from '../../navigation';

const TopTabNavigatior = createMaterialTopTabNavigator();

const Home = () => {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    getDBConnection().then(db => {
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: insets.top }}>
        <Header/>
        <NavigationContainer independent={true}>
          <TopTabNavigatior.Navigator
            initialRouteName="Daily"
            tabBarOptions={{
              activeTintColor: '#000000',
              inactiveTintColor: '#000000',
              labelStyle: {fontSize: 12, fontWeight: 'bold'},
              indicatorStyle: {backgroundColor: '#000000'},
              style: {backgroundColor: '#fff'},
            }}>
            <TopTabNavigatior.Screen
              name="Daily"
              component={StackTransEditNavigation}
              options={{tabBarLabel: 'Daily'}}
            />
            <TopTabNavigatior.Screen
              name="Monthly"
              component={Monthly}
              options={{tabBarLabel: 'Monthly'}}
            />
            <TopTabNavigatior.Screen
              name="Calendar"
              component={CalendarStackNavigation}
              options={{tabBarLabel: 'Calendar', swipeEnabled: false}}
            />
          </TopTabNavigatior.Navigator>
        </NavigationContainer>
        {/*Floating button*/}
        <View style={{position: 'absolute', bottom: 20, right: 20}}>
          <View
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#000000',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 40, color: '#fff'}}>+</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});