import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import AccountGroup from './components/AccountGroup';
import {ThreeDotsIcon} from 'native-base';
import {NativeBaseProvider} from 'native-base';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParams} from '../../navigation';

const Account: React.FC = () => {
  const [showView, setShowView] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const handlePress = () => {
    navigation.navigate('AddAccount');
  };

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.mainContainer}>
        {/* Top bar */}
        <View style={{position: 'relative'}}>
          <View style={styles.firstTopBar}>
            <Text style={{fontSize: 18}}>Accounts</Text>
            <TouchableOpacity
              onPress={() => setShowView(!showView)}
              style={{alignItems: 'center', padding: 4}}>
              <ThreeDotsIcon size="4" mt="0.5" color="#7A7986" />
            </TouchableOpacity>
          </View>

          <View style={styles.secondTopBar}>
            <View style={styles.totalCalc}>
              <Text style={styles.totalElement}>Assets</Text>
              <Text style={{color: '#2416CB', alignSelf: 'center'}}>35.00</Text>
            </View>
            <View style={styles.totalCalc}>
              <Text style={styles.totalElement}>Liabilities</Text>
              <Text style={{color: '#FF914D', alignSelf: 'center'}}>35.00</Text>
            </View>
            <View style={styles.totalCalc}>
              <Text style={styles.totalElement}>Total</Text>
              <Text style={{fontWeight: '600', alignSelf: 'center'}}>
                35.00
              </Text>
            </View>
          </View>
        </View>
        {/* List account */}
        <ScrollView>
          <AccountGroup accountType="Cash" />

          <AccountGroup accountType="Card" />

          <AccountGroup accountType="Accounts" />
        </ScrollView>

        {/* Show add, edit,... */}
        {/* Show Add, edit account, ....... */}

        {showView && (
          <View style={styles.subView}>
            <TouchableOpacity
              style={styles.subViewButton}
              onPress={() => {
                navigation.navigate('AddAccount');
              }}>
              <Text>Add account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.subViewButton}>
              <Text>Delete account</Text>
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
    justifyContent: 'space-between',
    padding: 8,
    paddingTop: 4,
    paddingBottom: 8,
  },
  secondTopBar: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 0.4)',
  },

  totalCalc: {
    justifyContent: 'center',
    width: 100,
  },

  totalElement: {
    alignSelf: 'center',
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
    width: '30%',
    top: 30,
    right: 0,
    zIndex: 100,
    paddingTop: 4,
    paddingBottom: 4,
    borderWidth: 1,
    borderColor: 'rgba(229, 231, 235, 1)',
    shadowRadius: 10,
  },

  subViewButton: {
    borderColor: 'rgba(229, 231, 235, 1)',
    padding: 8,
  },
});
