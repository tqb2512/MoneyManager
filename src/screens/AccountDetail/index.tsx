import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AccountDetailProp } from '../../navigation/types';
import { ChevronLeftIcon, PencilIcon } from 'react-native-heroicons/outline'

function AccountDetail (props: AccountDetailProp) {

    const { navigation } = props;

    return (
        <View>
            <View style={styles.navigateHeader}>
                <View style={styles.backButton}> 
                    <ChevronLeftIcon onPress={() => navigation.goBack()} size={20} color='black' />
                    <Text style={styles.accountNameTxt}>{props.route.params.account.name}</Text>
                </View>
                <PencilIcon onPress={() => { navigation.navigate("edit_account", { account: props.route.params.account }) }} size={20} color='black' />
            </View>

            <View style= {styles.totalColumns}>
                <View style={styles.column}>
                    <Text>Deposit</Text>
                    <Text style={{ color: 'green' }}>0.00</Text>
                </View>

                <View style={styles.column}>
                    <Text>Withdrawal</Text>
                    <Text style={{ color: 'red' }}>0.00</Text>
                </View>

                <View style={styles.column}>
                    <Text>Total</Text>
                    <Text style={{ color: 'black' }}>0.00</Text>
                </View>

                <View style={styles.column}>
                    <Text>Balance</Text>
                    <Text style={{ color: 'blue' }}>0.00</Text>
                </View>
            </View>

            {/* List các khoản thu của tài khoản này ở đây */}
            <Text>List các khoản thu của tài khoản này ở đây</Text>
        </View>
    )
}

export default React.memo(AccountDetail);

const styles = StyleSheet.create ({
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