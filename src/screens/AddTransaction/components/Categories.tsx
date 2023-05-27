import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

export type Props = {
  categoryName: String;
  onSelect: (text: String) => void;
  onClose: (bool: boolean) => void;
};

const Categories: React.FC<Props> = ({categoryName, onSelect, onClose}) => {
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          onSelect(categoryName);
          onClose(false);
        }}
        style={{marginLeft: 16, marginRight: 16, marginTop: 16, width: 72}}>
        <Image
          style={{
            height: 32,
            width: 32,
            padding: 4,
            borderRadius: 9999,
            alignSelf: 'center',
          }}
          source={{
            uri: 'https://static-00.iconduck.com/assets.00/burger-icon-512x473-15nsuo1h.png',
          }}></Image>
        <Text style={{textAlign: 'center'}}>{categoryName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;
