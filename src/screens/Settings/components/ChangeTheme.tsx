import { StyleSheet, Switch, Text, TouchableOpacity, View, Image, Animated } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { ChangeThemeProp } from '../../../navigation/types';
import { Language } from '../../../models/language';
import en from '../../../config/language/en';
import vi from '../../../config/language/vi';

const ChangeTheme = (props: ChangeThemeProp) => {
  const { navigation } = props;

  const theme = useContext(themeContext) as themeInterface;

  const [mode, setMode] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);

  const startAnimation = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true
    }).start();
  };

  const toggleSwitch = async (value: any) => {
    startAnimation();
    setMode(previousState => !previousState);
    try {
      await AsyncStorage.setItem('switchValue', JSON.stringify(value));
      EventRegister.emit('changeTheme', !mode);
    } catch (e) {
      // error
    }
  };

  useEffect(() => {
    startAnimation();
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

    const getLanguagePack = async () => {
      const language = await AsyncStorage.getItem('language');
      if (language === 'vi') {
        setLanguagePack(vi);
      } else {
        setLanguagePack(en);
      }
    }
    getLanguagePack();
  }, []);

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : 'white' }]}>
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
            {languagePack.theme}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'column', padding: 16, alignItems: 'center'}}> 
        {/* <Text style={[styles.descriptionText, { color: theme.color }]}>
          {mode ? (
            <Text style={[styles.descriptionText, { color: theme.color }]}>
              Switch to change to Light mode
            </Text>
          ) : (
            <Text style={[styles.descriptionText, { color: theme.color }]}>
              Switch to change to Dark mode
            </Text>
          )}
        </Text> */}

      <Image style={{ width: 120, height: 120, marginBottom: 16, tintColor: theme.color}} source={ theme.mode === 'dark' ? require('../../../../assets/settingImage/moon.png') : require('../../../../assets/settingImage/sun.png') } />
        {mode ? (
              <Text style={[styles.descriptionText, { color: theme.color, marginBottom: 16,  }]}>
                {languagePack.changeTheme}
              </Text>
            ) : (
              <Text style={[styles.descriptionText, { color: theme.color, marginBottom: 16, }]}>
                {languagePack.changeTheme}
              </Text>
        )}
      <Switch
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={mode ? '#0E57D1' : '#f4f3f4'}
          value={mode}
          onValueChange={toggleSwitch}
          style={{ transform: [{ scaleX: 2 }, { scaleY: 2 }] }}
      />

      </View>
    </View>
  );
};

export default ChangeTheme;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  navigateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    position: 'absolute',
    top: 0,
    width: '100%'
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountNameTxt: {
    marginLeft: 24,
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },

  descriptionText: {
    color: 'black',
    fontSize: 18,
  },
});

// (value) => {
//     setMode(value)
//     EventRegister.emit("changeTheme", value)}
