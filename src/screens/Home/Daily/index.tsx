import {
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
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
} from '../../../services/db-services';
import Header from '../Header';

function DailyScreen(props: DailyScreenProp) {
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
    console.log(dayBoxes);
    return unsubscribe;
  }, [navigation]);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('add_transaction')}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Income, expense, total, bar */}
        {/* Show list view chi tiêt schi tiêu ngày */}
        <FlatList
          data={dayBoxes}
          renderItem={({item}) => (
            <DayBox dayBoxModel={item} navigation={props.navigation} />
          )}
          keyExtractor={item => item.day.toString()}
        />
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
});

export default React.memo(DailyScreen);
