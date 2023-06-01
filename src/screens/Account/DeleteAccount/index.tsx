import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, PlusIcon } from 'react-native-heroicons/outline';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams2 } from '../../../navigation';
import { getAllAccounts, getDBConnection } from '../../../services/db-services';
import { Account } from '../../../models/account';
import AccountContainer from '../AccountSetting/components/AccountContainer';
import { ScrollView } from 'native-base';

const DeleteAccount = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams2>>()
    const [AccountList, setAccountList] = useState<Account[]>([]);

    useEffect(() => {
      getDBConnection().then(db => {
        getAllAccounts(db).then(accounts => {
          setAccountList(accounts);
        });
      });
  
    }, [])

  return (
    <View>
      <View style={styles.header}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ArrowLeftIcon
            style={{marginLeft: 4, marginRight: 8}}
            size={20}
            color="black"
            onPress={() => {navigation.goBack()}}
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
      <ScrollView>
        {AccountList.map( (item, index) => (
          <Pressable key={index} onPress={() => {navigation.navigate('EditAccountView', {accountGroup: item.type, accountAmount: item.balance, accountName: item.name, accountDescription: item.note})}}>
            <AccountContainer 
              key={index}
              onPress={() => {navigation.navigate('EditAccountView', {accountGroup: item.type, accountAmount: item.balance, accountName: item.name, accountDescription: item.note})}} 
              accountName={item.name}
              //pass ID account vao de xoa
              accountId='' />
          </Pressable>
        ) )}
      </ScrollView>

    </View>
  );
};

export default DeleteAccount;

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
