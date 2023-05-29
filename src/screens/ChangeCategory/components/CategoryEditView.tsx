import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParams2 } from '../../../navigation';

const CategoryEditView = () => {

  const route = useRoute<RouteProp<RootStackParams2, 'EditIncomeCategory'>>();
  const [name, setName] = useState('')

  useEffect(() => {
    setName(route.params.categoryName.toString())
  }, [])

  return (
    <View>
      <View style={styles.input}>
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 0.4,
            borderBottomColor: 'gray',
          }}
          onPressIn={() => {}}
          showSoftInputOnFocus={false}
          onChangeText={() => {}}
          value={name}
        />
      </View>
      <TouchableOpacity
        style={[styles.saveButton, {backgroundColor: '#46CDCF'}]}
        onPress={() => {}}>
        <Text style={{fontWeight: '600'}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CategoryEditView;

const styles = StyleSheet.create({
  saveButton: {
    backgroundColor: '#46CDCF',
    borderRadius: 4,
    padding: 10,
    width: '90%',
    marginTop: 24,
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    margin: 2,
  },
  inputLabel: {
    marginRight: 16,
    width: '25%',
  },
});
