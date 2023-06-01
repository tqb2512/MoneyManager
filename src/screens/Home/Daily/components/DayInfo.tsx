import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Transaction } from '../../../../models/transaction';
import { Category } from '../../../../models/category';

import { getDBConnection, getCategoryById } from '../../../../services/db-services';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams2, RootStackParams3 } from '../../../../navigation';

const DayInfo: React.FC<Transaction> = ({
  id,
  type,
  category,
  account,
  amount,
  note,
  day,
  month,
  year,
  time
}) => {
  const [Category, setCategory] = React.useState<Category>({} as Category);

  const navigation = useNavigation<NavigationProp<RootStackParams3>>();

  React.useEffect(() => {
    getDBConnection().then((db) => {
      getCategoryById(db, category).then((category) => {
        setCategory(category);
      });
    });
  }, []);

  return (
    <TouchableOpacity onPress={() => {navigation.navigate('EditTransaction', {_id: id, _type: type, _account: account, _amount: amount, _category: category, _day: day, _month: month, _year: year, _note: note, _time: time})}}>
      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <View style={{width: 100,flexDirection: 'row', alignItems: 'center', padding: 8, marginLeft: 13}}>
          <Image
            source={{ uri: Category.image }}
            style={{
              borderRadius: 9999,
              width: 32,
              height: 32,
              borderColor: '#46CDCF',
              borderWidth: 1,
            }}
          />
          <Text style={{ marginStart: 8 }}>{Category.name}</Text>
        </View>
        <View style={{flex: 1, marginStart: 20, justifyContent: 'center'}}>
          <Text style={{fontWeight: '700'}}>{note}</Text>
          <Text>{account}</Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            marginRight: 21,
            fontSize: 18,
            fontWeight:'bold',
            color: type === 'income' ? '#9FE2BF' : '#FF7F50',
          }}>
          $ {amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DayInfo;

const styles = StyleSheet.create({});
