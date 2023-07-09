import {StyleSheet, Text, View} from 'react-native';
import React, { useContext, useEffect } from 'react';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { Currency } from '../../../models/currency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MonthlyScreenProp } from '../../../navigation/types';

function Monthly(props: MonthlyScreenProp) {

    const { navigation } = props;
    const [currency, setCurrency] = React.useState<Currency>({} as Currency);
    const theme = useContext(themeContext) as themeInterface

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
          const getCurrencyValue = async () => {
            const value = await AsyncStorage.getItem('currency')
            if (value !== null) {
              setCurrency(JSON.parse(value));
            }
          }
          getCurrencyValue()
        });
        return unsubscribe;
      }, [navigation]);
    return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
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
          <Text style={[styles.totalElement, {color: theme.color}]}>
            Income
          </Text>
          <Text
            style={{
              color: '#7DCEA0',
              alignSelf: 'center',
              fontSize: 14,
              fontWeight: '500',
            }}>
            {currency.symbol} 35.00
          </Text>
        </View>
        <View style={styles.totalCalc}>
          <Text style={[styles.totalElement, {color: theme.color}]}>
            Expense
          </Text>
          <Text
            style={{
              color: '#F1948A',
              alignSelf: 'center',
              fontSize: 14,
              fontWeight: '500',
            }}>
            {currency.symbol} 35.00
          </Text>
        </View>
        <View style={styles.totalCalc}>
          <Text style={[styles.totalElement, {color: theme.color}]}>Total</Text>
          <Text
            style={{
              color: 'grey',
              alignSelf: 'center',
              fontSize: 14,
              fontWeight: '500',
            }}>
            {currency.symbol} 35.00
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Monthly;

const styles = StyleSheet.create({
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
});
