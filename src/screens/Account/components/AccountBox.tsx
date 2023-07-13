import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Account } from '../../../models/account';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { Currency } from '../../../models/currency';
import { NumericFormat } from 'react-number-format';


export default function AccountBox(props: { account: Account; navigation: any; currency: Currency; }) {
    const { account, navigation } = props;

    const theme = useContext(themeContext) as themeInterface

    return (
        <TouchableOpacity onPress={() => navigation.navigate('account_detail', { account })}>
            <View style={[styles.accountButton, { backgroundColor: theme.componentBackground }]}>
                <View style={styles.accountLabel}>
                    <Text  numberOfLines={1} ellipsizeMode='tail' style={[styles.accountText, { color: theme.mode === 'dark' ? theme.color : 'grey', width: '85%' }]}>{account.name}</Text>
                </View>
                <View style={styles.moneyLabel}>
                    <NumericFormat
                        value={account.balance}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={props.currency.symbol + ' '}
                        renderText={value => <Text style={account.balance >= 0 ? [styles.moneyText, { color: "#7DCEA0" }] : [styles.moneyText, { color: "#F1948A" }]}>{value}</Text>}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 16
    },

    accountLabel: {
        marginBottom: 4,
        marginLeft: "3%",
        //from right to left
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    moneyLabel: {
        marginBottom: 4,
        marginLeft: "3%",
        //from left to right
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
        padding: "3.5%",
        borderBottomWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.6)'
    },

})