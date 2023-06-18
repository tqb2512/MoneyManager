import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, {useState, useCallback} from 'react';
import { Transaction } from '../../../../models/transaction';
import { Category } from '../../../../models/category';
import { NavigationProp, useNavigation } from '@react-navigation/native';

function DayInfo (props: {transaction : Transaction, navigation: any}) {
  const { transaction } = props;

  const onPress = () => {
    setTimeout(() => {
      props.navigation.navigate('transaction_detail', {transaction: transaction});
    }
    , 50);
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', backgroundColor: 'white', padding: 4}}>
        <View style={{width: 100,flexDirection: 'row', alignItems: 'center', padding: 8, marginLeft: "3%"}}>
          
          <Text style={{ marginStart: "5%" }}>{props.transaction.category.name}</Text>
        </View>
        <View style={{flex: 1, marginStart: "5%", justifyContent: 'center'}}>
          {props.transaction.note != null && (<Text style={{fontSize: 16, fontWeight: 'bold'}}>{props.transaction.note}</Text>) }
          <Text style={{fontSize: 12, color: '#A6ACAF'}}>{props.transaction.account.name}</Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            marginRight: "6.5%",
            color: props.transaction.type === 'income' ? '#7DCEA0' : '#F1948A',
            fontSize: props.transaction.amount.toString().length > 20 ? 13 : 16,
          }}>
          $ {props.transaction.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DayInfo;

const styles = StyleSheet.create({});