import { View, Dimensions, ActivityIndicator } from "react-native";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import SelectDropdown from "react-native-select-dropdown";
import { getDBConnection, getTransactionsFromLastMonth, getTransactionsFromLastYear, getExistedCategoryByTransactionList, getPieData } from "../../../../services/db-services";
import { Transaction } from "../../../../models/transaction";
import { Category as CategoryModel } from "../../../../models/category";
import { useEffect, useState, useRef, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Skeleton, Spinner } from "native-base";
import MonthPicker from "react-native-month-year-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'

export type PieData = {
    name: string,
    percentage: number,
    value: number,
    color: string,
}

export default function Chart() {

    const isFocused = useIsFocused();

    const [pieData, setPieData] = useState<PieData[]>([]);
    const [piePressValue, setPiePressValue] = useState<PieData>({} as PieData);

    const timeOptions = ["Monthly", "Yearly"];

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

    const updateChart = (time: any) => {
        getDBConnection().then((db) => {
            getPieData(db, time, "expense").then((data) => {
                setPieData(data);
                var total = 0;
                for (let i = 0; i < data.length; i++) {
                    total += data[i].value;
                }
                setPiePressValue({name: "Total", percentage: 100, value: total, color: "#000000"});
            });
        });
    }

    useEffect(() => {
        
        updateChart("Monthly");

    }, []);


    return (
        <SafeAreaView>
            <View style={styles.pickerContainer}>
                <View style={styles.monthPicker}>
                    <TouchableOpacity 
                        style={styles.monthPickerContainer}
                        onPress={() => showPicker(true)}
                        >
                        <Ionicons name='ios-calendar-sharp' size={26} color='#F1948A'/>
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
                <View style={styles.datePicker}>
                    <SelectDropdown
                        data={timeOptions}
                        defaultButtonText="Monthly"
                        buttonTextStyle={styles.selectDropDownText}
                        buttonStyle={styles.selectDropDownContainer}
                        rowStyle={styles.rowContainer}
                        renderDropdownIcon={() => <Ionicons name='ios-caret-down-outline' size={26} color='#F1948A'/>}
                        dropdownIconPosition="right"
                        onSelect={(selectedItem, index) => {
                            updateChart(selectedItem);
                        }}
                        buttonTextAfterSelection={(selectedItem) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item) => {
                            return item;
                        }}
                    />
                </View>
            </View>

            <View style={styles.chartContainer}>
                    <PieChart
                        data={pieData}
                        showText
                        textColor="white"
                        strokeColor="white"
                        strokeWidth={4}
                        radius={150}
                        textSize={26}
                        focusOnPress
                        onPress={(value: any) => {
                            setPiePressValue(value);
                        }}
                        showValuesAsLabels={false}
                        textBackgroundRadius={26}
                        centerLabelComponent={() => {
                            return (
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ color: "grey", fontWeight:'bold', fontSize: 20, textAlign: "center" }}>
                                        {piePressValue.name}{"\n"}
                                        $ {piePressValue.value}
                                    </Text>
                                </View>
                            )
                        }}
                    />
            </View>

            <ScrollView>
                {pieData.map((data, index) => {
                    return (
                        <Category
                            key={index}
                            cost={data.value}
                            color={data.color}
                            name={data.name}
                            percentage={data.percentage * 100}
                        />
                    );
                })}
                <View style={{ width: '100%', height: 180 }}></View>
            </ScrollView>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingVertical: 15,
        marginBottom: 15,
        backgroundColor: 'white'
    },
    datePicker: {
        justifyContent: 'flex-end',
        marginRight: "10%",
        marginLeft: "1%"
    },
    selectDropDownText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
    },
    selectDropDownContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "white",
        borderBottomColor: '#F1948A',
        borderBottomWidth: 0.5,
        paddingTop: "5%",
        paddingBottom: "0%",
        paddingHorizontal: "3%",
        alignItems: 'center',
        width: 120
    },
    rowContainer: {
        backgroundColor: "white",
        justifyContent: "flex-start"
    },
    monthPickerContainer: {
        flexDirection: 'row',
        justifyContent:'space-between',
        backgroundColor: "white",
        borderBottomColor: '#F1948A',
        borderBottomWidth: 0.5,
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
    monthPicker:{
        justifyContent: 'flex-start',
        marginRight: "1%",
        marginLeft: "10%",
    },
    pickerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        paddingTop: '2%',
        paddingBot: '2%'
    },
})