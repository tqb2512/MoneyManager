import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard, Modal, FlatList, Alert } from 'react-native';
import { NativeBaseProvider, KeyboardAvoidingView, CloseIcon } from 'native-base';
import { AddTransactionProp } from '../../navigation/types';
import { Transaction } from '../../models/transaction';
import { Category } from '../../models/category';
import { Account } from '../../models/account';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDBConnection, getCategories, getAccounts, insertTransaction } from '../../services/db-services';

function AddTransaction(props: AddTransactionProp) {
  const { navigation } = props;
  const [transaction, setTransaction] = React.useState<Transaction>({day: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear(), amount: 0} as Transaction);
  const [showDTP, setShowDTP] = React.useState(false);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showAccounts, setShowAccounts] = React.useState(false);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  const [selectedInput, setSelectedInput] = React.useState('');

  const saveTransaction = () => {
    if (transaction.amount && transaction.category && transaction.account) {
      getDBConnection().then(db => {
        insertTransaction(db, transaction).then(() => {
          console.log(transaction)
          navigation.goBack();
        });
      });
    } else {
      Alert.alert('Please fill all fields');
    }
  }


  React.useEffect(() => {
    props.navigation.setOptions({
      title: 'Add Transaction',
    });

    getDBConnection().then(db => {
      getCategories(db).then(categories => {
        setCategories(categories);
      });
      getAccounts(db).then(accounts => {
        setAccounts(accounts);
      });
    });
  }, []);

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        <View>

          <View>
            {/*select type*/}
            <View style={{ backgroundColor: 'white' }}>
              <View style={[styles.buttonContainer, {}]}>
                <TouchableOpacity onPress={() => {
                  setTransaction({ ...transaction, type: 'income' });
                }}>
                  <View style={transaction.type == 'income' ? [styles.typeButton, { borderColor: "#7DCEA0" }] : styles.typeButton}>
                    <Text style={transaction.type == 'income' ? [styles.typeText, { color: "#7DCEA0" }] : styles.typeText}>
                      Income
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  setTransaction({ ...transaction, type: 'expense' });
                }}>
                  <View style={transaction.type == 'expense' ? [styles.typeButton, { borderColor: "#F1948A" }] : styles.typeButton}>
                    <Text style={transaction.type == 'expense' ? [styles.typeText, { color: "#F1948A" }] : styles.typeText}>
                      Expense
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ paddingBottom: 24, marginBottom: 12, backgroundColor: 'white', height: 360, }}>

              {/* Date */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Date</Text>
                <TextInput
                  style={styles.infoText}
                  onPressIn={() => { setShowDTP(true);}}
                  showSoftInputOnFocus={false}
                  underlineColorAndroid={selectedInput == 'date' ? '#7DCEA0' : 'gray'}
                  caretHidden={true}
                  value={transaction.day + '/' + transaction.month + '/' + transaction.year}
                />
              </View>

              {showDTP && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={new Date()}
                  mode={'date'}
                  is24Hour={true}
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDTP(false);
                    setSelectedInput('');
                    const date = selectedDate || new Date();
                    setTransaction({
                      ...transaction,
                      day: date.getDate(),
                      month: date.getMonth() + 1,
                      year: date.getFullYear(),
                    });
                  }}
                />
              )}

              {/* Category */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Category</Text>
                <TextInput
                  style={styles.infoText}
                  placeholder=""
                  onPressIn={() => { setShowCategories(true); setSelectedInput('category'); }}
                  underlineColorAndroid={selectedInput == 'category' ? '#7DCEA0' : 'gray'}
                  showSoftInputOnFocus={false}
                  caretHidden={true}
                  value={transaction.category?.name}
                />
              </View>

              {showCategories && (
                <Modal animationType="fade" transparent={true} visible={showCategories} onRequestClose={() => { setShowCategories(false); }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingBottom: 4,
                          borderBottomColor: 'grba(0,0,0,0.1)',
                          borderBottomWidth: 0.2,
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categories</Text>
                        <CloseIcon onPress={() => { setShowCategories(false); setSelectedInput('') }} />
                      </View>

                      <View>
                        <FlatList
                          data={categories}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => {
                                setTransaction({ ...transaction, category: item });
                                setSelectedInput('');
                                setShowCategories(false);
                              }}>
                              <Text>{item.name}</Text>
                            </TouchableOpacity>
                          )}
                          keyExtractor={(item) => item.id.toString()}
                        />
                      </View>

                    </View>
                  </View>
                </Modal>
              )}

              {/* Account */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Account</Text>
                <TextInput
                  style={styles.infoText}
                  placeholder=""
                  onPressIn={() => { setShowAccounts(true); setSelectedInput('account'); }}
                  underlineColorAndroid={selectedInput == 'account' ? '#7DCEA0' : 'gray'}
                  showSoftInputOnFocus={false}
                  caretHidden={true}
                  value={transaction.account?.name}
                />
              </View>

              {showAccounts && (
                <Modal animationType="fade" transparent={true} visible={showAccounts} onRequestClose={() => { setShowAccounts(false); }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingBottom: 4,
                          borderBottomColor: 'grba(0,0,0,0.1)',
                          borderBottomWidth: 0.2,
                        }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Accounts</Text>
                        <CloseIcon onPress={() => { setShowAccounts(false); setSelectedInput('') }} />
                      </View>

                      <View>
                        <FlatList
                          data={accounts}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() => {
                                setTransaction({ ...transaction, account: item });
                                setSelectedInput('');
                                setShowAccounts(false);
                              }}>
                              <Text>{item.name}</Text>
                            </TouchableOpacity>
                          )}
                          keyExtractor={(item) => item.id.toString()}
                        />
                      </View>

                    </View>
                  </View>
                </Modal>
              )}

              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Amount</Text>
                  <TextInput
                    style={styles.infoText}
                    placeholder=""
                    value={transaction.amount.toString()}
                    onChangeText={(text) => { setTransaction({ ...transaction, amount: Number(text) }); }}
                    keyboardType="number-pad"
                    onPressIn={() => { setSelectedInput('amount'); }}
                    underlineColorAndroid={selectedInput == 'amount' ? '#7DCEA0' : 'gray'}
                  />
                </View>
              </TouchableWithoutFeedback>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Note</Text>
                <TextInput
                  style={styles.infoText}
                  value={transaction.note}
                  onChangeText={(text) => { setTransaction({ ...transaction, note: text }); }}
                  onPressIn={() => { setSelectedInput('note'); }}
                  underlineColorAndroid={selectedInput == 'note' ? '#7DCEA0' : 'gray'}
                  placeholder=""
                />
              </View>
            </View>

            {/* Description + Save button + Continue button */}
            <View style={styles.bottomContainer}>

              <View style={{ flexDirection: 'row', padding: "4%", marginTop: "1%" }}>
                <TouchableOpacity
                  style={[styles.saveButton]}
                  onPress={() => {
                    if (transaction.amount === 0) {
                      Alert.alert('Please enter amount');
                    } else if (transaction.category === null) {
                      Alert.alert('Please choose category');
                    } else if (transaction.account === null) {
                      Alert.alert('Please choose account');
                    } else if (transaction.type === null) {
                      Alert.alert('Please choose type');
                    } else {
                      saveTransaction();
                    }
                  }}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={() => {
                    setTransaction({ ...transaction, amount: 0, note: '' });
                  }}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

