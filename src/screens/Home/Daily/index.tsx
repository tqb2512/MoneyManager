
import { SafeAreaView, ScrollView as ScrollViewRN, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import DayInfo from './components/DayInfo';
import DayBox from './components/DayBox';
import { Transaction } from '../../../models/transaction';
import { getDBConnection,  getAllDatesListByMonth} from '../../../services/db-services';
import { NativeBaseProvider, ScrollView } from 'native-base';
import { useFocus } from 'native-base/lib/typescript/components/primitives';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { RootStackParams2 } from '../../../navigation';

const Daily = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams2>>();

  const [DateList, setDateList] = React.useState<Date[]>([]);
  const [isSort, setIsSort] = React.useState<boolean>(false);

  const isFocused = useIsFocused();

  useEffect(() => {

    const unsubscribe = navigation.addListener("tabPress", () => {
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      getDBConnection().then((db) => {
        getAllDatesListByMonth(db, month, year).then((dates) => {
          setDateList(dates);
        });
      });

    });
    
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {

    var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      getDBConnection().then((db) => {
        getAllDatesListByMonth(db, month, year).then((dates) => {
          setDateList(dates);
        });
      });
  }, [isFocused]);

  const sortDateList = () => {
    var sortedDateList = DateList.sort((a, b) => {
      return b.getTime() - a.getTime();
    }
    );
    setDateList(sortedDateList);
    setIsSort(true);
  }

  return (
    <NativeBaseProvider>
      <SafeAreaView>
        {/* Income, expense, total, bar */}
        {/* Show list view chi tiêt schi tiêu ngày */}

        <ScrollView>
          {DateList.map((date, index) => {
            return <DayBox key={index} date={date} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Daily;

const styles = StyleSheet.create({

});
