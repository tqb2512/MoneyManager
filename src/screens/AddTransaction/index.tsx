import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActionSheetIOS,
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
import React, {useState} from 'react';
import Categories from './components/Categories';
import DateTimePicker from '@react-native-community/datetimepicker'
import { Transaction } from '../../models/transaction';
import { Category } from '../../models/category';
import { Account } from '../../models/account';
import { getDBConnection, createTable, insertTransaction } from '../../services/db-services';
import { useKeyboardDismissable } from 'native-base';


const AddTransaction = () => {
  const [incomeColor, setIncomeColor] = useState('#46CDCF');
  const [expenseColor, setExpenseColor] = useState('black');

  const [budgetType, setBudgetType] = useState('income');
  const [isCategoriesClicked, setIsCategoriesClicked] = useState(false);
  const [isAccountsClicked, setIsAccountsClicked] = useState(false);
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [isTimeClicked, setIsTimeClick] = useState(false);

  // Value đưa vào khi bấm save
  /*const [categoryValue, setCategoryValue] = useState<any | null>(null);
  const [accountValue, setAccountValue] = useState<any | null>(null);
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [amountValue, setAmountValue] = useState<any | null>(null);
  const [noteValue, setNoteValue] = useState<any | null>(null);
  const [descripTion, setDescription] = useState<any | null>(null);*/

  const [Transaction, setTransaction] = useState<Transaction>({} as Transaction);

  const [date, setDate] = useState(new Date());
  const timeNow = new Date()

  const onChange = (event: Event, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setDate(selectedDate)

    let tempDate = new Date(currentDate)
    setTransaction({...Transaction, day: tempDate.getDate(), month: tempDate.getMonth() + 1, year: tempDate.getFullYear()})
  }

  const saveTransaction = (transaction: Transaction) => {
    getDBConnection().then((db) => {
      createTable(db).then(() => {
        insertTransaction(db, transaction);
      });
    });
    console.log(transaction);
  }


  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView style={styles.mainContainer}>
        <View style={{backgroundColor: 'white'}}>
          <View style={[styles.buttonContainer, {}]}>
            <TouchableOpacity
              onPress={() => {
                setIncomeColor('#46CDCF');
                setExpenseColor('black');
                setBudgetType('income');
              }}>
              <View style={[styles.typeButton, {borderColor: incomeColor}]}>
                <Text style={[styles.typeText, {color: incomeColor}]}>
                  Income
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setExpenseColor('orange');
                setIncomeColor('black');
                setBudgetType('expense');
              }}>
              <View style={[styles.typeButton, {borderColor: expenseColor}]}>
                <Text style={[styles.typeText, {color: expenseColor}]}>
                  Expense
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {/* Input date, amount, category,  note*/}
        <View
          style={{
            paddingBottom: 24,
            marginBottom: 12,
            backgroundColor: 'white',
            height: '60%',
          }}>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Date</Text>
            <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              onPressIn={()=>{
                setIsDateClicked(true);
                setIsCategoriesClicked(false);
                setIsAccountsClicked(false);
                setIsTimeClick(false)
              }}
              showSoftInputOnFocus={false}
              value={Transaction.day + '/' + Transaction.month + '/' + Transaction.year}
              caretHidden={true}
            />           
          </View>

          <View style={styles.input}>
            <Text style={styles.inputLabel}>Time</Text>
            <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              onPressIn={()=> {
                setIsDateClicked(false);
                setIsCategoriesClicked(false);
                setIsAccountsClicked(false);
                setIsTimeClick(true)
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
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              value={Transaction.category}
              onChangeText={text => setTransaction({...Transaction, category: text})}
              placeholder=""
              onPressIn={() => {
                setIsCategoriesClicked(true);
                setIsAccountsClicked(false);
                setIsDateClicked(false);
                setIsTimeClick(false);
              }}
              showSoftInputOnFocus={false}
              caretHidden={true}
            />
          </View>
          
          {/* Account */}
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Account</Text>
            <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              value={Transaction.account}
              onChangeText={text => setTransaction({...Transaction, account: text})}
              placeholder=""
              onPressIn={() => {
                setIsDateClicked(false)
                setIsCategoriesClicked(false);
                setIsAccountsClicked(true);
                setIsTimeClick(false);
              }}
              showSoftInputOnFocus={false}
              caretHidden={true}
            />
          </View>
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Amount</Text>
            <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              placeholder=""
              keyboardType='number-pad'
              onPressIn={()=> {
                setIsDateClicked(false);
                setIsCategoriesClicked(false);
                setIsAccountsClicked(false);
                setIsTimeClick(false);
              }}
              onChangeText={text => setTransaction({...Transaction, amount: text})
              }
            />
          </View>
          
          <View style={styles.input}>
            <Text style={styles.inputLabel}>Note</Text>
            <TextInput
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              placeholder=""
              onChangeText={text => setTransaction({...Transaction, note: text})}
              value={Transaction.note}           
            />
          </View>
        </View>

        {/* Description + Save button + Continue button */}
        <View style={styles.bottomContainer}>
          <TextInput
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: 'gray',
              marginLeft: 12,
              marginRight: 12,
            }}
            placeholder="Description"
            //onChangeText={text => setDescripTion(text)}
            //value={descripTion}      
          />

          <View style={{flexDirection: 'row', padding: 16, marginTop: 16}}>
            <TouchableOpacity 
              style={[styles.saveButton, {backgroundColor: budgetType === 'income'? '#46CDCF' : 'orange' }]}
              onPress={() => saveTransaction(Transaction)}
              >
              <Text>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.continueButton}>
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Show categories */}
        {isCategoriesClicked && (
          <View style={styles.categoryAction}>
            <View style={styles.categoryTopBar}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 8,
                }}>
                Category
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity style={styles.icons}>
                  <ThreeDotsIcon size="4" mt="0.5" color="emerald.500" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsCategoriesClicked(false)}
                  style={styles.icons}>
                  <CloseIcon size="4" mt="0.5" color="emerald.500" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.categoryContainer}>
                  <Categories
                  onClose={() => {setIsCategoriesClicked(false)}}
                  onSelect={text => Transaction.category.name = text}
                  categoryName="Eating"
                  />
                  <Categories
                  onClose={() => {setIsCategoriesClicked(false)}}
                  onSelect={text => Transaction.category.name = text}
                  categoryName="Playing"
                  />
                  <Categories
                  onClose={() => {setIsCategoriesClicked(false)}}
                  onSelect={text => Transaction.category.name = text}
                  categoryName="Sleeping"
                  />
            </View>
          </View>
        )}

        {/* Show accounts */}
        {isAccountsClicked && (
          <View style={styles.categoryAction}>
            <View style={styles.categoryTopBar}>
              <Text style={{color: 'white', fontWeight: '600', alignItems: 'center', justifyContent:'center', padding: 8}}>Account</Text>
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.icons}>
                  <ThreeDotsIcon size="4" mt="0.5" color="emerald.500" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=> {
                    setIsAccountsClicked(!isAccountsClicked)
                  }}  
                  style={styles.icons}
                >
                  <CloseIcon size="4" mt="0.5" color="emerald.500"/>
                </TouchableOpacity>
              </View>
            </View>
            
            <View style={styles.accountContainer}>
              <TouchableOpacity 
                onPress={() => {
                  //setAccountValue('Account')
                  setIsAccountsClicked(false)
                }}
                style={styles.chooseAccountButton}>
                <Text>Account</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {
                  //setAccountValue('Cash')
                  setIsAccountsClicked(false)
                }}
                style={styles.chooseAccountButton}>
                <Text>Cash</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={() => {
                  //setAccountValue('Card')
                  setIsAccountsClicked(false)
                }}
                style={styles.chooseAccountButton}>
                <Text>Card</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Show dateTime picker */}
        {isDateClicked && (
          <DateTimePicker
            testID='dateTimePicker'
            value={timeNow}
            mode={'date'}
            is24Hour={true}
            onChange={(event, selectedDate)=>{
              setIsDateClicked(false)
              const currentDate = selectedDate || date;         
              let tempDate = new Date(currentDate)
              setTransaction({...Transaction, day: tempDate.getDate(), month: tempDate.getMonth() + 1, year: tempDate.getFullYear()})
            }}
          />
        )
        }

        {/* Show Time picker */}
        {isTimeClicked && (
          <DateTimePicker
            testID='dateTimePicker'
            value={timeNow}
            mode={'time'}
            is24Hour={true}
            onChange={(event, selectedDate)=>{
              setIsTimeClick(false)
              const currentDate = selectedDate || date;         
              let tempDate = new Date(currentDate)

              let fHour = '';
              let fMinute = '';

              tempDate.getHours().toString().length < 2 ? fHour = "0" + tempDate.getHours().toString() : fHour = tempDate.getHours().toString()
              tempDate.getMinutes().toString().length < 2 ? fMinute = "0" + tempDate.getMinutes().toString() : fMinute = tempDate.getMinutes().toString()

              setTransaction({...Transaction, time: fHour + ":" + fMinute})
            }}
          />
        )
        }
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
    padding: 8,
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
  },

  input: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    margin: 2,
    height: '15%'
  },
  inputLabel: {
    marginRight: 16,
    width: 60,
  },

  bottomContainer: {
    backgroundColor: 'white',
  },

  saveButton: {
    backgroundColor: '#46CDCF',
    borderRadius: 4,
    padding: 10,
    width: 220,
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: 12,
    marginLeft: 6,
    alignItems: 'center',
  },

  continueButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginRight: 10,
    alignItems: 'center',
  },

  categoryAction: {
    position: 'absolute',
    bottom: 0,
    zIndex: 50,
    backgroundColor: '#666161',
    width: '100%',
    height: '50%',
  },

  categoryTopBar: {
    backgroundColor: 'black',
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  icons: {
    padding: 8,
    marginLeft: 4,
    marginRight: 4,
  },

  categoryContainer: {
    flexDirection: 'row'
  },

  accountContainer: {
    flexDirection: 'column'
  },

  chooseAccountButton: {
    width: '100%',
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 0.4,
  }
});
