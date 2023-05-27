import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Transaction} from '../../../models/transaction';

const DailyBudget: React.FC<Transaction> = ({
  id_budget,
  type,
  category,
  account,
  amount,
  note,
  date,
  month,
  year,
  img_url,
}) => {
  return (
    <TouchableOpacity>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <View style={{width: 100,flexDirection: 'row', alignItems: 'center', padding: 8}}>
          <Image
            source={{uri: img_url}}
            style={{
              borderRadius: 9999,
              width: 32,
              height: 32,
              borderColor: '#46CDCF',
              borderWidth: 1,
            }}
          />
          <Text style={{marginStart: 8}}>{category}</Text>
        </View>

        <View style={{flex: 1, marginStart: 32, justifyContent: 'center'}}>
          <Text style={{fontWeight: '700'}}>{note}</Text>
          <Text>{account}</Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            marginEnd: 8,
            color: type === 'income' ? '#2416CB' : '#FF914D',
          }}>
          ${amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DailyBudget;

const styles = StyleSheet.create({});
