import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { Account } from '../../../models/account'
import { useEffect } from 'react'
import { getAccountByType, getDBConnection } from '../../../services/db-services'
import { useIsFocused } from '@react-navigation/native'


const AccountGroup = (props: {type: string}) => {

    const [accountList, setAccountList] = useState<Account[]>([]);
    const [total, setTotal] = useState<number>(0);
    const isFocused = useIsFocused();

    useEffect(() => {

        if (!isFocused) return;
        getDBConnection().then((db) => {
            getAccountByType(db, props.type).then((data) => {
                setAccountList(data);
            });
        });

        var total = 0;
        for (let i = 0; i < accountList.length; i++) {
            total += accountList[i].balance;
        }
        setTotal(total);
    }, [isFocused]);

    return (
        <View style={styles.mainContainer}>

            <View style={styles.accountLabel}>
                <Text style={styles.totalElement}>{props.type}</Text>
                {total > 0 ? <Text style={[styles.moneyText, {color: "#7DCEA0"}]}>$ {total}</Text> : <Text style={[styles.moneyText, {color: "#F1948A"}]}>$ {total}</Text>}
            </View>

            {/* list accounts */}

            {accountList.map((account) => {
                return (
                    <TouchableOpacity style={styles.accountButton}>
                        <Text style={styles.accountText}>{account.name}</Text>
                        {account.balance > 0 ? <Text style={[styles.moneyText, {color: "#7DCEA0"}]}>$ {account.balance}</Text> : <Text style={[styles.moneyText, {color: "#7DCEA0"}]}>$ {account.balance}</Text>}
                    </TouchableOpacity>
                )
            }
            )}

        </View>
    )
}

export default AccountGroup

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