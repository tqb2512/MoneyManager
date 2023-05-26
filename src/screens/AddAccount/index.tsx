import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const AddAccount = () => {
  return (
    <View>
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Time</Text>
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 0.4,
            borderBottomColor: 'gray',
          }}
          onPressIn={() => {}}
          showSoftInputOnFocus={false}
          value=''
        />
      </View>
    </View>
  );
};

export default AddAccount;

const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        margin: 2,
      },
      inputLabel: {
        marginRight: 16,
        width: 60,
      },
});
