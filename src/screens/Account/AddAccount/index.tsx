import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Button from './components/AccountGroupButton';

const AddAccount = () => {
  const [groupIsClicked, setGroupIsClicked] = useState(false);
  const [groupValue, setGroupValue] = useState<any | null>(null);

  return (
    <View style={{}}>
      {/* Group */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Group</Text>
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 0.4,
            borderBottomColor: 'gray',
          }}
          onPressIn={() => setGroupIsClicked(!groupIsClicked)}
          showSoftInputOnFocus={false}
          value={groupValue}
          onChangeText={() => {}}
          caretHidden={true}
          //  Đưa giá trị vô đây
        />
      </View>
      {/* Name account */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Name</Text>
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 0.4,
            borderBottomColor: 'gray',
          }}
          onPressIn={() => {}}
          showSoftInputOnFocus={false}
          onChangeText={() => {}}
          //  Đưa giá trị vô đây
        />
      </View>
      {/* Amount account */}
      <View style={styles.input}>
        <Text style={styles.inputLabel}>Amount</Text>
        <TextInput
          style={{
            flex: 1,
            borderBottomWidth: 0.4,
            borderBottomColor: 'gray',
          }}
          onPressIn={() => {}}
          onChangeText={() => {}}
          keyboardType="number-pad"
          //  Đưa giá trị vô đây
        />
      </View>
      {/* Description account */}
      <View style={styles.input}>
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
          //  Đưa giá trị vô đây
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
                <Button
                  accountGroup="Cash"
                  onSelect={text => setGroupValue(text)}
                  onClose={() => setGroupIsClicked(!groupIsClicked)}
                />
                <Button
                  accountGroup="Account"
                  onSelect={text => setGroupValue(text)}
                  onClose={() => setGroupIsClicked(!groupIsClicked)}
                />
              </Pressable>
            </View>
          </Pressable>
        </Modal>
      )}

      {/* Nút save account */}
      <TouchableOpacity
        style={[
          styles.saveButton,
          {backgroundColor:'#46CDCF'},
        ]}
        onPress={() => {}}>
        <Text style={{fontWeight: '600'}}>Save</Text>
      </TouchableOpacity>
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
