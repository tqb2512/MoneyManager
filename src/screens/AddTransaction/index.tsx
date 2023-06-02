import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActionSheetIOS,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import {
  Container,
  Button,
  Heading,
  Actionsheet,
  NativeBaseProvider,
  CloseIcon,
  ThreeDotsIcon,
  KeyboardAvoidingView,
} from 'native-base';
import React, { useState, useEffect } from 'react';
import Categories from './components/Categories';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Transaction } from '../../models/transaction';
import { Category } from '../../models/category';
import { Account } from '../../models/account';
import {
  getDBConnection,
  createTable,
  insertTransaction,
  dropDatabaseAndRecreate,
  getAllCategories,
  getAllAccounts,
  getCategoryById,
  getCategoryIdByName
} from '../../services/db-services';

import Accounts from './components/Accounts';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParams2 } from '../../navigation';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const AddTransaction = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams2>>();

  const [incomeColor, setIncomeColor] = useState('#7DCEA0');
  const [expenseColor, setExpenseColor] = useState('black');

  const [budgetType, setBudgetType] = useState<any>('income');
  const [isCategoriesClicked, setIsCategoriesClicked] = useState(false);
  const [isAccountsClicked, setIsAccountsClicked] = useState(false);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [isTimeClicked, setIsTimeClick] = useState(false);
  const [isAmountClicked, setIsAmountClicked] = useState(false);
  const [isNoteClicked, setIsNoteClicked] = useState(false);


  const [Transaction, setTransaction] = useState<Transaction>({} as Transaction);
  const [CategoryList, setCategoryList] = useState<Category[]>([]);
  const [AccountList, setAccountList] = useState<Account[]>([]);

  const [date, setDate] = useState(new Date());
  const timeNow = new Date();

  const isFocused = useIsFocused();


  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(selectedDate);

    let tempDate = new Date(currentDate);
    setTransaction({
      ...Transaction,
      type: budgetType,
      day: tempDate.getDate(),
      month: tempDate.getMonth() + 1,
      year: tempDate.getFullYear(),
    });
  };

  const saveTransaction = (transaction: Transaction) => {

    getDBConnection().then(db => {
      getCategoryIdByName(db, Transaction.category).then ((_category) =>
        setTransaction({...Transaction, category: _category}))
    })
    
    getDBConnection().then(db => {
      getCategoryByName(db, transaction.category).then(category => {
        transaction.category = category.id;
        insertTransaction(db, transaction).then(() => {
        });
      });
    });

    console.log(transaction);
  };

  useEffect(() => {

    setBudgetType('income')

    setTransaction({ ...Transaction, type: 'income' })

    if (!isFocused)
      return;

    setDate(new Date());

    var tempDate = new Date();
    setTransaction({
      ...Transaction,
      day: tempDate.getDate(),
      month: tempDate.getMonth() + 1,
      year: tempDate.getFullYear(),
    });

    getDBConnection().then(db => {
      getAllCategories(db).then(categories => {
        setCategoryList(categories);
      });
    });

    console.log(CategoryList);

    getDBConnection().then(db => {
      getAllAccounts(db).then(accounts => {
        setAccountList(accounts);
      });
    });

  }, [isFocused])

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.mainContainer}>
        <View>
          <View>
            <View style={{ backgroundColor: 'white' }}>
              <View style={[styles.buttonContainer, {}]}>
                <TouchableOpacity
                  onPress={() => {
                    setIncomeColor('#7DCEA0');
                    setExpenseColor('black');
                    setBudgetType('income');
                    setTransaction({ ...Transaction, type: 'income' })
                  }}>
                  <View style={[styles.typeButton, { borderColor: incomeColor }]}>
                    <Text style={[styles.typeText, { color: incomeColor }]}>
                      Income
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setExpenseColor('#F1948A');
                    setIncomeColor('black');
                    setBudgetType('expense');
                    setTransaction({ ...Transaction, type: 'expense' })
                  }}>
                  <View
                    style={[styles.typeButton, { borderColor: expenseColor }]}>
                    <Text style={[styles.typeText, { color: expenseColor }]}>
                      Expense
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                paddingBottom: 24,
                marginBottom: 12,
                backgroundColor: 'white',
                height: 360,
              }}>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Date</Text>
                <TextInput
                  style={styles.infoText}
                  onPressIn={() => {
                    setIsDateClicked(true);
                    setIsCategoriesClicked(false);
                    setIsAccountsClicked(false);
                    setIsTimeClick(false);
                    setIsAmountClicked(false);
                    setIsNoteClicked(false);

                  }}
                  showSoftInputOnFocus={false}
                  value={
                    Transaction.day +
                    '/' +
                    Transaction.month +
                    '/' +
                    Transaction.year
                  }
                  caretHidden={true}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Time</Text>
                <TextInput
                  style={styles.infoText}
                  onPressIn={() => {
                    setIsDateClicked(false);
                    setIsCategoriesClicked(false);
                    setIsAccountsClicked(false);
                    setIsTimeClick(true);
                    setIsAmountClicked(false);
                    setIsNoteClicked(false);
                  }}
                  showSoftInputOnFocus={false}
                  value={Transaction.time}
                  caretHidden={true}
                />
              </View>

              {/* Category */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Category</Text>
                <TextInput
                  style={styles.infoText}
                  value={Transaction.category}
                  onChangeText={text =>
                    setTransaction({ ...Transaction, category: text })
                  }
                  placeholder=""
                  onPressIn={() => {
                    setIsCategoriesClicked(true);
                    setIsAccountsClicked(false);
                    setIsDateClicked(false);
                    setIsTimeClick(false);
                    setIsAmountClicked(false);
                    setIsNoteClicked(false);
                  }}
                  showSoftInputOnFocus={false}
                  caretHidden={true}
                />
              </View>

              {/* Account */}
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Account</Text>
                <TextInput
                  style={styles.infoText}
                  value={Transaction.account}
                  onChangeText={text =>
                    setTransaction({ ...Transaction, account: text })
                  }
                  placeholder=""
                  onPressIn={() => {
                    setIsDateClicked(false);
                    setIsCategoriesClicked(false);
                    setIsAccountsClicked(true);
                    setIsTimeClick(false);
                    setIsAmountClicked(false);
                    setIsNoteClicked(false);
                  }}
                  showSoftInputOnFocus={false}
                  caretHidden={true}

                />
              </View>

              <TouchableWithoutFeedback
                onPress={Keyboard.dismiss}
                accessible={false}>
                <View style={styles.input}>
                  <Text style={styles.inputLabel}>Amount</Text>
                  <TextInput
                    style={styles.infoText}
                    placeholder=""
                    keyboardType="number-pad"
                    onPressIn={() => {
                      setIsDateClicked(false);
                      setIsCategoriesClicked(false);
                      setIsAccountsClicked(false);
                      setIsTimeClick(false);
                    }}
                    onChangeText={(text) =>
                      setTransaction({ ...Transaction, amount: text })
                    }
                  />
                </View>
              </TouchableWithoutFeedback>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Note</Text>
                <TextInput
                  style={styles.infoText}
                  placeholder=""
                  onChangeText={text =>
                    setTransaction({ ...Transaction, note: text })
                  }
                  value={Transaction.note}
                />
              </View>
            </View>

            {/* Description + Save button + Continue button */}
            <View style={styles.bottomContainer}>
              <View style={{ flexDirection: 'row', padding: 16, marginTop: 16 }}>
                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    {
                      backgroundColor:
                        budgetType === 'income' ? '#7DCEA0' : '#F1948A',
                    },
                  ]}
                  onPress={() => {
                    //setTransaction(...Transaction, type: budgetType)  
                    budgetType === 'income' ? setTransaction({ ...Transaction, type: 'income' }) : setTransaction({ ...Transaction, type: 'expense' })
                    saveTransaction(Transaction)
                  }}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton}>
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        {/* Input date, amount, category,  note*/}

        {/* Show categories */}
        {isCategoriesClicked && (
          <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => setIsCategoriesClicked(false)}>
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
                  <Text style={styles.textHeaderStyle}>Select category</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                      style={{ margin: 8 }}
                      onPress={() => {
                        navigation.navigate('IncomeCategory')
                        setIsCategoriesClicked(false)
                      }}>
                      <ThreeDotsIcon size="4" mt="0.5" color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ margin: 8 }}
                      onPress={() => setIsCategoriesClicked(false)}>
                      <CloseIcon size="4" mt="0.5" color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Pressable cho giá trị của category */}
                <View style={[styles.button]}>
                  {CategoryList.map((item) => (
                    <Categories
                      key={index}
                      image_uri={item.image}
                      categoryName={item.name}
                      onSelect={text => setTransaction({ ...Transaction, category: text })}
                      onClose={() => setIsCategoriesClicked(false)}
                    />))
                  }
                </View>
              </View>
            </View>
          </Modal>
        )}

        {/* Show accounts */}
        {isAccountsClicked && (
          <Modal
            animationType="fade"
            transparent={true}
            onRequestClose={() => setIsAccountsClicked(false)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View
                  style={{
                    paddingBottom: 4,
                    borderBottomColor: 'grba(0,0,0,0.1)',
                    borderBottomWidth: 0.2,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.textHeaderStyle}>Select Account</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ margin: 8 }}
                      onPress={() => {
                        navigation.navigate("AccountSetting")
                        setIsAccountsClicked(false)
                      }}>
                      <ThreeDotsIcon size="4" mt="0.5" color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{ margin: 8 }}
                      onPress={() => setIsAccountsClicked(false)}>
                      <CloseIcon size="4" mt="0.5" color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Pressable cho giá trị của group */}
                {/* <View style={[styles.buttonAccount]}> */}
                  {AccountList.map((item, index) => (
                    <Accounts
                      key={index}
                      accountName={item.name}
                      onSelect={text => setTransaction({ ...Transaction, account: text })}
                      onClose={() => setIsAccountsClicked(false)}
                    />))
                  }
               {/* </View> */}
              </View>
            </View>
          </Modal>
        )}

        {/* Show dateTime picker */}
        {isDateClicked && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={'date'}
            onChange={(event, selectedDate) => {
              setIsDateClicked(false);
              const currentDate = selectedDate || date;
              let tempDate = new Date(currentDate);
              setTransaction({
                ...Transaction,
                day: tempDate.getDate(),
                month: tempDate.getMonth() + 1,
                year: tempDate.getFullYear(),
              });
            }}
          />
        )}

        {/* Show Time picker */}
        {isTimeClicked && (
          <DateTimePicker
            testID="dateTimePicker"
            value={timeNow}
            mode={'time'}
            is24Hour={true}
            onChange={(event, selectedDate) => {
              setIsTimeClick(false);
              const currentDate = selectedDate || date;
              let tempDate = new Date(currentDate);

              let fHour = '';
              let fMinute = '';

              tempDate.getHours().toString().length < 2
                ? (fHour = '0' + tempDate.getHours().toString())
                : (fHour = tempDate.getHours().toString());
              tempDate.getMinutes().toString().length < 2
                ? (fMinute = '0' + tempDate.getMinutes().toString())
                : (fMinute = tempDate.getMinutes().toString());

              setTransaction({ ...Transaction, time: fHour + ':' + fMinute });
            }}
          />
        )}
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
};

export default AddTransaction;

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
    paddingBottom: 6,
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: 10,
    marginLeft: 10,
    textAlign: 'center',
    verticalAlign: 'middle',
  },
  typeText: {
    fontWeight: 'bold',
    fontSize: 16
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: "5%",
    marginVertical: "1%"
  },
  inputLabel: {
    fontSize: 16,
    width: "20%",
    fontWeight: "500",
    color: 'grey'
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

  saveButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: 'white',
    flex: 1,
  },

  continueButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: 'black',
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
    paddingTop: "2.5%",
    alignItems: 'center',
  },

  continueButton: {
    backgroundColor: 'white',
    borderWidth: 0.8,
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
});
