import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import { NativeBaseProvider, KeyboardAvoidingView, CloseIcon } from 'native-base';
import { TransactionDetailProp } from '../../navigation/types';
import { Transaction } from '../../models/transaction';
import { Category } from '../../models/category';
import { Account } from '../../models/account';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import {
  getDBConnection,
  getCategories,
  getAccounts,
  updateTransaction,
  deleteTransaction as deleteTransactionDB,
  updateAccountBalanceFormTransactions,
} from '../../services/db-services';
import themeContext from '../../config/themeContext';
import { themeInterface } from '../../config/themeInterface';
import { border, color } from 'native-base/lib/typescript/theme/styled-system';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Currency } from '../../models/currency';
import { Language, CategoryList } from '../../models/language';
import vi from '../../config/language/vi';
import en from '../../config/language/en';

function TransactionDetail(props: TransactionDetailProp) {
  const theme = useContext(themeContext) as themeInterface;
  const { navigation, route } = props;

  const [transaction, setTransaction] = React.useState<Transaction>(
    route.params.transaction,
  );
  const [date, setDate] = React.useState(new Date(transaction.year, transaction.month - 1, transaction.day));
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [oldTransaction, setOldTransaction] = React.useState<Transaction>({} as Transaction);
  const [currency, setCurrency] = React.useState<Currency>({} as Currency);
  const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);

  const [showDTP, setShowDTP] = React.useState(false);
  const [showCategories, setShowCategories] = React.useState(false);
  const [showAccounts, setShowAccounts] = React.useState(false);
  const [isDateClicked, setIsDateClicked] = React.useState(false);
  const [isCategoriesClicked, setIsCategoriesClicked] = React.useState(false);
  const [isAmountClicked, setIsAmountClicked] = React.useState(false);
  const [isAccountsClicked, setIsAccountsClicked] = React.useState(false);
  const [isNoteClicked, setIsNoteClicked] = React.useState(false);

  const [selectedInput, setSelectedInput] = React.useState('');

  const saveTransaction = () => {
    getDBConnection().then(db => {
      updateTransaction(db, transaction, oldTransaction).then(() => {
        navigation.goBack();
      });
    });
  };

  const deleteTransaction = () => {
    getDBConnection().then(db => {
      deleteTransactionDB(db, transaction).then(() => {
        updateAccountBalanceFormTransactions(db, transaction.account).then(() => {
          navigation.goBack();
        });
      });
    });
  };

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

    setOldTransaction(transaction);

    const getCurrencyValue = async () => {
      const value = await AsyncStorage.getItem('currency')
      if (value !== null) {
        setCurrency(JSON.parse(value));
      }
    }
    getCurrencyValue()

    const getLanguageValue = async () => {
      const value = await AsyncStorage.getItem('language')
      if (value !== null) {
        if (value === 'en') {
          setLanguagePack(en);
        } else {
          setLanguagePack(vi);
        }
      }
    }
    getLanguageValue()

  }, []);

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }]}>
        <View>
          <View
            style={[
              styles.navigateHeader,
              { backgroundColor: theme.componentBackground },
            ]}>
            <View style={styles.backButton}>
              <ChevronLeftIcon
                onPress={() => {
                  navigation.goBack();
                }}
                size={20}
                color={theme.color}
              />
              <Text style={[styles.accountNameTxt, { color: theme.color }]}>
                {languagePack.detailTransaction}
              </Text>
            </View>
          </View>

          <View style={{ backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }}>
            {/*select type*/}
            <View style={{ backgroundColor: theme.background }}>
              <View
                style={[
                  styles.buttonContainer,
                  { backgroundColor: theme.componentBackground },
                ]}>
                <Text style={{ alignSelf: 'center', color: theme.mode === 'dark' ? theme.color : 'grey' }}>{languagePack.type}</Text>

                <View style={{ flexDirection: 'row', marginLeft: '15%' }}>
                  <TouchableOpacity
                    onPress={() => {
                      setTransaction({ ...transaction, type: 'income' });
                    }}>
                    <View
                      style={
                        transaction.type == 'income'
                          ? [styles.typeButton, { borderColor: '#7DCEA0' }]
                          : styles.typeButton
                      }>
                      <Text
                        style={
                          transaction.type == 'income'
                            ? [styles.typeText, { color: '#7DCEA0' }]
                            : [styles.typeText, { color: theme.mode === 'dark' ? 'grey' : 'black' }]
                        }>
                        {languagePack.income}
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      setTransaction({ ...transaction, type: 'expense' });
                    }}>
                    <View
                      style={
                        transaction.type == 'expense'
                          ? [styles.typeButton, { borderColor: '#F1948A' }]
                          : styles.typeButton
                      }>
                      <Text
                        style={
                          transaction.type == 'expense'
                            ? [styles.typeText, { color: '#F1948A' }]
                            : [styles.typeText, { color: theme.mode === 'dark' ? 'grey' : 'black' }]
                        }>
                        {languagePack.expense}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View
              style={{
                paddingBottom: 24,
                marginBottom: 12,
                backgroundColor: theme.componentBackground,
                height: 360,
              }}>
              {/* Date */}
              <View style={styles.input}>
                <Text style={[styles.inputLabel, { color: theme.mode === 'dark' ? theme.color : 'grey' }]}>{languagePack.date}</Text>
                <TextInput
                  style={[styles.infoText, { color: theme.color }]}
                  onPressIn={() => {
                    setShowDTP(true);
                    setSelectedInput('date');
                    setIsDateClicked(true);
                    setIsCategoriesClicked(false);
                    setIsAccountsClicked(false);
                    setIsAmountClicked(false);
                    setIsNoteClicked(false);
                  }}
                  showSoftInputOnFocus={false}
                  underlineColorAndroid={
                    transaction.type != null
                      ? isDateClicked
                        ? transaction.type == 'expense'
                          ? '#F1948A'
                          : '#7DCEA0'
                        : '#EAECEE'
                      : '#EAECEE'
                  }
                  caretHidden={true}
                  value={
                    date.getDate() +
                    '/' +
                    (date.getMonth() + 1) +
                    '/' +
                    date.getFullYear()
                  }
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
                    if (selectedDate != undefined) {
                      setTransaction({
                        ...transaction,
                        day: selectedDate.getDate(),
                        month: selectedDate.getMonth() + 1,
                        year: selectedDate.getFullYear(),
                      });
                      setDate(selectedDate);
                    }
                  }}
                />
              )}

              {/* Category */}
              <View style={styles.input}>
                <Text style={[styles.inputLabel, { color: theme.mode === 'dark' ? theme.color : 'grey' }]}>{languagePack.category}</Text>
                <TextInput
                  style={[styles.infoText, { color: theme.color }]}
                  placeholder=""
                  onPressIn={() => {
                    setShowCategories(true);
                    setSelectedInput('category');
                    setIsDateClicked(false);
                    setIsCategoriesClicked(true);
                    setIsAccountsClicked(false);
                    setIsAmountClicked(false);
                    setIsNoteClicked(false);
                  }}
                  underlineColorAndroid={
                    transaction.type != null
                      ? isCategoriesClicked
                        ? transaction.type == 'expense'
                          ? '#F1948A'
                          : '#7DCEA0'
                        : '#EAECEE'
                      : '#EAECEE'
                  }
                  showSoftInputOnFocus={false}
                  caretHidden={true}
                  value={transaction.category?.name}
                />
              </View>

              {showCategories && (
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showCategories}
                  onRequestClose={() => {
                    setShowCategories(false);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingBottom: 2,
                          borderBottomColor: 'grba(0,0,0,0.1)',
                          borderBottomWidth: 0.2,
                          // marginBottom: 6,
                          backgroundColor: theme.mode === 'dark' ? '#7d7f84' : 'black',
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            padding: 8,
                            color: 'white',
                            marginStart: 4,
                          }}>
                          {languagePack.category}
                        </Text>
                        <CloseIcon
                          color="white"
                          style={{ marginEnd: 12 }}
                          onPress={() => {
                            setShowCategories(false);
                            setSelectedInput('');
                          }}
                        />
                      </View>

                      <View style={{ alignItems: 'center', width: '100%' }}>
                        <FlatList
                          style={{ width: "100%" }}
                          numColumns={3 / 1}
                          data={categories}
                          renderItem={({ item, index }) => (
                            <TouchableOpacity
                              style={{
                                width: '33.33%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 12,
                                borderLeftWidth: 0.25,
                                borderRightWidth: 0.25,
                                borderBottomWidth: 0.75,
                              }}
                              onPress={() => {
                                setTransaction({
                                  ...transaction,
                                  category: item,
                                });
                                setSelectedInput('');
                                setShowCategories(false);
                              }}>
                              {/* test image */}
                              <Text style={{ }}>{languagePack.categories[CategoryList.indexOf(item.name.toLowerCase())][1]}</Text>
                            </TouchableOpacity>
                          )}
                          keyExtractor={item => item.id.toString()}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              )}

              {/* Account */}
              <View style={styles.input}>
                <Text style={[styles.inputLabel, { color: theme.mode === 'dark' ? theme.color : 'grey' }]}>{languagePack.account}</Text>
                <TextInput
                  style={[styles.infoText, { color: theme.color }]}
                  placeholder=""
                  onPressIn={() => {
                    setShowAccounts(true);
                    setSelectedInput('account');
                    setIsDateClicked(false);
                    setIsCategoriesClicked(false);
                    setIsAccountsClicked(true);
                    setIsAmountClicked(false);
                    setIsNoteClicked(false);
                  }}
                  underlineColorAndroid={
                    transaction.type != null
                      ? isAccountsClicked
                        ? transaction.type == 'expense'
                          ? '#F1948A'
                          : '#7DCEA0'
                        : '#EAECEE'
                      : '#EAECEE'
                  }
                  showSoftInputOnFocus={false}
                  caretHidden={true}
                  value={transaction.account?.name}
                />
              </View>

              {showAccounts && (
                <Modal
                  animationType="fade"
                  transparent={true}
                  visible={showAccounts}
                  onRequestClose={() => {
                    setShowAccounts(false);
                  }}>
                  <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingBottom: 2,
                          borderBottomColor: 'grba(0,0,0,0.1)',
                          borderBottomWidth: 0.2,
                          // marginBottom: 6,
                          backgroundColor: theme.mode === 'dark' ? '#7d7f84' : 'black',
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            padding: 8,
                            color: 'white',
                            marginStart: 4,
                          }}>
                          {languagePack.account}
                        </Text>
                        <CloseIcon
                          color="white"
                          style={{ marginEnd: 12 }}
                          onPress={() => {
                            setShowAccounts(false);
                            setSelectedInput('');
                          }}
                        />
                      </View>

                      <View style={{ alignItems: 'center', width: '100%' }}>
                        <FlatList
                          style={{ width: '100%' }}
                          numColumns={3 / 1}
                          data={accounts}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              style={{
                                width: '33.33%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: 12,
                                borderLeftWidth: 0.25,
                                borderRightWidth: 0.25,
                                borderBottomWidth: 0.75,
                              }}
                              onPress={() => {
                                setTransaction({
                                  ...transaction,
                                  account: item,
                                });
                                setSelectedInput('');
                                setShowAccounts(false);
                              }}>
                              {/* test image */}
                              <Text style={{ paddingHorizontal: 8 }}>{item.name}</Text>
                            </TouchableOpacity>
                          )}
                          keyExtractor={item => item.name}
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
                  <Text style={[styles.inputLabel, { color: theme.mode === 'dark' ? theme.color : 'grey' }]}>{languagePack.amount}</Text>
                  <TextInput
                    style={[styles.infoText, { color: theme.color }]}
                    placeholder=""
                    value={transaction.amount.toString()}
                    onChangeText={text => {
                      if (isNaN(Number(text))) {
                        return;
                      }
                      setTransaction({ ...transaction, amount: Number(text) });
                    }}
                    keyboardType="number-pad"
                    onPressIn={() => {
                      setSelectedInput('amount');
                      setIsDateClicked(false);
                      setIsCategoriesClicked(false);
                      setIsAccountsClicked(false);
                      setIsAmountClicked(true);
                      setIsNoteClicked(false);
                    }}
                    underlineColorAndroid={
                      transaction.type != null
                        ? isAmountClicked
                          ? transaction.type == 'expense'
                            ? '#F1948A'
                            : '#7DCEA0'
                          : '#EAECEE'
                        : '#EAECEE'
                    }
                  />
                </View>
              </TouchableWithoutFeedback>

              <View style={[styles.input, {}]}>
                <Text style={[styles.inputLabel, { color: theme.mode === 'dark' ? theme.color : 'grey' }]}>{languagePack.note}</Text>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={[styles.infoText, { color: theme.color }]}
                  value={transaction.note}
                  onChangeText={text => {
                    setTransaction({ ...transaction, note: text });
                  }}
                  onPressIn={() => {
                    setSelectedInput('note');
                    setIsDateClicked(false);
                    setIsCategoriesClicked(false);
                    setIsAccountsClicked(false);
                    setIsAmountClicked(false);
                    setIsNoteClicked(true);
                  }}
                  underlineColorAndroid={
                    transaction.type != null
                      ? isNoteClicked
                        ? transaction.type == 'expense'
                          ? '#F1948A'
                          : '#7DCEA0'
                        : '#EAECEE'
                      : '#EAECEE'
                  }
                  placeholder=""
                />
              </View>
            </View>

            {/* Description + Save button + delete button */}
            <View style={[styles.bottomContainer, { backgroundColor: theme.componentBackground }]}>
              <View
                style={{ flexDirection: 'row', padding: '4%', marginTop: '1%' }}>
                <TouchableOpacity
                  style={
                    transaction.type != null
                      ? transaction.type == 'expense'
                        ? [styles.saveButton, { backgroundColor: '#F1948A' }]
                        : [styles.saveButton, { backgroundColor: '#7DCEA0' }]
                      : styles.saveButton
                  }
                  onPress={() => {
                    if (transaction.amount == 0) {
                      Alert.alert('Please enter amount');
                    } else if (transaction.category == null) {
                      Alert.alert('Please choose category');
                    } else if (transaction.account == null) {
                      Alert.alert('Please choose account');
                    } else if (transaction.type == null) {
                      Alert.alert('Please choose type');
                    } else {
                      saveTransaction();
                    }
                  }}>
                  <Text style={styles.saveButtonText}>{languagePack.save}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => {
                    deleteTransaction();
                  }}>
                  <Text style={styles.deleteButtonText}>{languagePack.delete}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

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
    paddingHorizontal: '5%',
    marginTop: '3%',
  },

  typeButton: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#D5D8DC',
    padding: 4,
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: 2,
    marginLeft: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 18,
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
    marginVertical: '1%',
  },
  inputLabel: {
    // fontSize: 18,
    width: '20%',
    // fontWeight: "500",
    color: 'grey',
  },

  infoText: {
    fontSize: 18,
    width: '20%',
    fontWeight: 'bold',
    color: '#2C3E50',
    flex: 1,
    marginLeft: '5%',
  },

  saveButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
    flex: 1,
  },

  deleteButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
    flex: 1,
  },

  bottomContainer: {
    backgroundColor: 'white',
  },

  saveButton: {
    backgroundColor: '#D5D8DC',
    borderRadius: 4,
    width: '60%',
    height: '100%',
    marginRight: '5%',
    padding: '1%',
    paddingTop: '2%',
    alignItems: 'center',
  },

  deleteButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D5D8DC',
    width: '35%',
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    paddingTop: '2%',
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
    borderRadius: 2,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 4,
    // padding: 4,
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
  },

  navigateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    textAlign: 'center',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountNameTxt: {
    marginLeft: 24,
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },
});

export default React.memo(TransactionDetail);
