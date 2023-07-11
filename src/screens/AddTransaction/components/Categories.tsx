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

const Categories: React.FC<Props> = ({ categoryName, image_uri, onSelect, onClose }) => {
  return (
    <View style={{ alignContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity
        onPress={() => {
          onSelect(categoryName);
          onClose(false);
        }}
        style={{ marginLeft: 14, marginRight: 14, marginTop: 14, width: 68 }}>
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
          }}></Image>
        <Text style={styles.textStyle}>{categoryName}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 15,
    color: "grey",
    fontWeight: "500",
    textAlign: "center"
  },
})