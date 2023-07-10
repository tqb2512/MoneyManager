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
import { getDBConnection, getEventsFromMonth, getDayBoxFromDate } from '../../../services/db-services';
import { useIsFocused } from '@react-navigation/native';
import DayBox from '../Daily/components/DayBox';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from 'react-native-heroicons/outline';
import { ChevronLeftIcon, ChevronRightIcon } from 'native-base';
import { ScrollView, Button, Dimensions } from 'react-native';
import { CelandarScreenProp } from '../../../navigation/types';
import { Event } from '../../../models/event';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { Currency } from '../../../models/currency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayBox as DayBoxModel } from '../../../models/dayBox';

const SCREEN_HEIGHT = Dimensions.get('window').height

function CalendarScreen (props: CelandarScreenProp) {
  const theme = useContext(themeContext) as themeInterface
  const { navigation } = props;
  const [dayClicked, setDayClicked] = useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateValue, setDateValue] = React.useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [currency, setCurrency] = useState<Currency>({} as Currency);
  const [dayBox, setDayBox] = useState<DayBoxModel>({} as DayBoxModel);

  useEffect(() => {
    getDBConnection().then(db => {
      getEventsFromMonth(db, date.getMonth() + 1, date.getFullYear()).then(events => {
        setCalendarEvents(events);
      });
    });
  }, [date]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getCurrencyValue = async () => {
        const value = await AsyncStorage.getItem('currency')
        if (value !== null) {
          setCurrency(JSON.parse(value));
        }
      }
      getCurrencyValue()
    });
    return unsubscribe;
  }, [navigation]);

  const prevMonth = () => {
    setTimeout(() => {
      setDate(new Date(date.getFullYear(), date.getMonth() - 1, date.getDate()));
    }, 100);
  };

  const nextMonth = () => {
    setTimeout(() => {
      setDate(new Date(date.getFullYear(), date.getMonth() + 1, date.getDate()));
    }, 100);
  };

  return (
    <View style ={{ flex: 1, backgroundColor: theme.mode === 'dark' ? theme.componentBackground : 'white' }}> 
      <View style={[styles.timecontrolContainer, { backgroundColor: theme.componentBackground }]} >
        <View style={styles.buttonContainer}>
          <Button color="#2196f3" title=" Today " onPress={() => {setDate(new Date())}}/>
          <Button color="#2196f3" title=" < " onPress={prevMonth}/>
          <Button color="#2196f3" title=" > " onPress={nextMonth}/>
          <View style={{ alignItems:'center', justifyContent: 'center', marginStart: 8 }}>
            <Text style={{ color: theme.color }} >{date.getMonth() + 1}/{date.getFullYear()}</Text>
          </View>
        </View>
      </View>
      <View style={{ backgroundColor: theme.componentBackground }}>
        <Calendar
          date={date}
          height={SCREEN_HEIGHT - 230}
          events={calendarEvents}
          mode={'month'}
          eventCellStyle={(event) => {
            return { backgroundColor: event.color, alignItems: 'center' };
          }}
          swipeEnabled={false}
          onPressCell={(event) => {
            getDBConnection().then(db => {
              getDayBoxFromDate(db, event).then(dayBox => {
                setDayBox(dayBox);
                setDayClicked(true);
                setDateValue(event);
              });
            });
          }}
        />
      </View>

      {dayClicked && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => setDayClicked(false)}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DayBox dayBoxModel={dayBox} currency={currency} navigation={navigation}/>

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
                  getDBConnection().then(db => {
                    getDayBoxFromDate(db, new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate() - 1)).then(dayBox => {
                      setDateValue(new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate() - 1));
                      setDayBox(dayBox);
                    });
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
                  getDBConnection().then(db => {
                    getDayBoxFromDate(db, new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate() + 1)).then(dayBox => {
                      setDateValue(new Date(dateValue.getFullYear(), dateValue.getMonth(), dateValue.getDate() + 1));
                      setDayBox(dayBox);
                    });
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
  timecontrolContainer: {
    // backgroundColor: 'grey',
  },

  buttonContainer: {
    paddingVertical: 8, 
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: 240, 
  },

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