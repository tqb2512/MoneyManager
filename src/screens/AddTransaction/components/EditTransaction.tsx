import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, TextInput, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import { ArrowLeftIcon, Cog6ToothIcon, PencilSquareIcon, XMarkIcon } from 'react-native-heroicons/outline';
import Categories from './Categories';
import Accounts from './Accounts';

import { getDBConnection,
    createTable,
    insertTransaction,
    dropDatabaseAndRecreate,
    getAllCategories,
    getAllAccounts,
    getCategoryById, } from '../../../services/db-services';
import { Category } from '../../../models/category';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParams2, RootStackParams3 } from '../../../navigation';
import { Transaction } from '../../../models/transaction';
import { Account } from '../../../models/account';

const EditTransaction = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams2>>();
    
    const route = useRoute<RouteProp<RootStackParams3, 'EditTransaction'>>();

    const [CategoryList, setCategoryList] = useState<Category[]>([]);
    //const [Transaction, setTransaction] = useState<Transaction>({} as Transaction);
    const [AccountList, setAccountList] = useState<Account[]>([]);
    
    const [budgetType, setBudgetType] = useState<any>('');
    const [date, setDate] = useState(new Date());

    const [isCategoriesClicked, setIsCategoriesClicked] = useState(false);
    const [isAccountsClicked, setIsAccountsClicked] = useState(false);
    const [isDateClicked, setIsDateClicked] = useState(false);
    const [isTimeClicked, setIsTimeClick] = useState(false);
    const [isAmountClicked, setIsAmountClicked] = useState(false);
    const [isNoteClicked, setIsNoteClicked] = useState(false);


  const [Transaction, setTransaction] = useState<Transaction>({} as Transaction);

    useEffect(() => {
        setTransaction({...Transaction, id: route.params._id, type:route.params._type, category:route.params._category, account:route.params._account ,
            amount:route.params._amount, day:route.params._day, month:route.params._month, year:route.params._year, time:route.params._time, note:route.params._note });
        
        setBudgetType(route.params._type)

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
    }, [])

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.mainContainer}>
    <View>
      <View>
        <View style={{ backgroundColor: 'white' }}>
          <View style={[styles.buttonContainer, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                onPress={() => {
                    setBudgetType('income');
                }}>
                <View style={[styles.typeButton, { borderColor: budgetType === 'income' ? '#46CDCF':'black'}]}>
                    <Text style={[styles.typeText, { color: budgetType === 'income' ? '#46CDCF':'black' }]}>
                    Income
                    </Text>
                </View>
                </TouchableOpacity>

                <TouchableOpacity
                onPress={() => {
                    setBudgetType('expense');
                }}>
                <View
                    style={[styles.typeButton, { borderColor: budgetType === 'income' ? 'black':'orange' }]}>
                    <Text style={[styles.typeText, { color: budgetType === 'income' ? 'black':'orange' }]}>
                    Expense
                    </Text>
                </View>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.canGoBack() ? navigation.goBack() : null} style={{ alignSelf: 'center', paddingTop: 2, marginEnd: 6 }}>
                <XMarkIcon size={24} color='black' />
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
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              onPressIn={() => {
                setIsDateClicked(true);
                setIsCategoriesClicked(false);
                setIsAccountsClicked(false);
                setIsTimeClick(false);
                setIsAmountClicked(false);
                setIsNoteClicked(false);
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
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              value={Transaction.category}
             // onChangeText={}
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
              style={{
                flex: 1,
                borderBottomWidth: 0.4,
                borderBottomColor: 'gray',
              }}
              value={Transaction.account}
              //onChangeText={}
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

          <View
            accessible={false}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                style={{
                  flex: 1,
                  borderBottomWidth: 0.4,
                  borderBottomColor: 'gray',
                }}
                placeholder=""
                keyboardType="number-pad"
                onPressIn={() => {
                  setIsDateClicked(false);
                  setIsCategoriesClicked(false);
                  setIsAccountsClicked(false);
                  setIsTimeClick(false);
                }}
                value={Transaction.amount + ''}
               // onChangeText={}
              />
            </View>
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
              //onChangeText={}
              value={Transaction.note}
            />
          </View>
        </View>

        {/* (EDIT) Save button + Delete button */}
        <View style={styles.bottomContainer}>

          <View style={{ flexDirection: 'row', padding: 16, marginTop: 16 }}>
            <TouchableOpacity
              style={[
                styles.saveButton,
                {
                  backgroundColor: budgetType == 'income' ? '#46CDCF' : 'orange',
                },
              ]}
              onPress={() => {}}>
              <Text style={{fontWeight: '500'}}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={{fontWeight: '500'}}>Delete</Text>
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
                  onPress={() => setIsCategoriesClicked(false)}>
                  <XMarkIcon size="22" color="black" />
                </TouchableOpacity>
              </View>
            </View>
            {/* Pressable cho giá trị của category */}
            <View style={[styles.button]}>
              {CategoryList.map((item) => (
                <Categories
                key={item.id}
                image_uri={item.image}
                categoryName={item.name}
                onSelect={() => {}}
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
                <TouchableOpacity
                  style={{ margin: 8 }}
                  onPress={() => setIsAccountsClicked(false)}>
                  <XMarkIcon size="22" color="black" />
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
        value={date}
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

        }}
      />
    )}
  </KeyboardAvoidingView>
  )
}

export default EditTransaction


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(229, 231, 235, 0.5)',
  },

  buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    marginTop: 8,
  },

  typeButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 6,
    marginRight: 10,
    marginLeft: 10,
    textAlign: 'center',
    alignItems: 'center'
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

  deleteButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    paddingLeft: 35,
    paddingRight: 40,
    marginRight: 10,
    alignItems: 'center',
    textAlign: 'center'
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
    // textAlign: 'center',
  },

  textStyle: {
    color: 'black',
    // textAlign: 'center',
  },
});