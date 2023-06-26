import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import DayBox from './components/DayBox';
import {DayBox as DayBoxModel} from '../../../models/dayBox';
import {DailyScreenProp} from '../../../navigation/types';
import {NativeBaseProvider} from 'native-base';
import {
  getDBConnection,
  getDayBoxFromMonthYear,
  createTables,
  dropTables,
  importTestData,
  changeAllTransactionsCurrency,
} from '../../../services/db-services';
import Header from '../Header';

import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';

function DailyScreen(props: DailyScreenProp) {

  const theme = useContext(themeContext) as themeInterface
  const {navigation} = props;
  const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);
  useEffect(() => {

    const unsubscribe = navigation.addListener('focus', () => {
      getDBConnection().then(db => {
        getDayBoxFromMonthYear(db, 6, 2023).then(dayBoxes => {
          setDayBoxes(dayBoxes);
        });
      });
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={[styles.mainContainer, { backgroundColor: theme.mode === 'dark' ? theme.background : '#f2f2f2' }]}>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('add_transaction')}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Income, expense, total, bar */}
        {/* Show list view chi tiêt schi tiêu ngày */}
        <View>
          <FlatList
            data={dayBoxes}
            renderItem={({item, index}) => (
              <View>
                <DayBox dayBoxModel={item} navigation={props.navigation} />
                { index === dayBoxes.length - 1 ? 
                (<View style={styles.footerView}>
                  <Text>  </Text>
                </View>) 
                : null}
              </View>
            )}
            keyExtractor={item => item.day.toString()}
          />
        </View>
        <Header />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'column',
    position: 'relative',
    flex: 1
  },

  addButtonText: {
    fontSize: 30,
    color: 'white',
  },
  addButtonContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 16,
    marginBottom: 16,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 100,
  },

  addButton: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 2,
    borderRadius: 100,
    backgroundColor: 'rgba(178, 178, 178, 0.85)',
  },

  footerView: {
    height: 75,
    width: '100%',
  }
});

export default React.memo(DailyScreen);
