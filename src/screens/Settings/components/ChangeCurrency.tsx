import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ChangeCurrencyProp } from '../../../navigation/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Currency } from '../../../models/currency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDBConnection, changeAllTransactionsCurrency, changeAllAccountsCurrency } from '../../../services/db-services';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';


function ChangeCurrency(props: ChangeCurrencyProp) {
  const { navigation } = props;

  const [currency, setCurrency] = React.useState<Currency>({} as Currency);
  const currencyList: Currency[] = [
    {
      name: 'VND',
      symbol: '\u20AB',
      fullName: 'Việt Nam Đồng',
    },
    {
      name: 'JPY',
      symbol: '\u00A5',
      fullName: 'Japanese Yen',
    },
    {
      name: 'USD',
      symbol: '\u0024',
      fullName: 'United State Dollar',
    },
    {
      name: 'EURO',
      symbol: '\u20AC',
      fullName: 'Euro',
    },
    {
      name: 'GBP',
      symbol: '\u00A3',
      fullName: 'British Pound',
    }];

  React.useEffect(() => {
    const getCurrencyValue = async () => {
      const value = await AsyncStorage.getItem('currency')
      if (value !== null) {
        setCurrency(JSON.parse(value));
      }
    }
    getCurrencyValue()
  }, []);

  const changeCurrency = async (newCurrency: Currency) => {
    getDBConnection().then(db => {
      changeAllTransactionsCurrency(db, currency.name, newCurrency.name).then(() => {
        changeAllAccountsCurrency(db, currency.name, newCurrency.name).then(() => {
          try {
            AsyncStorage.setItem('currency', JSON.stringify(currency))
            setCurrency(currency);
          } catch (e) {
          }
        })
      })
    })        
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.navigateHeader}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={20}
            color="black"
          />
          <Text style={styles.accountNameTxt}>Change Currency</Text>
        </View>
      </View>

      {/* <View style={styles.currentCurrencyView}>
        <Text style={styles.countryText}>VND - Việt Nam Đồng</Text>
        <Text style={styles.currencyPreviewText}>
            <Currency quantity={1000} currency='VND' pattern="! #,##0.00"/>
        </Text>
      </View> */}

      {/* <FlatList /> */}
      <ScrollView style={styles.currentButtonView}>
        <Text>Để tạm scroll view</Text>
        <FlatList
          data={currencyList}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.currencyButton} onPress={() => changeCurrency(item)}>
              <Text>{item.name} - {item.fullName}</Text>
              <Text>{item.symbol}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.name}
        />
      </ScrollView>

    </View>
  );
}

export default ChangeCurrency;

const styles = StyleSheet.create({
  mainContainer: {},
  navigateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    textAlign: 'center',
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey'
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

  currentCurrencyView: {
    marginTop: 12,
    width: '95%',
    backgroundColor: '#00CCBB',
    padding: 24,
    borderRadius: 12,
    alignSelf: 'center'
  },
  countryText: {
    alignSelf: 'center',
    color: 'white',
    marginBottom: 8,
  },
  currencyPreviewText: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 36,
  },

  currentButtonView: {
    backgroundColor: 'white',
    marginTop: 12,
  },

  currencyButton: {
    flexDirection: 'row',
    padding: 10,
    paddingBottom: 10,
    // borderBottomWidth: 0.19,
    // borderBottomColor: 'grey'
  },

  flagImg: {
    width: 48,
    height: 32,
    marginEnd: 16,
  },

  currencyTextView: {
    flex: 1,
    justifyContent: 'center'
  },
  currencyNameText: {
    fontSize: 16,
  },
  currencyShortNameText: {
    fontSize: 12,
  },

  currencySymbol: {
    alignSelf: 'center'
  }

});
