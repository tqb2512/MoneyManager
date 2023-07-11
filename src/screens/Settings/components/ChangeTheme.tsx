import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { ChangeThemeProp } from '../../../navigation/types';

const ChangeTheme = (props: ChangeThemeProp) => {
  const { navigation } = props;

  const theme = useContext(themeContext) as themeInterface;

  const [mode, setMode] = useState(false);

  const toggleSwitch = async (value: any) => {
    setMode(previousState => !previousState);
    try {
      await AsyncStorage.setItem('switchValue', JSON.stringify(value));
      EventRegister.emit('changeTheme', !mode);
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
          EventRegister.emit('changeTheme', JSON.parse(value));
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    getSwitchValue();
  }, []);

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }]}>
      <View
        style={[
          styles.navigateHeader,
          { backgroundColor: theme.componentBackground },
        ]}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={20}
            color={theme.color}
          />
          <Text style={[styles.accountNameTxt, { color: theme.color }]}>
            Change Theme
          </Text>
        </View>
      </View>

      <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: theme.componentBackground, padding: 16, borderBottomWidth: 0.2, borderBottomColor: theme.color }}>
        <Text style={[styles.descriptionText, { color: theme.color }]}>
          {mode ? (
            <Text style={[styles.descriptionText, { color: theme.color }]}>
              Switch to change to Light mode
            </Text>
          ) : (
            <Text style={[styles.descriptionText, { color: theme.color }]}>
              Switch to change to Dark mode
            </Text>
          )}
        </Text>

        <Switch
          // trackColor={{ false: '#767577', true: '#81b0ff' }}
          // thumbColor={mode ? '#81b0ff' : '#f4f3f4'}
          value={mode}
          onValueChange={toggleSwitch}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChangeTheme;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  navigateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountNameTxt: {
    marginLeft: 24,
    fontSize: 18,
    color: 'black',
  },

  descriptionText: {
    color: 'black',
    fontSize: 18,
  },
});

// (value) => {
//     setMode(value)
//     EventRegister.emit("changeTheme", value)}
