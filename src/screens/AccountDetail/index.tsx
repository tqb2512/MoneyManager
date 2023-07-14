import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Modal, TextInput, Alert, Image} from 'react-native';
import {AccountDetailProp} from '../../navigation/types';
import {
  ChevronLeftIcon,
  PencilIcon,
  XMarkIcon,
  Bars3Icon,
} from 'react-native-heroicons/outline';
import {
  getAccounts,
  getDBConnection,
  getDayBoxByAccount,
  deleteAccount,
  updateAccount
} from '../../services/db-services';
import {DayBox as DayBoxModel} from '../../models/dayBox';
import DayBox from '../Home/Daily/components/DayBox';
import {Currency} from '../../models/currency';
import themeContext from '../../config/themeContext';
import {themeInterface} from '../../config/themeInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Account} from '../../models/account';
import {Language} from '../../models/language';
import vi from '../../config/language/vi';
import en from '../../config/language/en';
import {TouchableOpacity} from 'react-native';
import { NumericFormat } from 'react-number-format';

function AccountDetail(props: AccountDetailProp) {
  const theme = useContext(themeContext) as themeInterface;

  const {navigation} = props;

  const [account, setAccount] = React.useState<Account>(
    props.route.params.account,
  );
  const [currency, setCurrency] = React.useState<Currency>({} as Currency);
  const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);
  const [menuShow, setMenuShow] = React.useState(false);
  const [isNoData, setIsNoData] = React.useState(false);
  const [accountName, setAccountName] = React.useState<String>('');
  const [totalIncome, setTotalIncome] = React.useState<number>(0);
  const [totalExpense, setTotalExpense] = React.useState<number>(0);
  const [languagePack, setLanguagePack] = React.useState<Language>(
    {} as Language,
  );

  const [showEditAccount, setShowEditAccount] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setMenuShow(false)
      getDBConnection().then(db => {
        getDayBoxByAccount(db, props.route.params.account).then(dayBoxes => {
          setDayBoxes(dayBoxes);
          { dayBoxes.length == 0 ? setIsNoData(true) : setIsNoData(false) }
          let tempTotalIncome = 0;
          let tempTotalExpense = 0;
          for (let i = 0; i < dayBoxes.length; i++) {
            tempTotalIncome += dayBoxes[i].totalIncome;
            tempTotalExpense += dayBoxes[i].totalExpense;
          }
          setTotalIncome(tempTotalIncome);
          setTotalExpense(tempTotalExpense);
        });
      });

      getDBConnection().then(db => {
        getAccounts(db).then(accounts => {
          for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].id === props.route.params.account.id) {
              setAccount(accounts[i]);
              break;
            }
          }
        });
      });

      const getCurrencyValue = async () => {
        const value = await AsyncStorage.getItem('currency');
        if (value !== null) {
          setCurrency(JSON.parse(value));
        }
      };
      getCurrencyValue();

      const getLanguageValue = async () => {
        const value = await AsyncStorage.getItem('language');
        if (value !== null) {
          if (value === 'vi') {
            setLanguagePack(vi);
          } else {
            setLanguagePack(en);
          }
        }
      };
      getLanguageValue();
    });

    return unsubscribe;
  }, [navigation]);

  const deleteAccountFunction = () => {
    Alert.alert(languagePack.deleteAccount, languagePack.deleteAccountAlert, [
      {
        text: languagePack.cancel,
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: languagePack.delete,
        onPress: () => {
          getDBConnection().then(db => {
            deleteAccount(db, account).then(() => {
              navigation.goBack();
            });
          });
        },
      },
    ]);
  };

  const saveAccountName = () => {
    if (account.name == '') {
      Alert.alert(languagePack.alert, languagePack.accountNameEmpty);
      return;
    }
    getDBConnection().then(db => {
      updateAccount(db, account).then(() => {
        setShowEditAccount(false);
        navigation.goBack();
      });
    });
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {backgroundColor: theme.mode === 'dark' ? theme.background : ''},
      ]}>
      <View
        style={[
          styles.navigateHeader,
          {
            backgroundColor: theme.componentBackground,
            borderBottomColor: theme.color,
          },
        ]}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={20}
            color={theme.color}
          />
          <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.accountNameTxt, {color: theme.color, width: '80%'}]}>
            {props.route.params.account.name}
          </Text>
        </View>
        {/* navigation.navigate("edit_account", { account: props.route.params.account )}*/}
        <Bars3Icon
          onPress={() => {
            setMenuShow(!menuShow);
          }}
          size={20}
          color={theme.color}
        />
      </View>


      {menuShow && (
        <View style={[styles.subView, {backgroundColor: theme.background}]}>
          {/* Edit button */}
          <TouchableOpacity
            style={styles.addThreeDotsContainer}
            onPress={() => {
              setShowEditAccount(true);
              setMenuShow(false);
            }}>
            <Text style={[styles.threeDotsText, {color: theme.color}]}>
              {languagePack.edit}
            </Text>
          </TouchableOpacity>
          {/* Delete button */}
          <TouchableOpacity
            style={[
              styles.addThreeDotsContainer,
              {borderTopWidth: 1, paddingTop: 8},
            ]}
            onPress={() => {
              deleteAccountFunction();
              setMenuShow(false);
            }}>
            <Text style={[styles.threeDotsText, {color: theme.color}]}>
              {languagePack.delete}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {showEditAccount && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={showEditAccount}
          onRequestClose={() => {
            setShowEditAccount(false);
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
                  marginBottom: 6,
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
                  {languagePack.editAccount}
                </Text>
                {/* Close icon */}
                <View style={{right: 4}}>
                  <XMarkIcon
                    color="white"
                    style={{marginEnd: 0}}
                    onPress={() => {
                      setShowEditAccount(false);
                    }}
                  />
                </View>
              </View>

              <View>
                <View style={styles.input}>
                  <Text style={[styles.inputLabel, {color: 'black'}]}>
                    {languagePack.name}
                  </Text>
                  <TextInput
                    value={account.name}
                    style={[styles.infoText, {color: 'black'}]}
                    onPressIn={() => {}}
                    onChangeText={name => {
                      setAccount({...account, name: name});
                    }}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.saveButton,
                    {backgroundColor: '#2196f3', marginBottom: 16},
                  ]}
                  onPress={() => {
                    saveAccountName();
                  }}>
                  <Text style={{fontWeight: '600', color: 'white'}}>{languagePack.save}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      <View
        style={[
          styles.totalColumns,
          {backgroundColor: theme.componentBackground},
        ]}>
        <View style={[styles.column]}>
          <Text style={{color: theme.color}}>{languagePack.income}</Text>
          <NumericFormat
            value={totalIncome}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => (
              <Text style={{color: '#7DCEA0'}}>
                {currency.symbol} {value}
              </Text>
            )}/>
        </View>

        <View style={styles.column}>
          <Text style={{color: theme.color}}>{languagePack.expense}</Text>
          <NumericFormat
            value={totalExpense}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => (
              <Text style={{color: '#F1948A'}}>
                {currency.symbol} {value}
              </Text>
            )}/>
        </View>

        <View style={styles.column}>
          <Text style={{color: theme.color}}>{languagePack.balance}</Text>
          <NumericFormat
            value={account.balance}
            displayType={'text'}
            thousandSeparator={true}
            renderText={value => (
              <Text style={account.balance >= 0 ? {color: '#7DCEA0'} : {color: '#F1948A'}}>
                {currency.symbol} {value}
              </Text>
            )}/>
        </View>
      </View>

      {/* No data view */}
      { isNoData && (
        <View>
          <Image
            source={require('../../../assets/settingImage/nodata.png')}
            style={{
              width: 80,
              height: 80,
              tintColor: theme.color,
              alignSelf: 'center',
              marginTop: '60%',
            }}
          />
          <Text
            style={{color: theme.color, alignSelf: 'center', paddingTop: 4}}>
            {languagePack.nodata}
          </Text>
        </View>
      )}

      {/* List các khoản thu của tài khoản này ở đây */}
      <View>
        <FlatList
          data={dayBoxes}
          renderItem={({item}) => (
            <DayBox
              dayBoxModel={item}
              navigation={props.navigation}
              currency={currency}
              showFooter={false}
            />
          )}
          keyExtractor={item => item.day.toString()}
        />
      </View>
    </View>
  );
}

export default React.memo(AccountDetail);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },

  navigateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 0.2,
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

  totalColumns: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
    padding: 6,
  },

  column: {
    alignItems: 'center',
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '80%'
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

  addThreeDotsContainer: {
    borderColor: 'rgba(229, 231, 235, 1)',
    padding: 6,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  subView: {

    position: 'absolute',
    width: '30%',
    top: 36,
    right: 0,
    zIndex: 100,
    paddingTop: 4,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    shadowRadius: 10,
},

threeDotsText: {
  // marginStart: 8
  alignSelf: 'center',
  fontSize: 14,
  // fontWeight: "600"
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
  width: '15%',
},

infoText: {
  fontSize: 18,
  width: "20%",
  fontWeight: "500",
  color: 'black',
  borderBottomWidth: 0.4,
  borderBottomColor: 'gray',
  flex: 1,
  marginLeft: "5%",
  padding: 4
},

});
