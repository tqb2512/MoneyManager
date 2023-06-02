import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import AccountGroup from './components/AccountGroup';
import {ThreeDotsIcon} from 'native-base';
import {NativeBaseProvider} from 'native-base';
import {NavigationProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParams } from '../../navigation';
import { Account as AccountModel } from '../../models/account';
import { getDBConnection, getExistedAccountType } from '../../services/db-services';

const Account: React.FC = () => {
  const [showView, setShowView] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
    // useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [typeList, setTypeList] = useState<string[]>([]);

  const handlePress = () => {
    navigation.navigate('AddAccount');
  };

  //refresh when back to this screen
  const isFocused = useIsFocused();

  useEffect(() => {
    getDBConnection().then((db) => {
      getExistedAccountType(db).then((data) => {
        setTypeList(data);
      });
    });
  }, [isFocused]);
    
  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.mainContainer}>
        {/* Top bar */}
        <View style={{position: 'relative'}}>
          <View style={styles.firstTopBar}>
            <View style={styles.titleHeader}>
              <Text style={{fontSize: 20, fontWeight:'bold', color:'black', textAlign:'center'}}>Accounts</Text>
            </View>
            <View style={styles.threeDots}>
              <TouchableOpacity
                onPress={() => setShowView(!showView)}
                style={{alignItems: 'center', padding: 4}}>
                <ThreeDotsIcon size="4" mt="0.5" color="#7A7986" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.secondTopBar}>
            <View style={styles.totalCalc}>
              <Text style={styles.totalElement}>Assets</Text>
              <Text style={{color: '#7DCEA0', alignSelf: 'center', fontSize: 18, fontWeight:'bold'}}>
                $ 35.00
              </Text>
            </View>
            <View style={styles.totalCalc}>
              <Text style={styles.totalElement}>Liabilities</Text>
              <Text style={{color: '#F1948A', alignSelf: 'center', fontSize: 18, fontWeight:'bold'}}>
                $ 35.00
              </Text>
            </View>
            <View style={styles.totalCalc}>
              <Text style={styles.totalElement}>Total</Text>
              <Text style={{color: 'black', alignSelf: 'center', fontSize: 18, fontWeight:'bold'}}>
                $ 35.00
              </Text>
            </View>
          </View>
        </View>
        {/* List account */}
        <ScrollView>
          {typeList.map((type) => (
            <AccountGroup key={type} type={type} />
          ))}
        </ScrollView>

        {/* Show add, edit,... */}
        {/* Show Add, edit account, ....... */}

        {showView && (
          <View style={styles.subView}>
            <TouchableOpacity
              style={styles.addThreeDotsContainer}
              onPress={() => { 
                navigation.navigate('AddAccount')
                setShowView(false)
               }}>
              <Text style={styles.threeDotsText}>Add</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => { navigation.navigate('DeleteAccount')}}
              style={styles.deleteThreeDotsContainer}>
              <Text style={styles.threeDotsText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </NativeBaseProvider>
  );
};

export default Account;

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
  },

  firstTopBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 8,
    paddingTop: 4,
    paddingBottom: 8,
  },
  titleHeader:{
    width: "80%"
  },
  threeDots:{
    width: "10%"
  },
  secondTopBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.4)',
  },

  totalCalc: {
    justifyContent: 'center',
    width: 100,
  },

  totalElement: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: "600"
  },

  threeDotsText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: "600"
  },

  viewShow: {
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.4)',
  },

  subView: {
    backgroundColor: 'white',
    position: 'absolute',
    width: '32%',
    top: 30,
    right: 0,
    zIndex: 100,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    shadowRadius: 10,
  },

  deleteThreeDotsContainer: {
    borderColor: 'rgba(229, 231, 235, 1)',
    padding: 8,
  },
  addThreeDotsContainer: {
    borderColor: 'rgba(229, 231, 235, 1)',
    borderBottomWidth: 0.4,
    padding: 8,
  },
});
