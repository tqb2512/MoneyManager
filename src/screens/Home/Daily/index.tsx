import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import DayInfo from './components/DayInfo';
import { Transaction } from '../../../models/transaction';
import { getDBConnection, getTransactionsByMonth, createTable, importTestData} from '../../../services/db-services';

const Daily = () => {

  const [transactionsList, setTransactionsList] = React.useState<Transaction[]>([]);

  useEffect(() => {
    getDBConnection().then((db) => {
      createTable(db);
      //importTestData(db);
    });

    getDBConnection().then((db) => {
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      getTransactionsByMonth(db, month, year).then((transactions) => {
        setTransactionsList(transactions);
      });
    });
  }, []);

  

  return (
    <SafeAreaView>
        {/* Income, expense, total, bar */}
      {/* Show list view chi tiêt schi tiêu ngày */}
      {transactionsList.map((transaction) => {
        return <DayInfo {...transaction} />;
      })
      }
    </SafeAreaView>
  );
};

export default Daily;

const styles = StyleSheet.create({
    
});
