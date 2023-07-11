import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useContext } from 'react';
import DayInfo from './DayInfo';
import { DayBox as DayBoxModel } from '../../../../models/dayBox';

import themeContext from '../../../../config/themeContext';
import { themeInterface } from '../../../../config/themeInterface';
import { Currency } from '../../../../models/currency';
import { Language } from '../../../../models/language';
import vi from '../../../../config/language/vi';
import en from '../../../../config/language/en';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

function DayBox(props: { dayBoxModel: DayBoxModel, navigation: any, currency: Currency }) {

  const theme = useContext(themeContext) as themeInterface
  const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);
  const { navigation } = props;

  const getDayOfWeek = () => {
    const dayOfWeek = new Date(
      props.dayBoxModel.year,
      props.dayBoxModel.month - 1,
      props.dayBoxModel.day,
    ).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
        languagePack.sun,
        languagePack.mon,
        languagePack.tue,
        languagePack.wed,
        languagePack.thu,
        languagePack.fri,
        languagePack.sat,
      ][dayOfWeek];
  };

  useEffect(() => {
    const getLanguagePack = async () => {
      const value = await AsyncStorage.getItem('language');
      if (value !== null) {
        if (value === 'vi') {
          setLanguagePack(vi);
        } else if (value === 'en') {
          setLanguagePack(en);
        }
      }
    };
    getLanguagePack();
  }, []);

  return (
    <View style={styles.mainContainer}>
      {/* Hiện ngày tháng năm, tiền thu chi */}
      <View style={[styles.header, { backgroundColor: theme.componentBackground }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <View style={{ width: "25%", alignItems: "center" }}>
            <Text style={[styles.date, { color: theme.color }]}>{props.dayBoxModel.day}</Text>
          </View>
          <View style={styles.monthYear}>
            <Text style={{ fontWeight: '600', color: theme.color }}>{getDayOfWeek()}</Text>
            <Text style={[styles.month, { color: theme.color }]}>{props.dayBoxModel.month}/{props.dayBoxModel.year}</Text>
          </View>
        </View>
        <View style={styles.inContainer}>
          <Text
            style={[styles.inText, {
              fontSize: props.dayBoxModel.totalIncome.toString().length > 8 ? 14 : 19,
            }]}
          >{props.currency.symbol} {props.dayBoxModel.totalIncome}</Text>
        </View>
        <View style={styles.outContainer}>
          <Text style={[styles.outText, {
            fontSize: props.dayBoxModel.totalExpense.toString().length > 8 ? 14 : 19,
          }]}>{props.currency.symbol} {props.dayBoxModel.totalExpense}</Text>
        </View>

      </View>
      {/* Danh sách khoản thu chi */}
      <FlatList
        data={props.dayBoxModel.transactions}
        renderItem={({ item }) => <DayInfo transaction={item} navigation={navigation} currency={props.currency} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default React.memo(DayBox);

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 12,
  },

  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 8,
    borderLeftColor: '#2196f3',
    padding: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(229, 231, 235, 0.8)',
  },

  date: {
    fontSize: 28,
    color: 'black',
    fontWeight: "bold",
  },

  monthYear: {
    marginStart: "5%",
  },

  month: {
    fontSize: 16
  },
  year: {
    fontSize: 16
  },
  inContainer: {
    marginRight: 0,
    marginTop: 5,
    width: "25%",
    justifyContent: 'center'
  },
  inText: {
    fontSize: 16,
    color: "#7DCEA0",
    fontWeight: "bold",
    textAlign: "right",
  },
  outContainer: {
    marginRight: "5%",
    marginTop: 5,
    width: "25%",
    justifyContent: 'center'
  },
  outText: {
    fontSize: 16,
    color: "#F1948A",
    fontWeight: "bold",
    textAlign: "right",
  }
});