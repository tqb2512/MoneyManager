import { View, Dimensions, ActivityIndicator } from "react-native";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import SelectDropdown from "react-native-select-dropdown";
import { getDBConnection, getTransactionsFromLastMonth, getTransactionsFromLastYear, getExistedCategoryByTransactionList, getPieData } from "../../../../services/db-services";
import { Transaction } from "../../../../models/transaction";
import { Category as CategoryModel } from "../../../../models/category";
import { useEffect, useState, useRef, useCallback, useContext } from "react";
import { useIsFocused } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Skeleton, Spinner } from "native-base";
import MonthPicker from "react-native-month-year-picker";
import Ionicons from 'react-native-vector-icons/Ionicons'
import themeContext from "../../../../config/themeContext";
import { themeInterface } from "../../../../config/themeInterface";
import Header from "../../../Home/CalendarButton";
import CalendarButton from "../../../Home/CalendarButton";
import StatsHeaderRight from "../../StatsHeaderRight";

export type PieData = {
    name: string,
    percentage: number,
    value: number,
    color: string,
}

export default function Chart() {

    const theme = useContext(themeContext) as themeInterface
    const isFocused = useIsFocused();

    const [pieData, setPieData] = useState<PieData[]>([]);
    const [piePressValue, setPiePressValue] = useState<PieData>({} as PieData);

    const [showTimeOptions, setShowTimeOptions] = useState<boolean>(false)
    const [timeOptionsValue, setTimeOptionsValue] = useState<any>('Monthly')


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
        <SafeAreaView style={styles.mainContainer}>


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
                                    <Text style={{ color: theme.mode === 'dark' ? "black" : 'grey', fontWeight:'bold', fontSize: 20, textAlign: "center" }}>
                                        {piePressValue.name}{"\n"}
                                        $ {piePressValue.value}
                                    </Text>
                                </View>
                            )
                        }}
                    />
            </View>

            <ScrollView style={styles.pieDataContainer}>
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

            </ScrollView>

            {/* Calendar button */}
            <CalendarButton />

            { showTimeOptions && (
                <View>
                    <TouchableOpacity onPress={() => {
                        setTimeOptionsValue('Yearly')
                        setShowTimeOptions(false)
                    }} style={styles.periodButton1}>
                    <Text style ={{ fontSize: 14, padding: 6, color: 'white' }}>Yearly</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        setTimeOptionsValue('Monthly')
                        setShowTimeOptions(false)
                    }} style={styles.periodButton2}>
                    <Text style ={{ fontSize: 14,  padding: 6, color: 'white' }}>Monthly</Text>
                    </TouchableOpacity>
                </View>
            ) }

            <TouchableOpacity onPress={() => setShowTimeOptions(!showTimeOptions)} style={styles.periodButton}>
                <Text style ={{ fontSize: 16, fontWeight: '500', padding: 6, color: 'white' }}>{timeOptionsValue}</Text>
            </TouchableOpacity>




        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        position: 'relative',
        backgroundColor: 'white',
        height: '100%'
        // flex: 1,
      },

    chartContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingVertical: 15,    
        marginBottom: 15,
        backgroundColor: 'white',
    },

    pieDataContainer: {
        // bottom: 0,
    },

    periodButton: {
        position: 'absolute',
        bottom: 22, 
        right: 16,
        backgroundColor: 'rgb(99, 99, 99)',
        borderRadius: 16,
        width: 80,
        alignItems: 'center'
    },
    
    periodButton1: {
        position: 'absolute',
        bottom: 60, 
        right: 16,
        backgroundColor: 'rgb(99, 99, 99)',
        borderRadius: 16,
        width: 75,
        alignItems: 'center'
    },

    periodButton2: {
        position: 'absolute',
        bottom: 96, 
        right: 16,
        backgroundColor: 'rgb(99, 99, 99)',
        borderRadius: 16,
        width: 75,
        alignItems: 'center'
    }
})