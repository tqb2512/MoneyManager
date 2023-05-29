import { View, Dimensions } from "react-native";
import { Text, StyleSheet, ScrollView } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import SelectDropdown from "react-native-select-dropdown";

export type Props = {
    value: any,
    total: any,
    color: any,
}

export default function Chart(){
    const pieData = [
        {value: 54, color: '#177AD5'},
        {value: 35, color: '#79D2DE'},
        {value: 11, color: '#ED6665'},
      ];

    const time = ["Daily", "Monthly", "Yearly"]

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
                <Category percentage={54} name={'Renting'} cost={350.00} color={'#177AD5'}/>
                <Category percentage={35} name={'Food'} cost={176.00} color={'#79D2DE'}/>
                <Category percentage={11} name={'Transition'} cost={23.00} color={'#ED6665'}/>
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
        backgroundColor: "#8FE7B0",
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