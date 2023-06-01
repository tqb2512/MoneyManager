import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

export type Props = {
  accountName: String;
  onSelect: (text: String) => void;
  onClose: (bool: boolean) => void;
};

const Accounts: React.FC<Props> = ({accountName, onSelect, onClose}) => {
  return (
    <View style={[styles.button]}>
      <Pressable
        onPress={() => {
          onSelect(accountName);
          onClose(false);
        }}>
        <Text style={styles.textStyle}>{accountName}</Text>
      </Pressable>
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 2,
  },
  textStyle:{
    fontSize: 15,
    color: "grey",
    fontWeight: "500",
    textAlign: "center"
  },
});