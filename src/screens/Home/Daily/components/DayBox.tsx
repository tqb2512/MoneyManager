import {DatePickerIOSProps, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import DayInfo from './DayInfo';
import { Transaction } from '../../../../models/transaction';
import { getDBConnection, getTransactionsByDate } from '../../../../services/db-services';

const DayBox = (props: {date: Date}) => {
  const [transactionsList, setTransactionsList] = React.useState<Transaction[]>([]);
  const [income, setIncome] = React.useState<number>(0);
  const [expense, setExpense] = React.useState<number>(0);

  useEffect(() => {
    getDBConnection().then((db) => {
      getTransactionsByDate(db, props.date.getDate(), props.date.getMonth(), props.date.getFullYear()).then((transactions) => {
        setTransactionsList(transactions);
        var income = 0;
        var expense = 0;
        transactions.forEach((transaction) => {
          if (transaction.type == 'income') {
            income += transaction.amount;
          } else {
            expense += transaction.amount;
          }
        });
        setIncome(income);
        setExpense(expense);
      });
    });
  }, []);

  const getDayOfWeek = (date: Date) => {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          'Sunday',
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
        ][dayOfWeek];
  };

  return (
    <View style={styles.mainContainer}>
      {/* Hiện ngày tháng năm, tiền thu chi */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <View>
            <Text style={styles.date}>{props.date.getDate()}</Text>
          </View>
          <View style={styles.monthYear}>
            <Text>{getDayOfWeek(props.date)}</Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.month}>{props.date.getMonth()}/</Text>
              <Text style={styles.year}>{props.date.getFullYear()}</Text>
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
        return <DayInfo {...transaction} />;
      })}
    </View>
  );
};

export default DayBox;

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
