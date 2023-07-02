import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import themeContext from '../../../config/themeContext';
import {themeInterface} from '../../../config/themeInterface';

type Props = {};

export default function StatsHeaderRight({}: Props) {
  const theme = useContext(themeContext) as themeInterface;

  const timeOptions = ['Monthly', 'Yearly'];

  return (
    <View style={styles.datePicker}>
      <SelectDropdown
        data={timeOptions}
        defaultButtonText="Monthly"
        buttonTextStyle={[
          styles.selectDropDownText,
          {color: theme.mode === 'dark' ? 'white' : 'grey'},
        ]}
        buttonStyle={[
          styles.selectDropDownContainer,
          {backgroundColor: theme.componentBackground},
        ]}
        rowStyle={[
          styles.rowContainer,
          {backgroundColor: theme.componentBackground},
        ]}
        renderDropdownIcon={() => (
          <Ionicons name="ios-caret-down-outline" size={26} color="#ABB2B9" />
        )}
        dropdownIconPosition="right"
        onSelect={(selectedItem, index) => {
          //updateChart(selectedItem);
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
        rowTextStyle={
          theme.mode === 'dark' ? styles.textDark : styles.textLight
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  datePicker: {
    justifyContent: 'flex-end',
    marginRight: '10%',
    marginLeft: '1%',
    marginBottom: 8,
  },
  selectDropDownText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'grey',
  },
  selectDropDownContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderBottomColor: '#ABB2B9',
    borderBottomWidth: 0,
    paddingTop: '5%',
    paddingBottom: '0%',
    paddingHorizontal: '3%',
    alignItems: 'center',
    width: 125,
  },
  rowContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-start',
  },
  textDark: {
    color: 'white',
  },

  textLight: {
    color: 'grey',
  },
});
