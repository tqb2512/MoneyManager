import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Transaction } from '../../../../models/transaction';
import { Category } from '../../../../models/category';

import { getDBConnection, getCategoryById } from '../../../../services/db-services';

const DayInfo: React.FC<Transaction> = ({
  id,
  type,
  category,
  account,
  amount,
  note,
  day,
  month,
  year
}) => {
  const [Category, setCategory] = React.useState<Category>();

  React.useEffect(() => {
    getDBConnection().then((db) => {
      getCategoryById(db, category).then((category) => {
        setCategory(category);
      });
    });
  }, []);

  return (
    <TouchableOpacity key={category.id}>
      <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
        <View style={{ width: 100, flexDirection: 'row', alignItems: 'center', padding: 8 }}>
          <Image
            source={{ uri: category.image }}
            style={{
              borderRadius: 9999,
              width: 32,
              height: 32,
              borderColor: '#46CDCF',
              borderWidth: 1,
            }}
          />
          <Text style={{ marginStart: 8 }}>{category.name}</Text>
        </View>

        <View style={{ flex: 1, marginStart: 32, justifyContent: 'center' }}>
          <Text style={{ fontWeight: '700' }}>{note}</Text>
          <Text>{account}</Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            marginEnd: 8,
            color: type == 'income' ? '#2416CB' : '#FF914D',
          }}>
          ${amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DayInfo;

const styles = StyleSheet.create({});
