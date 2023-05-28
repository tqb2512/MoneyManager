import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const DailyHeader = () => {
  return (
    <View>
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
    </View>
  );
};

export default DailyHeader;

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
