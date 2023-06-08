import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useState, useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import MonthPicker from 'react-native-month-year-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ChevronRightIcon, ChevronLeftIcon } from 'react-native-heroicons/outline'

type Props = {};

export default function Header({}: Props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const showPicker = useCallback((value: any) => setShow(value), []);

  const onValueChange = (event: any, newDate: any) => {
    const selectedDate = newDate || date;
    setShow(!show);
    setDate(selectedDate);
  };
  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.dropDownContainer}>
        <TouchableOpacity
          style={styles.selectDropDownContainer}
          onPress={() => setShow(true)}>
          <Ionicons name="ios-calendar-sharp" size={22} color="black" />
          <Text style={styles.selectDropDownText}>
            {date.getMonth() + 1}/{date.getFullYear()}
          </Text>
        </TouchableOpacity>
        {show && (
          <MonthPicker
            mode='number'
            onChange={onValueChange}
            value={date}
            minimumDate={new Date()}
            maximumDate={new Date(2025, 5)}
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
    justifyContent: 'space-between',
    marginRight: '2%',
    marginTop: '0%',
  },
  titleContainer: {
    justifyContent: 'flex-start',
    marginLeft: '5%',
    marginTop: '3%',
  },
  dropDownContainer: {
    justifyContent: 'flex-end',
    marginRight: '1%',
  },
  selectDropDownText: {

    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ABB2B9',
  },
  selectDropDownContainer: {
    // justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomColor: '#D5D8DC',
    borderBottomWidth: 0.5,
    paddingTop: '5%',
    paddingBottom: '0%',
    paddingHorizontal: '3%',
    alignItems: 'center',
    width: 120,
    // shadowRadius: 40,
    // shadowOffset: {width: 4, height: 4},
    // shadowOpacity: 5,
  },
  rowContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
});
