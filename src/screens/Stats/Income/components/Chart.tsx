import { View } from "react-native";
import { Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { SafeAreaView } from "react-native-safe-area-context";
import Category from "./Category";
import { getDBConnection, getChartDataByMonth, getChartDataByYear } from "../../../../services/db-services";
import { useEffect, useState, useContext } from "react";
import themeContext from "../../../../config/themeContext";
import { themeInterface } from "../../../../config/themeInterface";
import CalendarButton from "../../../Home/CalendarButton";
import { PieData } from "../../../../models/pieData";
import PeriodButton from "../../../Home/PeriodButton";
import { CategoryList, Language } from "../../../../models/language";
import vi from "../../../../config/language/vi";
import en from "../../../../config/language/en";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Currency } from "../../../../models/currency";

export type ChartData = {
  name: string,
  percentage: number,
  value: number,
  color: string,
}

export default function Chart(props: { navigation: any }) {

  const { navigation } = props;

  const theme = useContext(themeContext) as themeInterface

  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartPressValue, setChartPressValue] = useState<ChartData>({} as ChartData);
  const [showTimeOptions, setShowTimeOptions] = useState<boolean>(false)
  const [timeOptionsValue, setTimeOptionsValue] = useState<any>('Monthly')
  const [date, setDate] = useState<Date>(new Date())
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [languagePack, setLanguagePack] = useState<Language>({} as Language);
  const [currency, setCurrency] = useState<Currency>({} as Currency);

  const updateChart = () => {
    setIsLoaded(false);
    switch (timeOptionsValue) {
      case 'Monthly':
        getDBConnection().then(db => {
          getChartDataByMonth(db, date.getMonth() + 1, date.getFullYear(), 'income').then(chartData => {
            setChartData(chartData);
            setIsLoaded(true);
            setChartPressValue({
              name: languagePack.total,
              percentage: 1,
              value: chartData.reduce((a, b) => a + (b.value || 0), 0),
              color: 'white'
            })
          })
        })
        break;
      case 'Yearly':
        getDBConnection().then(db => {
          getChartDataByYear(db, date.getFullYear(), 'income').then(chartData => {
            setChartData(chartData);
            setIsLoaded(true);
            setChartPressValue({
              name: languagePack.total,
              percentage: 1,
              value: chartData.reduce((a, b) => a + (b.value || 0), 0),
              color: 'white'
            })
          })
        }
        )
        break;
    }
  }

  useEffect(() => {
    updateChart()
  }, [date, timeOptionsValue]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      updateChart()

      const getLanguagePack = async () => {
        const language = await AsyncStorage.getItem('language');
        if (language === 'vi') {
          setLanguagePack(vi);
        } else {
          setLanguagePack(en);
        }
      }
      getLanguagePack();

      const getCurrency = async () => {
        const currency = await AsyncStorage.getItem('currency');
        if (currency) {
          setCurrency(JSON.parse(currency));
        }
      }
      getCurrency();

    });
    return unsubscribe;
  }, [navigation]);

  function handlePress() {
    setShowTimeOptions(!showTimeOptions)
  }

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.background }]}>
      <View style={[styles.chartContainer, { backgroundColor: theme.componentBackground }]}>
        {isLoaded && (<PieChart
          data={chartData}
          showText
          textColor="white"
          strokeColor="white"
          strokeWidth={4}
          radius={150}
          textSize={26}
          focusOnPress
          onPress={(value: any) => {
            const result = { name: languagePack.categories[CategoryList.indexOf(value.name.toLowerCase())][1], percentage: value.percentage, value: value.value, color: value.color }
            setChartPressValue(result)
          }}
          showValuesAsLabels={false}
          textBackgroundRadius={26}
          centerLabelComponent={() => {
            return (
              <View style={{ alignItems: "center" }}>
                <Text style={{ color: theme.mode === 'dark' ? "black" : 'grey', fontWeight: 'bold', fontSize: 20, textAlign: "center" }}>
                  {chartPressValue.name}{"\n"}
                  {currency.symbol} {chartPressValue.value}
                </Text>
              </View>
            )
          }}
        />)}
      </View>

      <ScrollView style={[styles.pieDataContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }]}>
        {chartData.map((data, index) => {
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
      <CalendarButton date={date} setDate={setDate} />
      <PeriodButton onPress={handlePress} period={timeOptionsValue == 'Yearly' ? languagePack.yearly : languagePack.monthly} />

      {showTimeOptions && (
        <View>
          <TouchableOpacity onPress={() => {
            setTimeOptionsValue('Yearly')
            setShowTimeOptions(false)
          }} style={styles.periodButton1}>
            <Text style={{ fontSize: 14, padding: 6, color: 'white' }}>{languagePack.yearly}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            setTimeOptionsValue('Monthly')
            setShowTimeOptions(false)
          }} style={styles.periodButton2}>
            <Text style={{ fontSize: 14, padding: 6, color: 'white' }}>{languagePack.monthly}</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <TouchableOpacity onPress={() => setShowTimeOptions(!showTimeOptions)} style={styles.periodButton}>
        <Text style={{ fontSize: 16, fontWeight: '500', padding: 6, color: 'white' }}>{timeOptionsValue}</Text>
      </TouchableOpacity> */}

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
    bottom: '3.8%',
    right: 16,
    backgroundColor: 'rgba(178, 178, 178, 0.95)',
    borderRadius: 25,
    alignItems: 'center',
    paddingVertical: 0.8,
    paddingHorizontal: 10,
    // padding: 20, 
    width: 110
  },

  periodButton1: {
    position: 'absolute',
    bottom: 63,
    right: 16,
    backgroundColor: 'rgba(178, 178, 178, 0.95)',
    borderRadius: 16,
    width: 75,
    alignItems: 'center'
  },

  periodButton2: {
    position: 'absolute',
    bottom: 98,
    right: 16,
    backgroundColor: 'rgba(178, 178, 178, 0.95)',
    borderRadius: 16,
    width: 75,
    alignItems: 'center'
  }
})