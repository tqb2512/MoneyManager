import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import themeContext from '../../../config/themeContext';
import {themeInterface} from '../../../config/themeInterface';
import {DataProp} from '../../../navigation/types';

const Data = (props: DataProp) => {
  const {navigation} = props;
  const theme = useContext(themeContext) as themeInterface;
  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2'},
      ]}>
      <View
        style={[
          styles.navigateHeader,
          {backgroundColor: theme.componentBackground},
        ]}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={20}
            color={theme.color}
          />
          <Text style={[styles.accountNameTxt, {color: theme.color}]}>
            Data
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('change_currency');
          }}>
          <Image
            style={[styles.img, {tintColor: theme.color}]}
            source={require('../../../../assets/settingImage/file-import.png')}
          />
          <Text style={{color: theme.color}}>Import Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('data')}>
          <Image
            style={[styles.img, {tintColor: theme.color}]}
            source={require('../../../../assets/settingImage/file-export.png')}
          />
          <Text style={{color: theme.color}}>Export Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Data;

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

  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: '5%',
    justifyContent: 'center',
  },

  button: {
    padding: 20,
    width: '49%',
    alignItems: 'center',
    alignSelf: 'center',
  },

  img: {
    width: 64,
    height: 64,
    marginBottom: 8,
  },
});
