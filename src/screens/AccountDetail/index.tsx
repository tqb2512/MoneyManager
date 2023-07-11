import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AccountDetailProp } from '../../navigation/types';
import { ChevronLeftIcon, PencilIcon } from 'react-native-heroicons/outline'
import { getAccounts, getDBConnection, getDayBoxByAccount } from '../../services/db-services';
import { DayBox as DayBoxModel } from '../../models/dayBox';
import DayBox from '../Home/Daily/components/DayBox';
import { Currency } from '../../models/currency';
import themeContext from '../../config/themeContext';
import { themeInterface } from '../../config/themeInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Account } from '../../models/account';
import { Language } from '../../models/language';
import vi from '../../config/language/vi';
import en from '../../config/language/en';


function AccountDetail(props: AccountDetailProp) {

    const theme = useContext(themeContext) as themeInterface

    const { navigation } = props;

    const [account, setAccount] = React.useState<Account>(props.route.params.account);
    const [currency, setCurrency] = React.useState<Currency>({} as Currency);
    const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);
    const [totalIncome, setTotalIncome] = React.useState<number>(0);
    const [totalExpense, setTotalExpense] = React.useState<number>(0);
    const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDBConnection().then(db => {
                getDayBoxByAccount(db, props.route.params.account).then(dayBoxes => {
                    setDayBoxes(dayBoxes);
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



    return (
        <View style={[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '' }]}>
            <View style={[styles.navigateHeader, { backgroundColor: theme.componentBackground, borderBottomColor: theme.color }]}>
                <View style={styles.backButton}>
                    <ChevronLeftIcon onPress={() => navigation.goBack()} size={20} color={theme.color} />
                    <Text style={[styles.accountNameTxt, { color: theme.color }]}>{props.route.params.account.name}</Text>
                </View>
                <PencilIcon onPress={() => { navigation.navigate("edit_account", { account: props.route.params.account }) }} size={20} color={theme.color} />
            </View>

            <View style={[styles.totalColumns, { backgroundColor: theme.componentBackground }]}>
                <View style={[styles.column]}>
                    <Text style={{ color: theme.color }}>{languagePack.income}</Text>
                    <Text style={{ color: '#7DCEA0' }}>{currency.symbol} {totalIncome}</Text>
                </View>

                <View style={styles.column}>
                    <Text style={{ color: theme.color }}>{languagePack.expense}</Text>
                    <Text style={{ color: '#F1948A' }}>{currency.symbol} {totalExpense}</Text>
                </View>

                <View style={styles.column}>
                    <Text style={{ color: theme.color }}>{languagePack.balance}</Text>
                    <Text style={account.balance >= 0 ? { color: "#7DCEA0" } : { color: "#F1948A" }}>{currency.symbol} {account.balance}</Text>
                </View>
            </View>

            {/* List các khoản thu của tài khoản này ở đây */}
            <View>
                <FlatList
                    data={dayBoxes}
                    renderItem={({ item }) => (
                        <DayBox dayBoxModel={item} navigation={props.navigation} currency={currency} />
                    )}
                    keyExtractor={item => item.day.toString()}
                />
            </View>

        </View>
    )
}

export default React.memo(AccountDetail);

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
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
        alignItems: 'center'
    },

    accountNameTxt: {
        marginLeft: 24,
        fontSize: 18,
        color: 'black',
    },

    totalColumns: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'white',
        padding: 6,
    },

    column: {
        alignItems: 'center'
    }
})