import { View, Dimensions } from "react-native";
import { Text, StyleSheet, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import SelectDropdown from "react-native-select-dropdown";
import { getDBConnection, getTransactionsFromLastMonth, getAllCategories} from "../../../../services/db-services";
import { Transaction } from "../../../../models/transaction";
import { Category as CategoryModel } from "../../../../models/category";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";


export type Props = {
    value: any,
    total: any,
    color: any,
}

export type PieData = {
    value: number,
    color: string,
}

export default function Chart(){

    const isFocused = useIsFocused();

    const [categories, setCategories] = useState<CategoryModel[]>([]);
    const [transactionsList, setTransactionsList] = useState<Transaction[]>([]); // [Transaction, Transaction, Transaction
    const [pieData, setPieData] = useState<PieData[]>([]);

    const time = ["Daily", "Monthly", "Yearly"]

    useEffect(() => {
        
        if (!isFocused) {
            return;
        }

        
        getDBConnection().then((db) => {
            getTransactionsFromLastMonth(db).then((transactions) => {
                setTransactionsList(transactions);
            });
        });

        getDBConnection().then((db) => {
            getAllCategories(db).then((categories) => {
                setCategories(categories);
            });
        });

        const pieData: PieData[] = [];
        categories.forEach((category) => {
            var total = 0;
            transactionsList.forEach((transaction) => {
                if (transaction.type == "income") {
                    if (transaction.category == category.id) {
                        total += transaction.amount;
                    }
                }
            });
            pieData.push({
                value: total,
                color: category.color,
            });
        });
        setPieData(pieData);
    }, [isFocused]);

    return(
        <SafeAreaView>
            <View style={styles.datePicker}>
                <SelectDropdown
                data={time}
                defaultButtonText="Daily"
                buttonTextStyle={styles.selectDropDownText}
                buttonStyle={styles.selectDropDownContainer}
                rowStyle={styles.rowContainer}
                dropdownIconPosition="right"
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
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
                showValuesAsLabels={false}
                textBackgroundRadius={26}
                centerLabelComponent={() => {                    
                    return <Text style={{fontSize: 26}}>$ 549</Text>;
                    }}
                />
            </View>
            <ScrollView>
                {pieData.map((item, index) => {
                    return <Category key={index} name={item.value} cost={item.value} percentage={item.value} color={item.color}/>
                })
                }
                <View style={{width: '100%', height: 180}}></View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({ 
    chartContainer:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 30,
        paddingVertical: 15,
        marginBottom: 15,
        backgroundColor: 'white'
    },
    datePicker:{
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: 'white',
        marginRight: 15

    },  
    selectDropDownText:{
        fontSize: 18,
        color: 'white',
    },
    selectDropDownContainer:{
        borderRadius: 7,
        backgroundColor: "#7DCEA0",
        marginTop: 15,
        marginRight: 30,
        width: "25%",
        justifyContent:"flex-start"
    },
    rowContainer:{
        backgroundColor: "white",
        justifyContent:"flex-start"
    },
})