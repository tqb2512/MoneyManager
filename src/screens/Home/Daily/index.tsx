import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import DayInfo from './components/DayInfo';
import DayBox from './components/DayBox';
import { Transaction } from '../../../models/transaction';
import { getDBConnection, getTransactions, createTable, importTestData, clearDatabase, getAllDatesListByMonth, dropDatabaseAndRecreate, logAllToConsole } from '../../../services/db-services';

const Daily = () => {

  const [DateList, setDateList] = React.useState<Date[]>([]);

  useEffect(() => {
    getDBConnection().then((db) => {
      createTable(db);
    })

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
      <ScrollView>
        {DateList.map((date) => {
          return (
            <DayBox date={date} />
          );
        })
        }
      </ScrollView>
      
    </SafeAreaView>
  );
};

export default Daily;

const styles = StyleSheet.create({

});
