import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { useState, useCallback } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown'
import MonthPicker from 'react-native-month-year-picker';

type Props = {}

export default function Header({}: Props) {
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
    <SafeAreaView style={styles.headerContainer}>
        <View style={styles.titleContainer}>
            <Text style={styles.headerText}>Home</Text>
        </View>
        <View style={styles.dropDownContainer}>
            <TouchableOpacity 
                style={styles.selectDropDownContainer}
                onPress={() => showPicker(true)}
                >
                <Text style={styles.selectDropDownText}>Open</Text>
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
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleContainer:{
        justifyContent: 'flex-start',
        marginLeft: "5%",
        marginTop: "3%"
    },
    dropDownContainer:{
        justifyContent: 'flex-end',
        marginRight: "1%"
    },
    selectDropDownText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ABB2B9',
    },
    selectDropDownContainer: {
        borderRadius: 7,
        backgroundColor: "white",
        borderBottomColor: 'grey',
        borderWidth: 0.4,
        paddingVertical: 10,
        marginVertical: "5%",
        marginRight: "10%",
        alignItems: 'center',
        width: "100%",
    },
    rowContainer: {
        backgroundColor: "white",
        justifyContent: "flex-start"
    },
})