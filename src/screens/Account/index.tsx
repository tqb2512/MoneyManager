import React, { useContext, useEffect } from 'react';
import { AccountsScreenProp } from '../../navigation/types';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, FlatList, Image, Modal, TextInput, Alert } from 'react-native';
import { NativeBaseProvider, ThreeDotsIcon } from 'native-base';
import { getDBConnection, getAccounts, insertAccount } from '../../services/db-services';
import { Account } from '../../models/account';
import AccountBox from './components/AccountBox';

import themeContext from '../../config/themeContext';
import { themeInterface } from '../../config/themeInterface';
import { Currency } from '../../models/currency';
import { Language } from '../../models/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vi from '../../config/language/vi';
import en from '../../config/language/en';
import { Pressable } from 'react-native';
import { XMarkIcon } from 'react-native-heroicons/outline';


function AccountsScreen(props: AccountsScreenProp) {

    const { navigation } = props;

    const theme = useContext(themeContext) as themeInterface

    const [menuShow, setMenuShow] = React.useState(false);
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [currency, setCurrency] = React.useState<Currency>({} as Currency);
    const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);
    const [showAddAccount, setShowAddAccount] = React.useState(false);
    const [account, setAccount] = React.useState<Account>({ balance: 0 } as Account);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setMenuShow(false)
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
                    if (value === 'vi') {
                        setLanguagePack(vi);
                    } else {
                        setLanguagePack(en);
                    }
                }
            }
            getLanguageValue()
        });
        return unsubscribe;
    }, [navigation]);

    const saveAccount = () => {
      if (account.name === undefined || account.name === '') {
        Alert.alert(languagePack.alert, languagePack.accountNameEmpty);
        return;
      }
        getDBConnection().then(db => {
            insertAccount(db, account).then(() => {
            });
        });
    }

    React.useEffect(() => {
        props.navigation.setOptions({
            title: languagePack.account,
        });

        const unsubscribe = navigation.addListener('focus', () => {
            getDBConnection().then(db => {
                getAccounts(db).then(accounts => {
                    setAccounts(accounts);
                });
            });
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getDBConnection().then(db => {
            getAccounts(db).then(accounts => {
                setAccounts(accounts);
            });
        });
    }, [showAddAccount]);

    return (
      <NativeBaseProvider>
        <SafeAreaView
          style={[
            styles.mainContainer,
            {
              backgroundColor:
                theme.mode === 'dark' ? theme.background : '#f2f2f2',
            },
          ]}>
          <View style={{position: 'relative'}}>
            <View
              style={[styles.firstTopBar, {backgroundColor: theme.background}]}>
              <View style={styles.titleHeader}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: theme.color,
                    textAlign: 'center',
                  }}>
                  {languagePack.account}
                </Text>
              </View>
              <View style={styles.threeDots}>
                <TouchableOpacity
                  onPress={() => {
                    setMenuShow(!menuShow);
                  }}
                  style={{alignItems: 'center', padding: 4}}>
                  <ThreeDotsIcon size="4" mt="0.5" color="#7A7986" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* No data view */}
          {accounts.length <= 0 && (
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
                style={{
                  color: theme.color,
                  alignSelf: 'center',
                  paddingTop: 4,
                }}>
                {languagePack.nodata}
              </Text>
            </View>
          )}

          {/* List account */}

          <FlatList
            data={accounts}
            renderItem={({item}) => (
              <AccountBox
                account={item}
                navigation={navigation}
                currency={currency}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />

          {/* Show Add, edit account, ....... */}
          {menuShow && (
            <View style={[styles.subView, {backgroundColor: theme.background}]}>
              <TouchableOpacity
                style={styles.addThreeDotsContainer}
                onPress={() => {
                  setMenuShow(false);
                  setShowAddAccount(true);
                }}>
                <Text style={[styles.threeDotsText, {color: theme.color}]}>
                  {languagePack.add}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {showAddAccount && (
            <Modal
              animationType="fade"
              transparent={true}
              visible={showAddAccount}
              onRequestClose={() => {
                setShowAddAccount(false);
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
                      backgroundColor:
                        theme.mode === 'dark' ? '#7d7f84' : 'black',
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
                      {languagePack.addAccount}
                    </Text>
                    {/* Close icon */}
                    <View style={{right: 4}}>
                      <XMarkIcon
                        color="white"
                        style={{marginEnd: 0}}
                        onPress={() => {
                          setShowAddAccount(false);
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
                        onChangeText={(name) => {
                            setAccount({ ...account, name: name });
                        }}
                      />
                    </View>

                    <TouchableOpacity
                      style={[
                        styles.saveButton,
                        {backgroundColor: '#2196f3', marginBottom: 16},
                      ]}
                      onPress={() => {saveAccount(); setShowAddAccount(false)}}>
                      <Text style={{fontWeight: '600', color: 'white'}}>
                        {languagePack.save}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          )}
        </SafeAreaView>
      </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    firstTopBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 8,
        paddingTop: 4,
        paddingBottom: 8,
    },
    titleHeader: {
        width: "80%"
    },
    threeDots: {
        width: "10%"
    },
    secondTopBar: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingTop: 10,
        paddingBottom: 10,
        // paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.4)',
    },

    totalCalc: {
        justifyContent: 'center',
        width: 100,
    },

    totalElement: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: "500",
    },

    threeDotsText: {
        // marginStart: 8
        alignSelf: 'center',
        fontSize: 14,
        // fontWeight: "600"
    },

    viewShow: {
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.4)',
    },

    subView: {

        position: 'absolute',
        width: '30%',
        top: 30,
        right: 0,
        zIndex: 100,
        paddingTop: 4,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 1)',
        shadowRadius: 10,
    },

    deleteThreeDotsContainer: {
        borderColor: 'rgba(229, 231, 235, 1)',
        padding: 8,
    },
    addThreeDotsContainer: {
        borderColor: 'rgba(229, 231, 235, 1)',
        padding: 6,
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
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
      saveButton: {
        backgroundColor: '#46CDCF',
        borderRadius: 4,
        padding: 10,
        width: '90%',
        marginTop: 24,
        alignItems: 'center',
        alignSelf: 'center',
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

export default React.memo(AccountsScreen);