import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import DayInfo from './components/DayInfo';
import DayBox from './components/DayBox';
import { Transaction } from '../../../models/transaction';
import { getDBConnection, getTransactions, createTable, importTestData, clearDatabase, getAllDatesListByMonth, dropDatabaseAndRecreate, logAllToConsole } from '../../../services/db-services';

const Daily = () => {

  const [DateList, setDateList] = React.useState<Date[]>([]);

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




    var date = new Date();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    getDBConnection().then((db) => {
      getAllDatesListByMonth(db, month, year).then((dates) => {
        setDateList(dates);
      });
    });
  }, []);

  return (
    <SafeAreaView>
      {/* Income, expense, total, bar */}
      {/* Show list view chi tiêt schi tiêu ngày */}

      {DateList.map((date) => {
        return (
          <DayBox date={date}/>
        );
      })
      }
      
    </SafeAreaView>
  );
};

export default Daily;

const styles = StyleSheet.create({

});
