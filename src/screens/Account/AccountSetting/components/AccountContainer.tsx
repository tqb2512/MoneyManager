import {
    GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  ArrowLeftIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from 'react-native-heroicons/outline';

export type Prop = {
  accountName: String;
  // ID account de xoa
  accountId: any
  onPress: (event:GestureResponderEvent) => void
};

const AccountContainer: React.FC<Prop> = ({accountId, accountName, onPress}) => {
  return (
    <View>
      {/* <Text style={{fontWeight: '500', fontSize: 16, margin: 4, marginTop: 12}}>
        {accountType}
      </Text> */}

      {/* Render 1 list account như view bên dưới */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          padding: 16,
          marginTop: 8,
        }}>
        <Pressable>
          <Text>{accountName}</Text>
        </Pressable>
        <View style={{flexDirection: 'row'}}>
            
          {/* Nút xóa vòa sửa account */}
          <TouchableOpacity onPress={onPress}>
            <PencilIcon
              style={{marginLeft: 8, marginRight: 16}}
              size={16}
              color="black"
            />
          </TouchableOpacity>

          {/* Delete account */}
          <TouchableOpacity>
            <TrashIcon style={{marginEnd: 0}} size={16} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AccountContainer;

const styles = StyleSheet.create({
  mainContainer: {},
});
