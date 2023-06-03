import { SafeAreaView, FlatList, TouchableOpacity, Text } from 'react-native';
import React, { useEffect } from 'react';
import DayBox from './components/DayBox';
import { DayBox as DayBoxModel } from '../../../models/dayBox';
import { DailyScreenProp } from '../../../navigation/types';
import { NativeBaseProvider } from 'native-base';
import { getDBConnection, getDayBoxFromMonthYear, createTables, dropTables, importTestData } from '../../../services/db-services';

function DailyScreen (props: DailyScreenProp) {
  
  const { navigation } = props;
  const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDBConnection().then((db) => {
        getDayBoxFromMonthYear(db, 6, 2023).then((dayBoxes) => {
          setDayBoxes(dayBoxes);
        });
      });
    });
    console.log(dayBoxes)
    return unsubscribe;
  }, [navigation]);

  return (

    <NativeBaseProvider>
      <SafeAreaView>
        {/* Income, expense, total, bar */}
        {/* Show list view chi tiêt schi tiêu ngày */}

        <FlatList
          data={dayBoxes}
          renderItem={({ item }) => <DayBox dayBoxModel={item} navigation = {props.navigation}/>}
          keyExtractor={(item) => item.day.toString()}
        />

        <TouchableOpacity onPress={() => navigation.navigate("add_transaction")}>
          <Text>Add Transaction</Text>
        </TouchableOpacity>
        
      </SafeAreaView>
    </NativeBaseProvider>

  );
};

export default React.memo(DailyScreen);