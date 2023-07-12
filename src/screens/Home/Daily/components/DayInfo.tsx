import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { Transaction } from '../../../../models/transaction';
import { Category } from '../../../../models/category';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import themeContext from '../../../../config/themeContext';
import { themeInterface } from '../../../../config/themeInterface';
import { Currency } from '../../../../models/currency';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CategoryList, Language } from '../../../../models/language';
import en from '../../../../config/language/en';
import vi from '../../../../config/language/vi';

function DayInfo(props: { transaction: Transaction, navigation: any, currency: Currency }) {

  const theme = useContext(themeContext) as themeInterface
  const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);
  const [categoryName, setCategoryName] = React.useState<string>('');
  const { transaction, navigation } = props;
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const onPress = () => {
    setTimeout(() => {
      props.navigation.navigate('transaction_detail', { transaction: transaction });
    }, 50);
  }

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      const getLanguagePack = async () => {
        setLoaded(false);
        const language = await AsyncStorage.getItem('language');
        if (language === 'vi') {
          setLanguagePack(vi);
        } else {
          setLanguagePack(en);
        }
        setLoaded(true);
      }
      getLanguagePack();
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const getLanguagePack = async () => {
      setLoaded(false);
      const language = await AsyncStorage.getItem('language');
      if (language === 'vi') {
        setLanguagePack(vi);
      } else {
        setLanguagePack(en);
      }
      setLoaded(true);
    }
    getLanguagePack();
  }, []);


  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ flexDirection: 'row', backgroundColor: theme.componentBackground, padding: 4 }}>
        <View style={{ width: 100, flexDirection: 'row', alignItems: 'center', padding: 8, marginLeft: "3%" }}>

          <Text style={{ marginStart: "5%", color: theme.color }}>{loaded == true ? languagePack.categories[CategoryList.indexOf(transaction.category.name.toLowerCase())][1] : ' '}</Text>
        </View>
        <View style={{ flex: 1, marginStart: "5%", justifyContent: 'center' }}>
          {props.transaction.note !== null && (<Text numberOfLines={1} ellipsizeMode='tail' style={{ fontSize: 16, fontWeight: 'bold', color: theme.color, width: '90%' } }>{props.transaction.note}</Text>)}
          <Text style={{ fontSize: 12, color: theme.color === 'dark' ? theme.color : 'grey', justifyContent: 'center' }}>{props.transaction.account.name}</Text>
        </View>
        <Text
          style={{
            alignSelf: 'center',
            marginRight: "6.5%",
            color: props.transaction.type === 'income' ? '#7DCEA0' : '#F1948A',
            // fontSize: props.transaction.amount.toString().length > 20 ? 13 : 16,
          }}>
          {props.currency.symbol} {props.transaction.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default DayInfo;

const styles = StyleSheet.create({});