import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AccountDetailProp } from '../../navigation/types';
import { ChevronLeftIcon, PencilIcon } from 'react-native-heroicons/outline'
import { getDBConnection, getDayBoxByAccount } from '../../services/db-services';
import { DayBox as DayBoxModel } from '../../models/dayBox';
import DayBox from '../Home/Daily/components/DayBox';
import { Currency } from '../../models/currency';
import themeContext from '../../config/themeContext';
import { themeInterface } from '../../config/themeInterface';
import AsyncStorage from '@react-native-async-storage/async-storage';


function AccountDetail(props: AccountDetailProp) {

    const theme = useContext(themeContext) as themeInterface

    const { navigation } = props;

    const [currency, setCurrency] = React.useState<Currency>({} as Currency);
    const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDBConnection().then(db => {
                getDayBoxByAccount(db, props.route.params.account).then(dayBoxes => {
                    setDayBoxes(dayBoxes);
                });
            });
        });

        const getCurrencyValue = async () => {
            const value = await AsyncStorage.getItem('currency')
            if (value !== null) {
              setCurrency(JSON.parse(value));
            }
          }
        getCurrencyValue()
        return unsubscribe;
    }, [navigation]);

    return (
        <View style = {[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '' }]}>
            <View style={[styles.navigateHeader, { backgroundColor: theme.componentBackground, borderBottomColor: theme.color }]}>
                <View style={styles.backButton}>
                    <ChevronLeftIcon onPress={() => navigation.goBack()} size={20} color= {theme.color} />
                    <Text style={[styles.accountNameTxt, { color: theme.color }]}>{props.route.params.account.name}</Text>
                </View>
                <PencilIcon onPress={() => { navigation.navigate("edit_account", { account: props.route.params.account }) }} size={20} color= {theme.color} />
            </View>

            <View style={[styles.totalColumns, { backgroundColor: theme.componentBackground }]}>
                <View style={[styles.column]}>
                    <Text style={{ color: theme.color }}>Deposit</Text>
                    <Text style={{ color: 'green' }}>0.00</Text>
                </View>

                <View style={styles.column}>
                    <Text style={{ color: theme.color }}>Withdrawal</Text>
                    <Text style={{ color: 'red' }}>0.00</Text>
                </View>

                <View style={styles.column}>
                    <Text style={{ color: theme.color }}>Total</Text>
                    <Text style={{ color: '#D9D9D9' }}>0.00</Text>
                </View>

                <View style={styles.column}>
                    <Text style={{ color: theme.color }}>Balance</Text>
                    <Text style={{ color: '#00C4CC' }}>{props.route.params.account.balance}</Text>
                </View>
            </View>

            {/* List các khoản thu của tài khoản này ở đây */}
            <View>
                <FlatList
                    data={dayBoxes}
                    renderItem={({ item }) => (
                        <DayBox dayBoxModel={item} navigation={props.navigation} currency ={currency}/>
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