export default React.memo(AddTransaction);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
  },

  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: 8,
    paddingHorizontal: "15%",
    marginTop: "3%"
  },

  typeButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: 10,
    marginLeft: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Montserrat'
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "5%",
    marginVertical: "1%",
  },
  inputLabel: {
    fontSize: 18,
    width: "20%",
    fontWeight: "500",
    color: 'grey',
  },

  infoText: {
    fontSize: 18,
    width: "20%",
    fontWeight: "bold",
    color: '#2C3E50',
    flex: 1,
    marginLeft: "5%"
  },

  saveButtonText: {
    fontSize: 18,
    fontWeight: "500",
    color: 'white',
    flex: 1,
  },

  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'grey',
    flex: 1,
  },

  bottomContainer: {
    backgroundColor: 'white',
  },

  saveButton: {
    backgroundColor: '#7DCEA0',
    borderRadius: 4,
    width: "60%",
    height: "100%",
    marginRight: "5%",
    padding: "1%",
    paddingTop: "2%",
    alignItems: 'center',
  },

  continueButton: {
    backgroundColor: 'white',
    borderWidth: 0.8,
    borderColor: 'grey',
    width: "35%",
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: "2%"
  },

  categoryAction: {
    // position: 'absolute',
    // bottom: 0,
    // zIndex: 50,
    // backgroundColor: '#666161',
    // width: '100%',
    // height: '50%',
  },

  categoryTopBar: {
    backgroundColor: 'black',
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  icons: {
    padding: 8,
    marginLeft: 4,
    marginRight: 4,
  },

  categoryContainer: {
    flexDirection: 'row',
  },

  accountContainer: {
    flexDirection: 'column',
  },

  chooseAccountButton: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 0.4,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  buttonAccount: {
    padding: 10,
    elevation: 2,
  },

  textHeaderStyle: {
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    //textAlign: 'center',
  },

  textStyle: {
    color: 'black',
    // textAlign: 'center',
  },

  dateTimePicker: {
    backgroundColor: 'white',
    borderRadius: 5,
    borderColor: '#C5C5C5',
    borderWidth: 1,
    marginVertical: 10,
    height: 43,
  }
});