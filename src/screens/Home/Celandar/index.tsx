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
import { getDBConnection } from '../../../services/db-services';
import { useIsFocused } from '@react-navigation/native';
import DayBox from '../Daily/components/DayBox';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from 'react-native-heroicons/outline';
import { ChevronLeftIcon, ChevronRightIcon } from 'native-base';
import { ScrollView, Button, Dimensions } from 'react-native';
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

const SCREEN_HEIGHT = Dimensions.get('window').height

function CalendarScreen (props: CelandarScreenProp) {
  const theme = useContext(themeContext) as themeInterface
  const { navigation } = props;
  const [dayClicked, setDayClicked] = useState(false);
  const [mode, setMode] = useState<any>('month');
  const [dateValue, setDateValue] = React.useState(new Date());
  const [date, setDate] = React.useState(new Date());
  const [calendarEvents, setCalendarEvents] = React.useState(events);
  

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
    <View>
      <View>
        <View>
          <Button title="Today" />
          <Button title="<" />
          <Button title=">" />
          <View>
            <Text>MMMM YYYY</Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 16 }}>
        <Calendar
          date={date}
          height={SCREEN_HEIGHT - 80}
          events={calendarEvents}
          mode={mode}
          headerContentStyle={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          dayHeaderStyle={{
            marginLeft: 10,
            backgroundColor: '#f1f1f1',
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 12,
          }}
          dayHeaderHighlightColor={'#000'}
          weekDayHeaderHighlightColor={'#aaa'}
          headerComponent={
            <Text style={{ color: '#aaa', fontSize: 25 }}>CalendarBody's headerComponent</Text>
          }
          headerComponentStyle={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
          hourStyle={{ color: '#355070', fontSize: 15 }}
          showAllDayEventCell={false}
        />
      </View>
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