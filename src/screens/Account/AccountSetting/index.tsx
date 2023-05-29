import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AccountContainer from './components/AccountContainer';
import { ArrowLeftIcon, PlusIcon } from 'react-native-heroicons/outline';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams2 } from '../../../navigation';

const AccountSetting = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams2>>()

    const handlePress = () => {
        navigation.navigate('EditAccountView')
    }

  return (
    <View>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ArrowLeftIcon
            style={{marginLeft: 4, marginRight: 8}}
            size={20}
            color="black"
            onPress={() => {navigation.navigate('Add')}}
          />
          <Text
            style={{
              marginLeft: 8,
              marginRight: 8,
              fontSize: 16,
              fontWeight: 'bold',
              color: 'black',
            }}>
            Account Settings
          </Text>
        </View>
        <PlusIcon onPress={() => { navigation.navigate('AddAccount') }} style={{marginEnd: 4}} size={20} color="black" />
      </View>
      
      {/* Render ra 1 list các loại account như pressable ở dưới */}
      <Pressable onPress={() => {navigation.navigate('EditAccountView')}}>
        <AccountContainer onPress={handlePress} accountType="Cash" />
      </Pressable>
    </View>
  );
};

export default AccountSetting;

const styles = StyleSheet.create({
  mainContainer: {

  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
},
});
