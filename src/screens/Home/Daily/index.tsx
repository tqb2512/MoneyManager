import { SafeAreaView, FlatList, TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import DayBox from './components/DayBox';
import { DayBox as DayBoxModel } from '../../../models/dayBox';
import { DailyScreenProp } from '../../../navigation/types';
import { NativeBaseProvider } from 'native-base';
import { getDBConnection, getDayBoxFromMonthYear, createTables, dropTables, importTestData } from '../../../services/db-services';

function DailyScreen (props: DailyScreenProp) {
  
  const { navigation } = props;
  const [dayBoxes, setDayBoxes] = React.useState<DayBoxModel[]>([]);

  useEffect(() => {
    getDBConnection().then((db) =>{
      //createTables(db);
      //importTestData(db);
    })

    const unsubscribe = navigation.addListener("focus", () => {
      getDBConnection().then((db) => {
        getDayBoxFromMonthYear(db, 6, 2023).then((dayBoxes) => {
          setDayBoxes(dayBoxes);
        });
      });
    });
    console.log(dayBoxes)
    return unsubscribe;
  }, [navigation]);

  return (

    <NativeBaseProvider>
      <SafeAreaView style={styles.mainContainer}>
        {/* Income, expense, total, bar */}
        {/* Show list view chi tiêt schi tiêu ngày */}

        <FlatList
          data={dayBoxes}
          renderItem={({ item }) => <DayBox dayBoxModel={item} navigation = {props.navigation}/>}
          keyExtractor={(item) => item.day.toString()}
        />

          <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("add_transaction")}
            >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          </View>
        
      </SafeAreaView>
    </NativeBaseProvider>

  );
};

const styles = StyleSheet.create({
  mainContainer:{
    flexDirection: 'column'
  },
  addButton:{
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'rgba(178, 178, 178, 0.85)'
  },
  addButtonText:{
    fontSize: 30,
    color: 'white'
  },
  addButtonContainer:{
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: "2.5%",
    marginBottom: "10%",
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
})

export default React.memo(DailyScreen);