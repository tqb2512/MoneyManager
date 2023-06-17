import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {AccountDetailProp, EditAccountProp} from '../../navigation/types';
import { TrashIcon, ChevronLeftIcon } from 'react-native-heroicons/outline'

const EditAccount = (props: EditAccountProp) => {

  const { navigation } = props;

  const ACC = props.route.params.account;

  const [groupIsClicked, setGroupIsClicked] = useState(false);
  const [groupValue, setGroupValue] = useState<any | null>(null);

  const [group, setGroup] = useState('');
  const [name, setName] = useState('');
  const [amount, setAmount] = useState<any>();
  // const [description, setDescription] = useState('')

  useEffect(() => {
    setGroup(ACC.group);
    setName(ACC.name);
    setAmount(ACC.balance.toString());
    //   setDescription(props.route.params.accountDescription.toString())
  }, []);

  return (
    <View style={{}}>
      <View style={styles.navigateHeader}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => navigation.goBack()}
            size={20}
            color="black"
          />
          <Text style={styles.accountNameTxt}>Edit Account Info</Text>
        </View>
        <TrashIcon
          onPress={() => {
            // Xóa account ở đây cũng được
          }}
          size={20}
          color="black"
        />
      </View>

      {/* Group */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Group</Text>
        <TextInput
          style={styles.textInput}
          onPressIn={() => setGroupIsClicked(!groupIsClicked)}
          showSoftInputOnFocus={false}
          value={group}
          onChangeText={() => {}}
          caretHidden={true}
          //  Đưa giá trị vô đây
        />
      </View>
      {/* Name account */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.textInput}
          onPressIn={() => {}}
        //   showSoftInputOnFocus={false}
          onChangeText={(text: any) => { setName(text) }}
          value={name}
          //  Đưa giá trị vô đây
        />
      </View>
      {/* Amount account */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.textInput}
          onPressIn={() => {}}
          onChangeText={() => {}}
          keyboardType="number-pad"
          value={amount}
          //  Đưa giá trị vô đây
        />
      </View>
      {/* Description account */}
      {/* <View style={styles.input}>
      <Text style={styles.inputLabel}>Description</Text>
      <TextInput
        style={{
          flex: 1,
          borderBottomWidth: 0.4,
          borderBottomColor: 'gray',
        }}
        onPressIn={() => {}}
        showSoftInputOnFocus={false}
        onChangeText={() => {}}
        value={description}
        //  Đưa giá trị vô đây
      />
    </View> */}
      {groupIsClicked && (
        <Modal
          animationType="fade"
          transparent={true}
        //   visible={groupIsClicked}
          onRequestClose={() => {
            setGroupIsClicked(!groupIsClicked);
          }}>
          <Pressable
            onPress={() => setGroupIsClicked(false)}
            style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  paddingBottom: 4,
                  borderBottomColor: 'grba(0,0,0,0.1)',
                  borderBottomWidth: 0.2,
                }}>
                <Text style={styles.textHeaderStyle}>Account Group</Text>
              </View>
              {/* Pressable cho giá trị của group */}
              {/* <Pressable style={[styles.button]}>
              <Button
                accountGroup="Cash"
                onSelect={text => setGroup(text.toString())}
                onClose={() => setGroupIsClicked(!groupIsClicked)}
              />
              <Button
                accountGroup="Account"
                onSelect={text => setGroup(text.toString())}
                onClose={() => setGroupIsClicked(!groupIsClicked)}
              />
            </Pressable> */}
            </View>
          </Pressable>
        </Modal>
      )}

      {/* Nút save account */}
      <TouchableOpacity
        style={[styles.saveButton, {backgroundColor: '#46CDCF'}]}
        onPress={() => {}}>
        <Text style={{fontWeight: '600'}}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditAccount;

const styles = StyleSheet.create({
  navigateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    textAlign: 'center',
    marginBottom: 16
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountNameTxt: {
    marginLeft: 24,
    fontSize: 18,
    color: 'black',
  },

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
    marginBottom: 16
  },
  inputLabel: {
    marginRight: 16,
    width: '25%',
  },

  blurLayout: {
    // backgroundColor: 'rgba(0,0,0, 0.3)',
    // position: 'absolute',
    // flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 2,
    padding: 4,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '60%',
    width: '88%',
  },
  button: {
    padding: 10,
    elevation: 2,
  },

  textHeaderStyle: {
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    // textAlign: 'center',
  },

  textStyle: {
    color: 'black',
    // textAlign: 'center',
  },

  textInput: {
    flex: 1,
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
    padding: 2
  }
});
