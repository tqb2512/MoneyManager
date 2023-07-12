import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React, { useContext } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { DataProp } from '../../../navigation/types';
import { getDBConnection, getAccounts, getTransactions, insertAccounts, insertTransactions, dropTransactionsAndAccounts, createTables, consoleLogDB } from '../../../services/db-services';
import { Account } from '../../../models/account';
import { Transaction } from '../../../models/transaction';
import { useState } from 'react';
import DocumentPicker from 'react-native-document-picker'
import RNFS from 'react-native-fs';


const Data = (props: DataProp) => {
  const { navigation } = props;
  const theme = useContext(themeContext) as themeInterface;
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showFolderDialog, setShowFolderDialog] = useState(false);

  const exportToJson = async () => {
    getDBConnection().then(db => {
      getAccounts(db).then(accounts => {
        setAccounts(accounts);
        getTransactions(db).then(transactions => {
          setTransactions(transactions);

          const path = RNFS.ExternalStorageDirectoryPath + '/MoneyManager';
          RNFS.mkdir(path).then(() => {
            const filetPath = path + '/backup.json';
            const data = {
              accounts: accounts,
              transactions: transactions,
            };
            RNFS.writeFile(filetPath, JSON.stringify(data), 'utf8').then(() => {
              Alert.alert('Success', 'Exported to ' + filetPath);
            }).catch((err) => {
              console.log(err);
            });
          });
        });
      });

    });

  }

  const importFromJson = async () => {
    DocumentPicker.pick({
      type: [DocumentPicker.types.allFiles],
    }).then((result) => {
      const path = result[0].uri;
      RNFS.readFile(path, 'utf8').then((data) => {
        const jsonData = JSON.parse(data);
        getDBConnection().then(db => {
          insertAccounts(db, jsonData.accounts).then(() => {
            insertTransactions(db, jsonData.transactions).then(() => {
              console.log('inserted');
            });
          });
        });
      });
    }).catch((err) => {
      if (DocumentPicker.isCancel(err)) {
        console.log('cancelled');
      } else {
        console.log(err);
      }
    });
  }

  const deleteAllData = async () => {
    Alert.alert('Delete All Data', 'Are you sure you want to delete all data?', [
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: () => {
          getDBConnection().then(db => {
            consoleLogDB(db);
          });
        }
      },
      {
        text: 'Delete',
        onPress: () => {
          getDBConnection().then(db => {
            dropTransactionsAndAccounts(db).then(() => {
              createTables(db).then(() => {
                console.log('deleted');
              });
            });
          });
        },
      },
    ]);
  }


  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' },
      ]}>
      <View
        style={[
          styles.navigateHeader,
          { backgroundColor: theme.componentBackground },
        ]}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={20}
            color={theme.color}
          />
          <Text style={[styles.accountNameTxt, { color: theme.color }]}>
            Data
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            importFromJson();
          }}>
          <Image
            style={[styles.img, { tintColor: theme.color }]}
            source={require('../../../../assets/settingImage/file-import.png')}
          />
          <Text style={{ color: theme.color, fontSize: 18, fontWeight: '500' }}>Import Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            exportToJson();
          }}>
          <Image
            style={[styles.img, { tintColor: theme.color }]}
            source={require('../../../../assets/settingImage/file-export.png')}
          />
          <Text style={{ color: theme.color, fontSize: 18, fontWeight: '500', }}>Export Data</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            deleteAllData();
          }}>
          <Image
            style={[styles.img, { tintColor: theme.color }]}
            source={require('../../../../assets/settingImage/trash.png')}
          />
          <Text style={{ color: theme.color, fontSize: 18, fontWeight: '500' }}>Delete Data</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Data;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  navigateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  accountNameTxt: {
    marginLeft: 24,
    fontSize: 18,
    color: 'black',
    fontWeight: '600',
  },

  buttonContainer: {
    flexDirection: 'column',
    // paddingTop: '2%',
    // paddingHorizontal: '5%',
    justifyContent: 'center',
  },

  button: {
    padding: 20,
    width: '49%',
    height:'31%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },

  img: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
});
