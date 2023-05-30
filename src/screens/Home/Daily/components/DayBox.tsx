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
          'Sun',
          'Mon',
          'Tue',
          'Wed',
          'Thu',
          'Fri',
          'Sat',
        ][dayOfWeek];
  };

  return (
    <View style={styles.mainContainer}>
      {/* Hiện ngày tháng năm, tiền thu chi */}
      <View style={styles.header}>
        <View style={{flexDirection: 'row', justifyContent:'flex-start'}}>
          <View style={{width: "25%", alignItems: "center"}}>
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
          <View style={styles.inContainer}>
            <Text style={styles.inText}>$ {income}</Text>
          </View>
          <View style={styles.outContainer}>
            <Text style={styles.outText}>$ {expense}</Text>
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
    fontSize: 28,
    color: 'black',
    fontWeight: "bold",
  },

  monthYear: {
    marginStart: "5%",
  },

  month: {
    fontSize: 16
  },
  year: {
    fontSize: 16
  },
  inContainer:{
    marginRight: 0,
    marginTop: 5,
    width: "20%"
  },
  inText:{
    fontSize: 18,
    color: "#9FE2BF",
    fontWeight: "bold",
    textAlign: "right"
  },
  outContainer:{
    marginRight: 13,
    marginTop: 5,
    width: "30%"
  },
  outText:{
    fontSize: 18,
    color: "#FF7F50",
    fontWeight: "bold",
    textAlign: "right"
  }
});
