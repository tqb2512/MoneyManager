import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DailyBudget from './DailyBudget';

export type Props = {
  date: any;
  month: any;
  year: any;
  income: any;
  expense: any;
};

const DailyView: React.FC<Props> = ({date, month, year, income, expense}) => {
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
      <DailyBudget
        id_budget=""
        type="income"
        category="Playing"
        account="Card"
        amount="69"
        note="Note 1"
        date="22"
        month="03"
        year="2003"
        img_url="https://lzd-img-global.slatic.net/g/p/6358f080921cd733a75669f106cce6cc.jpg_720x720q80.jpg"
      />

      <DailyBudget
        id_budget=""
        type="income"
        category="Sleeping"
        account="Card"
        amount="69"
        note="Note 23"
        date="22"
        month="03"
        year="2003"
        img_url="https://lzd-img-global.slatic.net/g/p/6358f080921cd733a75669f106cce6cc.jpg_720x720q80.jpg"
      />

      <DailyBudget
        id_budget=""
        type="expense"
        category="Playing"
        account="Account"
        amount="35"
        note="Note 2"
        date="22"
        month="03"
        year="2003"
        img_url="https://lzd-img-global.slatic.net/g/p/6358f080921cd733a75669f106cce6cc.jpg_720x720q80.jpg"
      />
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
