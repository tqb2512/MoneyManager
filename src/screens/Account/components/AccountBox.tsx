import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Account } from '../../../models/account';

export default function AccountBox(props: { account: Account; navigation: any; }) {
    const { account, navigation } = props;

    return (
        <TouchableOpacity onPress={() => navigation.navigate('account_detail', { account })}>
            <View style={styles.accountButton}>
                <View style={styles.accountLabel}>
                    <Text style={styles.accountText}>{account.name}</Text>
                    <Text style={account.balance >= 0 ? [styles.moneyText, {color: "#7DCEA0"}] : [styles.moneyText, {color: "#F1948A"}]}>$ {account.balance}</Text>
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
        paddingHorizontal: 16,
    },

    moneyText: {
        color: 'black',
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },

    totalElement: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "600",
        color: 'black'
    },

    accountText: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "500",
        color: 'grey',
    },

    accountButton: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.4)'
    },
})