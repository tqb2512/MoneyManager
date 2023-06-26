import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Calendar } from 'react-native-big-calendar';
import { getAllDatesList, getDBConnection } from '../../../services/db-services';
import { useIsFocused } from '@react-navigation/native';
import DayBox from '../Daily/components/DayBox';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from 'react-native-heroicons/outline';
import { ChevronLeftIcon, ChevronRightIcon } from 'native-base';
import { ScrollView } from 'react-native';
import { CelandarScreenProp } from '../../../navigation/types';

import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';

const events = [
  {
    title: 'IN:  ' + '$32', //Số tiền thu
    start: new Date(2023, 5, 29),
    end: new Date(2023, 5, 29),
  },
  {
    title: 'EX:  ' + '$35', //Số tiền chi
    start: new Date(2023, 5, 29),
    end: new Date(2023, 5, 29),
  },
];

function CalendarScreen (props: CelandarScreenProp) {
  const theme = useContext(themeContext) as themeInterface
  const { navigation } = props;
  const [dayClicked, setDayClicked] = useState(false);
  const [mode, setMode] = useState<any>('month');
  const [dateValue, setDateValue] = React.useState(new Date());

  const isFocused = useIsFocused();

  useEffect(() => {
    setDayClicked(false)
    setDateValue(dateValue);

    getDBConnection().then(db => { });

    if (!isFocused) return;

    // getDBConnection().then((db) => {
    //   getAllDatesList(db, month, year).then((dates) => {
    //     setDateList(dates);
    //   });
    // });
  }, [isFocused]);

  return (
    <View style ={{ flex: 1, backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }}>
      {/* Calendar */}
      <Calendar
        events={events}
        height={600}
        eventCellStyle={[
          // {backgroundColor: 'white'},
          { borderWidth: 1, borderColor: 'green' },
        ]}
        mode="month"
        showAllDayEventCell={false}
        swipeEnabled={true}
        onPressCell={date => {
          setDayClicked(true);
          setDateValue(date);
        }}
      //sortedMonthView={true}
      // headerContainerStyle={HeaderView}
      />

      {/* Hiện chi tiết ngày khi bấm  */}
      {dayClicked && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setDayClicked(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DayBox date={dateValue} />

              {/* Add transaction */}
              <TouchableOpacity
                style={{ margin: 8, bottom: 0, right: 0, backgroundColor: '#F1948A', width: 54, height: 54, borderRadius: 9999, position: 'absolute', shadowRadius: 16, shadowOffset: { width: 4, height: 4 }, alignItems: 'center', justifyContent: 'center' }}>
                <PlusIcon style={{}} size={30} color='white' />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              alignItems: 'center',
              borderTopWidth: 0.2,
            }}>

            <View style={{ flexDirection: 'row', marginEnd: 16, padding: 4 }}>
              <ChevronLeftIcon
                onPress={() => {
                  setDateValue(prevDate => {
                    const newDate = new Date(prevDate);
                    newDate.setDate(newDate.getDate() - 1);
                    return newDate;
                  });
                }}
                style={{
                  marginLeft: 8,
                  marginRight: 24,
                  padding: 12,
                  paddingLeft: 24,
                }}
                size={22}
                color="black"
              />
              <ChevronRightIcon
                onPress={() => {
                  setDateValue(nextDate => {
                    const newDate = new Date(nextDate);
                    newDate.setDate(newDate.getDate() + 1);
                    return newDate;
                  });
                }}
                style={{
                  marginLeft: 8,
                  marginRight: 24,
                  padding: 12,
                  paddingLeft: 24,
                }}
                size={22}
                color="black"
              />
            </View>
            <Pressable
              onPress={() => {
                setDayClicked(false);
              }}
              style={{ marginEnd: 16, padding: 4 }}>
              <Text style={{ fontSize: 20, fontWeight: '500' }}>Close</Text>
            </Pressable>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default React.memo(CalendarScreen);

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    padding: 4,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '100%',
    height: '75%',
  },
});