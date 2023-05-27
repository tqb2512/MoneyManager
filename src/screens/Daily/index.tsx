import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import DailyView from './components/DailyView';
import DailyHeader from './components/DailyHeader';

const Daily = () => {
  return (
    <SafeAreaView>
        {/* Income, expense, total, bar */}
      {/* Show list view chi tiêt schi tiêu ngày */}

      <DailyView date='22' month='03' year='2003' income='69' expense='35' />
    </SafeAreaView>
  );
};

export default Daily;

const styles = StyleSheet.create({
    
});
