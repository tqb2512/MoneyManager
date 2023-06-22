import {FlatList, Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {ChangeCurrencyProp} from '../../../navigation/types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Currency from 'react-currency-formatter';

function ChangeCurrency(props: ChangeCurrencyProp) {
  const {navigation} = props;

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
        <TouchableOpacity style={styles.currencyButton}>
              <Image style={styles.flagImg} source={require('../../../../assets/flagImage/vietnam.png')} />
              <View style={styles.currencyTextView}>
                  <Text style={styles.currencyNameText}>Việt Nam Đồng - VND</Text>
              </View>
            <Text style={styles.currencySymbol}>{'\u20AB'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.currencyButton}>
              <Image style={styles.flagImg} source={require('../../../../assets/flagImage/japan.png')} />
              <View style={styles.currencyTextView}>
                  <Text style={styles.currencyNameText}>Japanese Yen- JPY</Text>
              </View>
            <Text style={styles.currencySymbol}>{'\u00A5'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.currencyButton}>
              <Image style={styles.flagImg} source={require('../../../../assets/flagImage/united-states.png')} />
              <View style={styles.currencyTextView}>
                  <Text style={styles.currencyNameText}>United State Dollar - USD</Text>
              </View>
            <Text style={styles.currencySymbol}>{'\u0024'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.currencyButton}>
              <Image style={styles.flagImg} source={require('../../../../assets/flagImage/european-union.png')} />
              <View style={styles.currencyTextView}>
                  <Text style={styles.currencyNameText}>Euro - EURO</Text>
              </View>
            <Text style={styles.currencySymbol}>{'\u20AC'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.currencyButton}>
              <Image style={styles.flagImg} source={require('../../../../assets/flagImage/india.png')} />
              <View style={styles.currencyTextView}>
                  <Text style={styles.currencyNameText}>Indian Rupee - RUP</Text>
              </View>
            <Text style={styles.currencySymbol}>{'\u20B9'}</Text>
        </TouchableOpacity>
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
