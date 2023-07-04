import React, {useContext} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Account } from '../../../models/account';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { Currency } from '../../../models/currency';


export default function AccountBox(props: { account: Account; navigation: any; currency: Currency }) {
    const { account, navigation } = props;

    const theme = useContext(themeContext) as themeInterface

    return (
        <TouchableOpacity onPress={() => navigation.navigate('account_detail', { account })}>
            <View style={[styles.accountButton,  { backgroundColor: theme.componentBackground }]}>
                <View style={styles.accountLabel}>
                    <Text style={[styles.accountText, { color: theme.mode === 'dark' ? theme.color : 'grey' }]}>{account.name}</Text>
                </View>
                <View style={styles.moneyLabel}>
                    <Text style={account.balance >= 0 ? [styles.moneyText, {color: "#7DCEA0"}] : [styles.moneyText, {color: "#F1948A"}]}>{props.currency.symbol} {account.balance}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

/* #7DCEA0 - green, #F1948A - red */

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 16
    },

    accountLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        marginLeft: "3%",
    },
    moneyLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        marginRight: "3%",
    },

    moneyText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: '500',
    },

    totalElement: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "600",
        color: 'black'
    },

    accountText: {
        alignSelf: 'center',
        fontSize: 14,
        // fontWeight: "500",
        color: 'black',
    },

    accountButton: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: "3.5%",
        borderBottomWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.6)'
    },

})