import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import DayInfo from './DayInfo';
import {DayBox as DayBoxModel} from '../../../../models/dayBox';

function DayBox (props: { dayBoxModel: DayBoxModel, navigation: any }) {

  const { navigation } = props;
  const getDayOfWeek = () => {
    const dayOfWeek = new Date(
      props.dayBoxModel.year,
      props.dayBoxModel.month - 1,
      props.dayBoxModel.day,
    ).getDay();
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
            <Text style={styles.date}>{props.dayBoxModel.day}</Text>
          </View>
          <View style={styles.monthYear}>
            <Text style={{ fontWeight: '600' }}>{getDayOfWeek()}</Text>
            <Text style={styles.month}>{props.dayBoxModel.month}/{props.dayBoxModel.year}</Text>
          </View>
        </View>
          <View style={styles.inContainer}>
            <Text 
              style={[styles.inText,{
                fontSize: props.dayBoxModel.totalIncome.toString().length > 8 ? 14 : 19,
              }]}
            >$ {props.dayBoxModel.totalIncome}</Text>
          </View>
          <View style={styles.outContainer}>
            <Text style={[styles.outText, {
              fontSize: props.dayBoxModel.totalExpense.toString().length > 8 ? 14 : 19,
            }]}>$ {props.dayBoxModel.totalExpense}</Text>
          </View>

      </View>
      {/* Danh sách khoản thu chi */}
      <FlatList
        data={props.dayBoxModel.transactions}
        renderItem={({item}) => <DayInfo transaction={item} navigation={navigation} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default React.memo(DayBox);

const styles = StyleSheet.create({
  mainContainer: {
    marginBottom: 12,
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
    width: "25%",
    justifyContent: 'center'
  },
  inText:{
    fontSize: 16,
    color: "#7DCEA0",
    fontWeight: "bold",
    textAlign: "right",
  },
  outContainer:{
    marginRight: "5%",
    marginTop: 5,
    width: "25%",
    justifyContent: 'center'
  },
  outText:{
    fontSize: 16,
    color: "#F1948A",
    fontWeight: "bold",
    textAlign: "right",
  }
});