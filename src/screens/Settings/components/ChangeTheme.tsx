import { StyleSheet, Switch, Text, View } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';

const ChangeTheme = () => {

  const theme = useContext(themeContext) as themeInterface

  const [mode, setMode] = useState(false);

  const toggleSwitch = async (value: any) => {
    setMode(previousState => !previousState);
    try {
      await AsyncStorage.setItem('switchValue', JSON.stringify(value));
      EventRegister.emit('changeTheme', !mode)
    } catch (e) {
      // error
    }
  };

  useEffect(() => {
    const getSwitchValue = async () => {
      try {
        const value = await AsyncStorage.getItem('switchValue');
        if (value !== null) {
          setMode(JSON.parse(value));
          EventRegister.emit('changeTheme', JSON.parse(value))
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    getSwitchValue();
  }, []);

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <Text style={[styles.descriptionText, { color: theme.color }]}>Switch to change theme</Text>

      <Switch
        // trackColor={{ false: '#767577', true: '#81b0ff' }}
        // thumbColor={mode ? '#81b0ff' : '#f4f3f4'}
        value={mode}
        onValueChange={toggleSwitch}
      />
    </View>
  )
}

export default ChangeTheme

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  descriptionText: {
    color: 'black',
    fontSize: 20,
  }

})

// (value) => {
//     setMode(value)
//     EventRegister.emit("changeTheme", value)}