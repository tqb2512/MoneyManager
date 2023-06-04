import React, {useState, useCallback} from 'react'
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MonthPicker from 'react-native-month-year-picker'

type Props = {}

export default function StatsHeaderLeft({}: Props) {

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);
  
    const showPicker = useCallback((value:any) => setShow(value), []);
  
    const onValueChange = useCallback(
      (event:any, newDate:any) => {
        const selectedDate = newDate || date;
  
        showPicker(false);
        setDate(selectedDate);
      },
      [date, showPicker],
    );

  return (
  <View style={styles.monthPicker}>
    <TouchableOpacity 
        style={styles.monthPickerContainer}
        onPress={() => showPicker(true)}
        >
        <Ionicons name='ios-calendar-sharp' size={26} color='#ABB2B9'/>
        <Text style={styles.monthPickerText}>{date.getMonth()+1}/{date.getFullYear()}</Text>
    </TouchableOpacity>
    {show && (
    <MonthPicker
        onChange={onValueChange}
        value={date}
        minimumDate={new Date()}
        maximumDate={new Date(2025, 5)}
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
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "white",
        borderBottomColor: '#ABB2B9',
        borderBottomWidth: 0,
        paddingTop: "5%",
        paddingBottom: "0%",
        paddingHorizontal: "3%",
        alignItems: 'center',
        width: 120
    },
    monthPickerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
    },
})