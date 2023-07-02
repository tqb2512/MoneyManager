import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import MonthPicker from 'react-native-month-year-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CalendarIcon } from 'react-native-heroicons/outline'


export default function CalendarButton(props: {date: Date, setDate: Function}) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onValueChange = (event: any, newDate: any) => {
    const selectedDate = newDate || date;
    setShow(!show);
    setDate(selectedDate);
    props.setDate(selectedDate);
  };
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.dropDownContainer}>
        <TouchableOpacity
          style={styles.selectDropDownContainer}
          onPress={() => setShow(true)}>
          <CalendarIcon size={20} color='white' />
          <Text style={styles.selectDropDownText}>
            {date.getMonth() + 1}/{date.getFullYear()}
          </Text>
        </TouchableOpacity>
        {show && (
          <MonthPicker
            mode='number'
            onChange={onValueChange}
            value={date}
            locale="ko"
          />
        )}
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
    left: 0,
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
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ABB2B9',
  },
  selectDropDownContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgb(99, 99, 99)',
    borderRadius: 16,
    borderBottomColor: '#D5D8DC',
    paddingTop: '5%',
    padding: 12,
    paddingBottom: '5%',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
