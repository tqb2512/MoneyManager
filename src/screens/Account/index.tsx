import React, { useContext, useEffect } from 'react';
import { AccountsScreenProp } from '../../navigation/types';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { NativeBaseProvider, ThreeDotsIcon } from 'native-base';
import { getDBConnection, getAccounts } from '../../services/db-services';
import { Account } from '../../models/account';
import AccountBox from './components/AccountBox';

import themeContext from '../../config/themeContext';
import { themeInterface } from '../../config/themeInterface';
import { Currency } from '../../models/currency';
import { Language } from '../../models/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import vi from '../../config/language/vi';
import en from '../../config/language/en';


function AccountsScreen(props: AccountsScreenProp) {

    const { navigation } = props;

    const theme = useContext(themeContext) as themeInterface

    const [menuShow, setMenuShow] = React.useState(false);
    const [accounts, setAccounts] = React.useState<Account[]>([]);
    const [currency, setCurrency] = React.useState<Currency>({} as Currency);
    const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
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

    return (
        <NativeBaseProvider>
            <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }]}>
                <View style={{ position: 'relative' }}>
                    <View style={[styles.firstTopBar, { backgroundColor: theme.background }]}>
                        <View style={styles.titleHeader}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.color, textAlign: 'center' }}>
                                {languagePack.account}
                            </Text>
                        </View>
                        <View style={styles.threeDots}>
                            <TouchableOpacity
                                onPress={() => { setMenuShow(!menuShow) }}
                                style={{ alignItems: 'center', padding: 4 }}>
                                <ThreeDotsIcon size="4" mt="0.5" color="#7A7986" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {/* List account */}

                <FlatList
                    data={accounts}
                    renderItem={({ item }) => <AccountBox account={item} navigation={navigation} currency={currency} />}
                    keyExtractor={item => item.id.toString()}
                />

                {/* Show Add, edit account, ....... */}
                {menuShow && (
                    <View style={[styles.subView, { backgroundColor: theme.background }]}>
                        <TouchableOpacity
                            style={styles.addThreeDotsContainer}
                            onPress={() => { navigation.navigate("add_account"); setMenuShow(false) }}>
                            <Text style={[styles.threeDotsText, { color: theme.color }]}>{languagePack.add}</Text>
                        </TouchableOpacity>
                    </View>
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
        padding: 8,
    },
});

export default React.memo(AccountsScreen);