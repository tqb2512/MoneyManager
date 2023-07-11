import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import DayBox from './components/DayBox';
import { DayBox as DayBoxModel } from '../../../models/dayBox';
import { Currency } from '../../../models/currency';
import { DailyScreenProp } from '../../../navigation/types';
import { NativeBaseProvider } from 'native-base';
import {
  getDBConnection,
  getDayBoxFromMonthYear,
  createTables,
  dropTables,
  importTestData,
  changeAllTransactionsCurrency,
} from '../../../services/db-services';

import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import CalendarButton from '../CalendarButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../../../models/language';
import vi from '../../../config/language/vi';
import en from '../../../config/language/en';

function DailyScreen(props: DailyScreenProp) {

  const theme = useContext(themeContext) as themeInterface
  const { navigation } = props;
  const [date, setDate] = React.useState<Date>(new Date());
  const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);
  const [currency, setCurrency] = React.useState<Currency>({} as Currency);
  const [totalIncome, setTotalIncome] = React.useState<number>(0);
  const [totalExpense, setTotalExpense] = React.useState<number>(0);
  const [total, setTotal] = React.useState<number>(0);
  const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      getDBConnection().then(db => {
        getDayBoxFromMonthYear(db, date.getMonth() + 1, date.getFullYear()).then(dayBoxes => {
          setDayBoxes(dayBoxes);
          let tempTotalIncome = 0;
          let tempTotalExpense = 0;
          for (let i = 0; i < dayBoxes.length; i++) {
            tempTotalIncome += dayBoxes[i].totalIncome;
            tempTotalExpense += dayBoxes[i].totalExpense;
          }
          setTotalIncome(tempTotalIncome);
          setTotalExpense(tempTotalExpense);
        });
      });

      const getCurrencyValue = async () => {
        const value = await AsyncStorage.getItem('currency')
        if (value !== null) {
          setCurrency(JSON.parse(value));
        }
      }
      getCurrencyValue()

      const getLanguageValue = async () => {
        const value = await AsyncStorage.getItem('language')
        if (value !== null) {
          if (value === 'en') {
            setLanguagePack(en)
          } else {
            setLanguagePack(vi)
          }
          navigation.setOptions({
            title: languagePack.daily
          })
        }
      }
      getLanguageValue()
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    setTotal(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  useEffect(() => {
    getDBConnection().then(db => {
      getDayBoxFromMonthYear(db, date.getMonth() + 1, date.getFullYear()).then(dayBoxes => {
        setDayBoxes(dayBoxes);
      });
    });
  }, [date]);


  return (
    <NativeBaseProvider>
      <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }]}>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('add_transaction')}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Income, expense, total, bar */}
        <View
          style={[
            styles.secondTopBar,
            {
              backgroundColor: theme.background,
              borderColor:
                theme.mode === 'dark' ? 'white' : 'rgba(229, 231, 235, 0.4)',
            },
          ]}>
          <View style={styles.totalCalc}>
            <Text style={[styles.totalElement, { color: theme.color }]}>
              {languagePack.income}
            </Text>
            <Text
              style={{
                color: '#7DCEA0',
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: '500',
              }}>
              {currency.symbol} {totalIncome}
            </Text>
          </View>
          <View style={styles.totalCalc}>
            <Text style={[styles.totalElement, { color: theme.color }]}>
              {languagePack.expense}
            </Text>
            <Text
              style={{
                color: '#F1948A',
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: '500',
              }}>
              {currency.symbol} {totalExpense}
            </Text>
          </View>
          <View style={styles.totalCalc}>
            <Text style={[styles.totalElement, { color: theme.color }]}>{languagePack.total}</Text>
            <Text
              style={[{
                alignSelf: 'center',
                fontSize: 14,
                fontWeight: '500',
              }, total >= 0 ? { color: "#7DCEA0" } : { color: "#F1948A" }]}>
              {currency.symbol} {total.toFixed(2)}
            </Text>
          </View>
        </View>
        {/* Show list view chi tiêt schi tiêu ngày */}
        <View>
          <FlatList
            data={dayBoxes}
            renderItem={({ item, index }) => (
              <View>
                <DayBox dayBoxModel={item} navigation={props.navigation} currency={currency} />
                {index === dayBoxes.length - 1 ?
                  (<View style={styles.footerView}>
                    <Text>  </Text>
                  </View>)
                  : null}
              </View>
            )}
            keyExtractor={item => item.day.toString()}
          />
        </View>
        <CalendarButton date={date} setDate={setDate} />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    position: 'relative',
    flex: 1
  },

  secondTopBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 10,
    // paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.4)',
  },

  totalCalc: {
    justifyContent: 'center',
    width: 100,
  },

  totalElement: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: "500",
  },

  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  addButtonContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 16,
    marginBottom: 16,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
  },

  addButton: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 2,
    borderRadius: 100,
    backgroundColor: '#2196f3',
  },

  footerView: {
    height: 75,
    width: '100%',
  }
});

export default React.memo(DailyScreen);
