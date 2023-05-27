import {SafeAreaView, StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';

import Daily from '../../Daily';
import DailyView from '../../Daily/components/DailyView';

export type Props = {
  month: any;
  year: any;
  totalIncome: any;
  totalExpense: any;
  total: any;
};

//đưa nhiều ngày trong tháng vào đây ??

const Monthly: React.FC<Props> = ({
  month,
  year,
  totalIncome,
  totalExpense,
  total,
}) => {
  return (
    <SafeAreaView>
      <View style={styles.secondTopBar}>
        <View style={styles.totalCalc}>
          <Text style={styles.totalElement}>Income</Text>
          <Text style={{color: '#2416CB', alignSelf: 'center'}}>35.00</Text>
        </View>
        <View style={styles.totalCalc}>
          <Text style={styles.totalElement}>Expense</Text>
          <Text style={{color: '#FF914D', alignSelf: 'center'}}>35.00</Text>
        </View>
        <View style={styles.totalCalc}>
          <Text style={styles.totalElement}>Total</Text>
          <Text style={{fontWeight: '600', alignSelf: 'center'}}>35.00</Text>
        </View>
      </View>

      {/* List daily */}
      <ScrollView>
        <DailyView date="22" month="03" year="2003" income="69" expense="35" />
        <DailyView date="23" month="03" year="2003" income="69" expense="35" />
        <DailyView date="24" month="03" year="2003" income="69" expense="35" />
        <DailyView date="25" month="03" year="2003" income="69" expense="35" />
        <View style={{width: '100%', height: 180}}></View>
      </ScrollView>


    </SafeAreaView>
  );
};

export default Monthly;

const styles = StyleSheet.create({
  secondTopBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.4)',
  },
  totalCalc: {
    justifyContent: 'center',
    width: 100,
  },
  totalElement: {
    alignSelf: 'center',
  },
});
