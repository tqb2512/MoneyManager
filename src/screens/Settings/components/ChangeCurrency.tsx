import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ChangeCurrencyProp } from '../../../navigation/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckCircleIcon } from 'react-native-heroicons/solid'
import { Currency } from '../../../models/currency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDBConnection, changeAllTransactionsCurrency, changeAllAccountsCurrency } from '../../../services/db-services';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';

function ChangeCurrency(props: ChangeCurrencyProp) {
  const { navigation } = props;
  const theme = useContext(themeContext) as themeInterface
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
      name: 'EUR',
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
          AsyncStorage.setItem('currency', JSON.stringify(newCurrency))
          setCurrency(newCurrency);
        })
      })
    })
  }

  // const changeCurrency = async (newCurrency: Currency) => {
  //   try {
  //     AsyncStorage.setItem('currency', JSON.stringify(newCurrency))
  //     setCurrency(newCurrency);
  //   } catch (e) {
  //   }
  // }

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <View style={[styles.navigateHeader, { backgroundColor: theme.componentBackground }]}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={20}
            color={theme.color}
          />
          <Text style={[styles.accountNameTxt, { color: theme.color }]}>Change Currency</Text>
        </View>
      </View>

      {/* <View style={styles.currentCurrencyView}>
        <Text style={styles.countryText}>VND - Việt Nam Đồng</Text>
        <Text style={styles.currencyPreviewText}>
            <Currency quantity={1000} currency='VND' pattern="! #,##0.00"/>
        </Text>
      </View> */}

      {/* <FlatList /> */}
      <FlatList
        data={currencyList}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.currencyButton, { backgroundColor: theme.componentBackground }]} onPress={() => { changeCurrency(item); console.log(currency) }}>
            <View>
              <Text style={[styles.currencyNameText, { color: theme.color }]}>{item.fullName}</Text>
              <Text style={[styles.currencyShortNameText, { color: theme.color }]}>{item.name}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.currencySymbol, { color: theme.color }]}>{item.symbol}</Text>
              {currency.fullName === item.fullName && (
                <CheckCircleIcon style={{ alignSelf: 'center', marginStart: 12 }} size={20} color='#1056B4' />
              )}
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />

    </View>
  );
}

export default ChangeCurrency;

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

  currentButtonView: {
    backgroundColor: 'white',
    marginTop: 12,
  },

  currencyButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 10,
    paddingVertical: 16,
    paddingEnd: 24,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
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
    fontWeight: '500'
  },
  currencyShortNameText: {
    fontSize: 12,
  },

  currencySymbol: {
    alignSelf: 'center',
    fontWeight: '700',
    fontSize: 16,
  }

});
