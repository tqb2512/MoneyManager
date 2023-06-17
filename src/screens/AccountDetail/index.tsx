import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AccountDetailProp } from '../../navigation/types';
import { ChevronLeftIcon, PencilIcon } from 'react-native-heroicons/outline'
import { getDBConnection, getDayBoxByAccount } from '../../services/db-services';
import { DayBox as DayBoxModel } from '../../models/dayBox';
import DayBox from '../Home/Daily/components/DayBox';

function AccountDetail(props: AccountDetailProp) {

    const { navigation } = props;

    const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDBConnection().then(db => {
                getDayBoxByAccount(db, props.route.params.account).then(dayBoxes => {
                    setDayBoxes(dayBoxes);
                });
            });
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <View>
            <View style={styles.navigateHeader}>
                <View style={styles.backButton}>
                    <ChevronLeftIcon onPress={() => navigation.goBack()} size={20} color='black' />
                    <Text style={styles.accountNameTxt}>{props.route.params.account.name}</Text>
                </View>
                <PencilIcon onPress={() => { navigation.navigate("edit_account", { account: props.route.params.account }) }} size={20} color='black' />
            </View>

            <View style={styles.totalColumns}>
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
                    <Text style={{ color: 'blue' }}>{props.route.params.account.balance}</Text>
                </View>
            </View>

            {/* List các khoản thu của tài khoản này ở đây */}
            <View>
                <FlatList
                    data={dayBoxes}
                    renderItem={({ item }) => (
                        <DayBox dayBoxModel={item} navigation={props.navigation} />
                    )}
                    keyExtractor={item => item.day.toString()}
                />
            </View>

        </View>
    )
}

export default React.memo(AccountDetail);

const styles = StyleSheet.create({
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