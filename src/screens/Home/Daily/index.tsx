import { SafeAreaView, ScrollView as ScorllViewRN, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import DayInfo from './components/DayInfo';
import DayBox from './components/DayBox';
import { Transaction } from '../../../models/transaction';
import { getDBConnection, getTransactions, createTable, importTestData, clearDatabase, getAllDatesListByMonth, dropDatabaseAndRecreate, logAllToConsole } from '../../../services/db-services';
import { NativeBaseProvider, ScrollView } from 'native-base';
import { useFocus } from 'native-base/lib/typescript/components/primitives';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParams2 } from '../../../navigation';

const Daily = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams2>>();

  const [DateList, setDateList] = React.useState<Date[]>([]);

  const isFocused = useIsFocused();

  useEffect(() => {

    getDBConnection().then((db) => {
      /*dropDatabaseAndRecreate(db).then(() => {
        console.log("Database dropped and recreated");
      });*/

      /*clearDatabase(db).then(() => {
        console.log("Database cleared");
      });*/
      
      /*createTable(db).then(() => {
         console.log("Table created");
      });*/

      /*importTestData(db).then(() => {
          console.log("Test data imported");
       });*/
    });


    if (!isFocused)
      return;
      
    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    getDBConnection().then((db) => {
      getAllDatesListByMonth(db, month, year).then((dates) => {
        setDateList(dates);
      });
    });
  }, [isFocused]);

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        {/* Income, expense, total, bar */}
        {/* Show list view chi tiêt schi tiêu ngày */}

        <ScrollView>
          {DateList.map((date, index) => {
            return <DayBox key={index} date={date} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Daily;

const styles = StyleSheet.create({

});
