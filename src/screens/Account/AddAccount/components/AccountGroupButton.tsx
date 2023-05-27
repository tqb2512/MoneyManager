import {StyleSheet, Text, View, Pressable} from 'react-native';
import React from 'react';

export type Props = {
  accountGroup: String;
  onSelect: (text: String) => void;
  onClose: (bool:boolean) => void;
};

const Button:React.FC<Props> = ({ accountGroup, onSelect, onClose }) => {
  return (
    <View 
      style={[styles.button]}>
      <Pressable onPress={() => {
        onSelect(accountGroup)
        onClose(false)
      }}>
        <Text style={styles.textStyle}>{accountGroup}</Text>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'black',
    // textAlign: 'center',
  },

});
