import React from 'react'
import {StyleSheet, View} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import Ionicons from 'react-native-vector-icons/Ionicons'

type Props = {}

export default function StatsHeaderRight({}: Props) {

    const timeOptions = ["Monthly", "Yearly"];

  return (
    <View style={styles.datePicker}>
    <SelectDropdown
        data={timeOptions}
        defaultButtonText="Monthly"
        buttonTextStyle={styles.selectDropDownText}
        buttonStyle={styles.selectDropDownContainer}
        rowStyle={styles.rowContainer}
        renderDropdownIcon={() => <Ionicons name='ios-caret-down-outline' size={26} color='#ABB2B9'/>}
        dropdownIconPosition="right"
        onSelect={(selectedItem, index) => {
            //updateChart(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem) => {
            return selectedItem;
        }}
        rowTextForSelection={(item) => {
            return item;
        }}
    />
</View>
  )
}

const styles = StyleSheet.create({
    datePicker: {
        justifyContent: 'flex-end',
        marginRight: "20%",
        marginLeft: "1%"
    },
    selectDropDownText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'grey',
    },
    selectDropDownContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "white",
        borderBottomColor: '#ABB2B9',
        borderBottomWidth: 0,
        paddingTop: "5%",
        paddingBottom: "0%",
        paddingHorizontal: "3%",
        alignItems: 'center',
        width: 125
    },
    rowContainer: {
        backgroundColor: "white",
        justifyContent: "flex-start"
    },
})