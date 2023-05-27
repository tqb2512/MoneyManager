import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import DailyBudget from './DailyBudget';
import { Transaction } from '../../../models/transaction';
import { getDBConnection, getTransactions } from '../../../services/db-services';

export type Props = {
  date: any;
  month: any;
  year: any;
  income: any;
  expense: any;
};

const DailyView: React.FC<Props> = ({date, month, year, income, expense}) => {

  const [transactionsList, setTransactionsList] = React.useState<Transaction[]>([]);
  
  useEffect(() => {
    getDBConnection().then((db) => {
      getTransactions(db).then((transactions) => {
        setTransactionsList(transactions);
      });
    });
  }, []);  

  return (
    <View style={styles.mainContainer}>
      {/* Hiện ngày tháng năm, tiền thu chi */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.monthYear}>
            <Text>Sunday</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.month}>{month}/</Text>
              <Text style={styles.year}>{year}</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={{color: '#2416CB'}}>${income}</Text>
          <Text style={{color: '#FF914D'}}>${expense}</Text>
        </View>
      </View>
      {/* Danh sách khoản thu chi */}
      {transactionsList.map((transaction) => {
        return <DailyBudget {...transaction} />;
      })}
    </View>
  );
};

export default DailyView;

const styles = StyleSheet.create({
  mainContainer: {
    marginTop : 12,
  },

  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 8,
    borderLeftColor: '#BEEFFF',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(229, 231, 235, 0.8)',
  },

  date: {
    fontSize: 25,
    fontWeight: '600',
  },

  monthYear: {
    marginStart: 8,
  },

  month: {},
  year: {},
});
