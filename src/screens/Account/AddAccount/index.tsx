import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import Button from './components/AccountGroupButton';
import { Account } from '../../../models/account';
import { getDBConnection, insertAccount } from '../../../services/db-services';

const AddAccount = () => {
  const [groupIsClicked, setGroupIsClicked] = useState(false);
  const [groupValue, setGroupValue] = useState<any | null>(null);
  const [Account, setAccount] = useState<Account>({} as Account);

  const groupList = ["Cash", "Bank", "Credit Card", "Savings", "Loan", "Insurance", "E-Wallet", "Others"];

  const saveAccount = () => {
    console.log(Account);
    getDBConnection().then((db) => {
      insertAccount(db, Account).then((result) => {
        console.log(result);
      });
    });
  };

  return (
    <View style={{ backgroundColor: 'white' }}>
      {/* Group */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Group</Text>
        <TextInput
          style={styles.infoText}
          onPressIn={() => setGroupIsClicked(!groupIsClicked)}
          showSoftInputOnFocus={false}
          value={groupValue}
          onChangeText={(groupValue) => {
            setAccount({ ...Account, type: groupValue });
          }}
          caretHidden={true}
        //  Đưa giá trị vô đây
        />
      </View>
      {/* Name account */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={styles.infoText}
          onPressIn={() => { }}
          showSoftInputOnFocus={false}
          onChangeText={(name) => {
            setAccount({ ...Account, name: name });
          }}
        //  Đưa giá trị vô đây
        />
      </View>
      {/* Amount account */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={styles.infoText}
          onPressIn={() => { }}
          onChangeText={(amount) => {
            setAccount({ ...Account, balance: amount });
          }}
          keyboardType="number-pad"
        //  Đưa giá trị vô đây
        />
      </View>
      {/* Description account */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.infoText}
          onPressIn={() => { }}
          showSoftInputOnFocus={false}
          onChangeText={(description) => {
            setAccount({ ...Account, note: description });
          }}
        />
      </View>
      {groupIsClicked && (
        <Modal
          animationType="fade"
          transparent={true}
          // visible={groupIsClicked}
          onRequestClose={() => {
            setGroupIsClicked(!groupIsClicked);
          }}>
          <Pressable onPress={() => setGroupIsClicked(false)} style={styles.centeredView}>
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
              <Pressable style={[styles.button]}>
                {groupList.map((item, index) => (
                  <Button
                    key={index}
                    accountGroup={item}
                    onSelect={text => {setGroupValue(text); setAccount({...Account, type: text})}}
                    onClose={() => setGroupIsClicked(!groupIsClicked)}
                  />
                ))}
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}

      {/* Nút save account */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={() => saveAccount()}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddAccount;

const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "5%",
    marginVertical: "1%",
    marginRight: "0%"
  },
  inputLabel: {
    fontSize: 16,
    width: "25%",
    fontWeight: "500",
    color: 'grey',
    marginRight: "0%"
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: 'white',
  },

  /*saveButton: {
    backgroundColor: '#7DCEA0',
    borderRadius: 4,
    width: "100%",
    height: "50%",
    marginRight: "5%",
    padding: "1%",
    paddingTop: "2.5%",
    alignItems: 'center',
  },*/

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

  infoText: {
    fontSize: 16,
    width: "20%",
    fontWeight: "500",
    color: 'black',
    borderBottomWidth: 0.4,
    borderBottomColor: 'gray',
    flex: 1
  },

  saveButton: {
    backgroundColor: '#46CDCF',
    borderRadius: 4,
    padding: 10,
    width: '90%',
    marginTop: 48,
    alignItems: 'center',
    alignSelf: 'center',
  },
});
