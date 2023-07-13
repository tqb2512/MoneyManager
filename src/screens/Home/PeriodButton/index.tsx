import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import MonthPicker from 'react-native-month-year-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CalendarIcon, ClockIcon } from 'react-native-heroicons/outline'


export default function PeriodButton(props: { period: String, onPress: Function }) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.dropDownContainer}>
        <TouchableOpacity
          style={styles.selectDropDownContainer}
          onPress={props.onPress}>
          <Text style={styles.selectDropDownText}>
            {props.period}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    marginLeft: 16,
    marginBottom: 24,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  titleContainer: {
    justifyContent: 'flex-start',
    marginLeft: '5%',
    marginTop: '3%',
  },
  dropDownContainer: {
    justifyContent: 'flex-end',
    marginRight: '2%',
  },
  selectDropDownText: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    alignSelf: 'center'
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ABB2B9',
  },
  selectDropDownContainer: {
    flexDirection: 'row',
    backgroundColor: '#2196f3',
    borderRadius: 25,
    borderBottomColor: '#D5D8DC',
    paddingTop: '5%',
    padding: 20, 
    paddingBottom: '6.5%',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    height: '70%', 
    width: 120, 
  },
});
