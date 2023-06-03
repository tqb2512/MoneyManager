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
                        <Text style={styles.monthPickerText}>Open</Text>
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
        backgroundColor: 'white',
        marginRight: "13%"
    },
    selectDropDownText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    selectDropDownContainer: {
        borderRadius: 7,
        backgroundColor: "#F1948A",
        marginTop: 15,
        marginVertical: "5%",
        marginRight: "10%",
        alignItems: 'center',
        width: "150%",
        justifyContent: "flex-start"
    },
    rowContainer: {
        backgroundColor: "white",
        justifyContent: "flex-start"
    },
    monthPickerContainer: {
        borderRadius: 7,
        backgroundColor: "white",
        borderColor: '#F1948A',
        borderWidth: 1,
        paddingVertical: 10,
        marginTop: "13%",
        marginLeft: "13%",
        alignItems: 'center',
        width: "100%",
    },
    monthPickerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#F1948A',
    },
    monthPicker:{
        justifyContent: 'flex-start',
        marginRight: "1%"
    },
    pickerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white'
    },
})