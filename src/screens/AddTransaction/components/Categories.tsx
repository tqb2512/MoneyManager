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
  image_uri: string;
};

const Categories: React.FC<Props> = ({categoryName, image_uri, onSelect, onClose}) => {
  return (
    <View style={{alignContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => {
          onSelect(categoryName);
          onClose(false);
        }}
        style={{marginLeft: 16, marginRight: 16, marginTop: 16, width: 68}}>
        <Image
          style={{
            height: 32,
            width: 32,
            padding: 4,
            borderRadius: 9999,
            alignSelf: 'center',
          }}
          source={{
            uri: image_uri,
          }} />
        <Text style={{textAlign: 'center'}}>{categoryName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;
