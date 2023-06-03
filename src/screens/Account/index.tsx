import React from 'react';
import { AccountsScreenProp } from '../../navigation/types';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet, FlatList } from 'react-native';
import { NativeBaseProvider, ThreeDotsIcon } from 'native-base';
import { getDBConnection, getAccounts } from '../../services/db-services';
import { Account } from '../../models/account';
import AccountBox from './components/AccountBox';



function AccountsScreen(props: AccountsScreenProp) {

    const { navigation } = props;

    const [menuShow, setMenuShow] = React.useState(false);
    const [accounts, setAccounts] = React.useState<Account[]>([]);

    React.useEffect(() => {
        props.navigation.setOptions({
            title: 'Accounts',
        });

        getDBConnection().then(db => {
            getAccounts(db).then(accounts => {
                setAccounts(accounts);
            });
        });
    });

    return (
        <NativeBaseProvider>
            <SafeAreaView style={styles.mainContainer}>
                <View style={{ position: 'relative' }}>
                    <View style={styles.firstTopBar}>
                        <View style={styles.titleHeader}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey', textAlign: 'center' }}>Accounts</Text>
                        </View>
                        <View style={styles.threeDots}>
                            <TouchableOpacity
                                onPress={() => { setMenuShow(!menuShow) }}
                                style={{ alignItems: 'center', padding: 4 }}>
                                <ThreeDotsIcon size="4" mt="0.5" color="#7A7986" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.secondTopBar}>
                        <View style={styles.totalCalc}>
                            <Text style={styles.totalElement}>Assets</Text>
                            <Text style={{ color: '#7DCEA0', alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>
                                $ 35.00
                            </Text>
                        </View>
                        <View style={styles.totalCalc}>
                            <Text style={styles.totalElement}>Liabilities</Text>
                            <Text style={{ color: '#F1948A', alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>
                                $ 35.00
                            </Text>
                        </View>
                        <View style={styles.totalCalc}>
                            <Text style={styles.totalElement}>Total</Text>
                            <Text style={{ color: 'grey', alignSelf: 'center', fontSize: 20, fontWeight: 'bold' }}>
                                $ 35.00
                            </Text>
                        </View>
                    </View>
                </View>
                {/* List account */}

                
                
                <FlatList
                    data={accounts}
                    renderItem={({ item }) => <AccountBox account={item} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                />

                {/* Show Add, edit account, ....... */}
                {menuShow && (
                    <View style={styles.subView}>
                        <TouchableOpacity
                            style={styles.addThreeDotsContainer}
                            onPress={() => { navigation.navigate("add_account")}}>
                            <Text style={styles.threeDotsText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
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
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.4)',
    },

    totalCalc: {
        justifyContent: 'center',
        width: 100,
    },

    totalElement: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "600",
    },

    threeDotsText: {
        alignSelf: 'center',
        fontSize: 18,
        fontWeight: "600"
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
        backgroundColor: 'white',
        position: 'absolute',
        width: '30%',
        top: 30,
        right: 0,
        zIndex: 100,
        paddingTop: 4,
        paddingBottom: 4,
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
        borderBottomWidth: 0.4,
        padding: 8,
    },
});

export default React.memo(AccountsScreen);