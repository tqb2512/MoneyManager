import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Image
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Calendar } from 'react-native-big-calendar';
import { getDBConnection, getEventsFromMonth, getDayBoxFromDate } from '../../../services/db-services';
import { useIsFocused } from '@react-navigation/native';
import DayBox from '../Daily/components/DayBox';
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon, ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/outline';
import { ScrollView, Button, Dimensions } from 'react-native';
import { CelandarScreenProp } from '../../../navigation/types';
import { Event } from '../../../models/event';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { Currency } from '../../../models/currency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DayBox as DayBoxModel } from '../../../models/dayBox';
import { Language } from '../../../models/language';
import vi from '../../../config/language/vi';
import en from '../../../config/language/en';
import { SafeAreaView } from 'react-native-safe-area-context';

const SCREEN_HEIGHT = Dimensions.get('window').height

function CalendarScreen(props: CelandarScreenProp) {
  const theme = useContext(themeContext) as themeInterface
  const { navigation } = props;
  const [dayClicked, setDayClicked] = useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dateValue, setDateValue] = React.useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [currency, setCurrency] = useState<Currency>({} as Currency);
  const [dayBox, setDayBox] = useState<DayBoxModel>({} as DayBoxModel);
  const [languagePack, setLanguagePack] = useState<Language>({} as Language);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getCurrencyValue = async () => {
        const value = await AsyncStorage.getItem('currency')
        if (value !== null) {
          setCurrency(JSON.parse(value));
        }
      }
      getCurrencyValue()

      const getLanguagePack = async () => {
        const value = await AsyncStorage.getItem('language')
        if (value === 'vi') {
          setLanguagePack(vi);
        } else {
          setLanguagePack(en);
        }
      }
      getLanguagePack()

      getDBConnection().then(db => {
        getEventsFromMonth(db, date.getMonth() + 1, date.getFullYear()).then(events => {
          setCalendarEvents(events);
        });
      });
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getDBConnection().then(db => {
      getEventsFromMonth(db, date.getMonth() + 1, date.getFullYear()).then(events => {
        setCalendarEvents(events);
      });
    });
  }, [date]);

  useEffect(() => {
    getDBConnection().then(db => {
      getDayBoxFromDate(db, dateValue).then(dayBox => {
        setDayBox(dayBox);
      });
    });
  }, [dateValue]);

  const prevMonth = () => {
    console.log(date);
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
    <View
      style={{
        flex: 1,
        backgroundColor:
          theme.mode === 'dark' ? theme.componentBackground : 'white',
      }}>
      <View
        style={[
          styles.timecontrolContainer,
          {backgroundColor: theme.componentBackground},
        ]}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              setDate(new Date());
            }}
            style={[styles.prevNextButton, {borderColor: theme.color}]}>
            <Text style={{fontWeight: '500', color: theme.color}}>
              {' '}
              {languagePack.today}{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={prevMonth}
            style={[styles.prevNextButton, {borderColor: theme.color}]}>
            <ChevronLeftIcon size={20} color={theme.color} />
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginStart: 0,
            }}>
            <Text style={{color: theme.color, fontWeight: '500'}}>
              {date.getMonth() + 1}/{date.getFullYear()}
            </Text>
          </View>

          <TouchableOpacity
            onPress={nextMonth}
            style={[styles.prevNextButton, {borderColor: theme.color}]}>
            <ChevronRightIcon size={20} color={theme.color} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: theme.componentBackground}}>
        <Calendar
          date={date}
          height={SCREEN_HEIGHT - 230}
          events={calendarEvents}
          onPressEvent={() => {
            setDateValue();
            setDayClicked(true);
          }}
          onPressCell={event => {
            setDateValue(event);
            setDayClicked(true);
          }}
          mode={'month'}
          eventCellStyle={event => {
            return {backgroundColor: event.color, alignItems: 'center'};
          }}
          swipeEnabled={false}
          
        />
      </View>

      {dayClicked && (
        <Modal
          animationType="slide"
          transparent={true}
          onRequestClose={() => navigation.goBack()}
          onDismiss={() => navigation.goBack()}>
          <View style={styles.centeredView}>
            <View
              style={[styles.modalView, {backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2'}]}>
              <DayBox
                dayBoxModel={dayBox}
                currency={currency}
                navigation={navigation}
                showFooter={true}
              />
              
              {dayBox.transactions.length === 0 && (
                <View>
                  <Image
                    source={require('../../../../assets/settingImage/notransacs.png')}
                    style={{
                      width: 80,
                      height: 80,
                      tintColor: theme.color,
                      alignSelf: 'center',
                      marginTop: '40%',
                    }}
                  />
                  <Text
                    style={{
                      color: theme.color,
                      alignSelf: 'center',
                      paddingTop: 4,
                    }}>
                    {languagePack.nodata}
                  </Text>
                </View>
              )}
              {/* Add transaction */}
              <TouchableOpacity
                onPress={() => {
                  setDayClicked(false);
                  navigation.navigate('add_transaction');
                }}
                style={{
                  margin: 8,
                  bottom: 3,
                  right: 0,
                  backgroundColor: '#2196f3',
                  width: 54,
                  height: 54,
                  borderRadius: 9999,
                  position: 'absolute',
                  shadowRadius: 16,
                  shadowOffset: {width: 4, height: 4},
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <PlusIcon style={{}} size={30} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              backgroundColor: theme.componentBackground,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              height: 50,
              alignItems: 'center',
              borderTopWidth: 0.2,
            }}>
            <View style={{flexDirection: 'row', marginEnd: 16, padding: 4}}>
              <ChevronLeftIcon
                onPress={() => {
                  setDateValue(
                    new Date(
                      dateValue.getFullYear(),
                      dateValue.getMonth(),
                      dateValue.getDate() - 1,
                    ),
                  );
                }}
                style={{
                  marginLeft: 8,
                  marginRight: 24,
                  padding: 12,
                  paddingLeft: 24,
                }}
                size={22}
                color={theme.color}
              />
              <ChevronRightIcon
                onPress={() => {
                  setDateValue(
                    new Date(
                      dateValue.getFullYear(),
                      dateValue.getMonth(),
                      dateValue.getDate() + 1,
                    ),
                  );
                }}
                style={{
                  marginLeft: 8,
                  marginRight: 24,
                  padding: 12,
                  paddingLeft: 24,
                }}
                size={22}
                color={theme.color}
              />
            </View>
            <Pressable
              onPress={() => {
                setDayClicked(false);
              }}
              style={{marginEnd: 16, padding: 4}}>
              <Text
                style={{fontSize: 20, fontWeight: '500', color: theme.color}}>
                {languagePack.close}
              </Text>
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
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    width: '100%',
    height: '75%',
  },

  prevNextButton: {
    borderWidth: 0.6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 6,
    padding: 6,
  },
});