import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {Calendar} from 'react-native-big-calendar';

const events = [
  {
    title: 'Meeting',
    start: new Date(2023, 5, 29, 0, 0),
    end: new Date(2023, 5, 29, 2, 0),
  },
  {
    title: 'Coffee break',
    start: new Date(2020, 1, 11, 15, 45),
    end: new Date(2020, 1, 11, 16, 30),
  },
];

const HeaderView = () => {
  return (
    <View>
      <Text>Header View</Text>
    </View>
  )
}

const CalendarView = () => {

  const [mode, setMode] = useState<any>('day')
  return (
    <View>
      <View style = {{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => setMode('day')}>
          <Text>Day</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('week')}>
          <Text>Week</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setMode('month')}>
          <Text>Month</Text>
        </TouchableOpacity>
      </View>
      <Calendar
        events={events}
        height={600}
        eventCellStyle={[
          {backgroundColor: 'red'},
          {borderWidth: 1, borderColor: 'green'},
        ]}
        mode={mode}
        showAllDayEventCell={false}
        swipeEnabled={true}
        showTime={true}
        //sortedMonthView={true}
        // headerContainerStyle={HeaderView}
      />
    </View>
  );
};

export default CalendarView;

const styles = StyleSheet.create({});
