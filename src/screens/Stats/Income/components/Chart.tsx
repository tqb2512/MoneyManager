import { View, Dimensions, ActivityIndicator } from "react-native";
import { Text, StyleSheet, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import SelectDropdown from "react-native-select-dropdown";
import { getDBConnection, getTransactionsFromLastMonth, getTransactionsFromLastYear, getExistedCategoryByTransactionList, getPieData } from "../../../../services/db-services";
import { Transaction } from "../../../../models/transaction";
import { Category as CategoryModel } from "../../../../models/category";
import { useEffect, useState, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Skeleton, Spinner } from "native-base";

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
    const [loading, setLoading] = useState<boolean>(true);

    const timeOptions = ["Monthly", "Yearly"];



    const updateChart = (time: any) => {
        getDBConnection().then((db) => {
            getPieData(db, time, "income").then((data) => {
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
        alignItems: 'flex-end',
        backgroundColor: 'white',
        marginRight: 15

    },
    selectDropDownText: {
        fontSize: 18,
        fontWeight: '500',
        color: 'white',
    },
    selectDropDownContainer: {
        borderRadius: 7,
        backgroundColor: "#7DCEA0",
        marginTop: 15,
        marginRight: 30,
        width: "25%",
        justifyContent: "flex-start"
    },
    rowContainer: {
        backgroundColor: "white",
        justifyContent: "flex-start"
    },
})