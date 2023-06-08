import React, {useState, useCallback} from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MonthPicker from 'react-native-month-year-picker'

type Props = {}

export default function StatsHeaderLeft({}: Props) {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
  
    const showPicker = useCallback((value:any) => setShow(value), []);

    const onValueChange = (event:any, newDate:any) => {
      const selectedDate = newDate || date;
  
      showPicker(false);
      setDate(selectedDate);
    }
  
    // const onValueChange = (event: any, newDate: any) => {
    //   const selectedDate = newDate || date;
    //   setShow(!show);
    //   setDate(selectedDate);
    // };

  return (
  <View style={styles.monthPicker}>
    <TouchableOpacity 
        style={styles.monthPickerContainer}
        onPress={() => showPicker(true)}
        >
        <Ionicons name="ios-calendar-sharp" size={22} color="black" />
        <Text style={styles.monthPickerText}>{date.getMonth()+1}/{date.getFullYear()}</Text>
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
  )
}

const styles = StyleSheet.create({
    monthPicker:{
        justifyContent: 'flex-start',
        marginRight: "1%",
        marginLeft: "20%",
    },
    monthPickerContainer: {
      // flexDirection: 'row',
      // backgroundColor: 'white',
      // borderBottomColor: '#D5D8DC',
      // borderBottomWidth: 0.5,
      // paddingTop: '5%',
      // paddingBottom: '0%',
      // paddingHorizontal: '3%',
      // alignItems: 'center',
      // width: 120,
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "white",
        borderBottomColor: '#ABB2B9',
        borderBottomWidth: 0,
        paddingTop: "5%",
        paddingBottom: "0%",
        paddingHorizontal: "3%",
        alignItems: 'center',
    },
    monthPickerText: {
        // fontSize: 20,
        // fontWeight: 'bold',
        // color: 'grey',
        marginLeft: 12,
        fontSize: 14,
        fontWeight: '500',
        color: 'black',
    },
})