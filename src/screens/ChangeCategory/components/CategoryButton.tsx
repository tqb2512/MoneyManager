import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {PencilIcon, TrashIcon} from 'react-native-heroicons/outline';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams2 } from '../../../navigation';

export type Props = {
  categoryType: String;
  categoryName: String;
};

const CategoryButton: React.FC<Props> = ({categoryType, categoryName}) => {

  const navigation = useNavigation<NavigationProp<RootStackParams2>>()

  return (
    <View style={{
      backgroundColor: 'white',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 12,
      borderWidth: 1,
      borderColor: 'rgba(229, 231, 235, 0.4)'
    }}>
      <Pressable style={{justifyContent: 'center'}}>
        <Text style={{color: 'black', textAlign: 'center'}}>{categoryName}</Text>
      </Pressable>
      <View style={{
        flexDirection: 'row',
      }}>

        {/* Nút Edit category */}
        <TouchableOpacity onPress={() => {navigation.navigate('EditIncomeCategory', {categoryName: 'Salary'})}} style={styles.icon}>
          <PencilIcon size={16} color="black" />
        </TouchableOpacity>

        {/* Nút xóa category */}
        <TouchableOpacity style={styles.icon}>
          <TrashIcon size={16} color="black" />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default CategoryButton;

const styles = StyleSheet.create({
  icon: {
    marginLeft: 8,
    marginRight: 8,
  },
});
