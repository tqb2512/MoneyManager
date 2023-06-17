import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Pressable, FlatList } from 'react-native';
import { Account } from '../../models/account';
import { AddAccountProp } from '../../navigation/types';
import { ChevronLeftIcon, CheckIcon } from 'react-native-heroicons/outline'

function AddAccount(props: AddAccountProp) {

    const { navigation } = props;
    const [account, setAccount] = React.useState<Account>({} as Account);
    const [showGroup, setShowGroup] = React.useState<boolean>(false);
    const groupList = ["Cash", "Bank", "Credit Card", "Savings", "Loan", "Insurance", "E-Wallet", "Others"];

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View style={styles.navigateHeader}>
            <View style={styles.backButton}>
              <ChevronLeftIcon
                onPress={() => navigation.goBack()}
                size={20}
                color="black"
              />
              <Text style={styles.accountNameTxt}>Add Account</Text>
            </View>
          </View>
            {/* Group */}
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Group</Text>
                <TextInput
                    style={styles.infoText}
                    onPressIn={() => {setShowGroup(!showGroup)}}
                    showSoftInputOnFocus={false}
                    value={account.group}
                    onChangeText={(groupValue) => {
                        setAccount({ ...account, group: groupValue });
                    }}
                    caretHidden={true}
                />
            </View>
            {/* Name account */}
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.infoText}
                    onPressIn={() => { }}
                    onChangeText={(name) => {
                        setAccount({ ...account, name: name });
                    }}
                //  Đưa giá trị vô đây
                />
            </View>
            {/* Amount account */}
            <View style={styles.input}>
                <Text style={styles.inputLabel}>Balance</Text>
                <TextInput
                    style={styles.infoText}
                    onPressIn={() => { }}
                    onChangeText={(amount) => {
                        setAccount({ ...account, balance: Number(amount) });
                    }}
                    keyboardType="number-pad"
                //  Đưa giá trị vô đây
                />
            </View>

            {showGroup && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    // visible={groupIsClicked}
                    onRequestClose={() => {
                        setShowGroup(!showGroup);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View
                                style={{
                                    paddingBottom: 4,
                                    borderBottomColor: 'grba(0,0,0,0.1)',
                                    borderBottomWidth: 0.2,
                                }}>
                                <Text style={styles.textHeaderStyle}>Account Group</Text>
                            </View>
                            {/* Pressable cho giá trị của group */}
                            <Pressable style={[styles.button]}>
                                <FlatList
                                    data={groupList}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={styles.accountGroupButton}
                                            onPress={() => {
                                                setAccount({ ...account, group: item });
                                                setShowGroup(false);
                                            }}>
                                            
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={[styles.accountGroupText, { color: item === account.group ? '#DD2F24' : 'grey', fontWeight: item === account.group ? '600' : '400' }]}>{item}</Text>
                                                { item === account.group && <CheckIcon style={{ paddingLeft: '12 %' }} size={18} color='#DD2F24' />  }
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                    keyExtractor={(item) => item}
                                />
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Nút save account */}
            <TouchableOpacity
                style={styles.saveButton}
                onPress={() => {}}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    navigateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 12,
        textAlign: 'center',
        marginBottom: 4,
      },
    
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    
      accountNameTxt: {
        marginLeft: 24,
        fontSize: 18,
        color: 'black',
      },

      input: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        margin: 2,
        marginBottom: 16
      },
      inputLabel: {
        marginRight: 16,
        width: '15%',
      },
    

    saveButtonText: {
        fontSize: 18,
        fontWeight: "500",
        color: 'white',
    },

    blurLayout: {
        // backgroundColor: 'rgba(0,0,0, 0.3)',
        // position: 'absolute',
        // flex: 1,
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 2,
        // padding: 4,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        height: '60%',
        width: '88%',
    },
    button: {
        elevation: 2,
    },

    textHeaderStyle: {
        color: 'black',
        fontWeight: 'bold',
        padding: 15,
        // textAlign: 'center',
    },

    infoText: {
        fontSize: 18,
        width: "20%",
        fontWeight: "500",
        color: 'black',
        borderBottomWidth: 0.4,
        borderBottomColor: 'gray',
        flex: 1,
        marginLeft: "5%",
        padding: 4
    },

    saveButton: {
        backgroundColor: '#46CDCF',
        borderRadius: 4,
        padding: 10,
        width: '90%',
        marginTop: 48,
        alignItems: 'center',
        alignSelf: 'center',
    },

    accountGroupText: {
        marginStart: '6%'
    },

    accountGroupButton: {
        paddingVertical: '4.3%',
        borderTopWidth: 0.18,
        borderBottomWidth: 0.18,
    }
});

export default React.memo(AddAccount);