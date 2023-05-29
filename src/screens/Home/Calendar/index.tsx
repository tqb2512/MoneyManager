
import React, {useState} from 'react';
import {Touchable, TouchableOpacity, View, Button} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Text} from 'react-native-svg';

interface MarkedDates {
  [dateString: string]: {
    marked: boolean;
    dotColor: string;
  };
}

const CalendarPicker: React.FC = () => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [selected, setSelected] = useState('');

  const markDate = (dateString: string) => {
    if (markedDates[dateString]) {
      const newMarkedDates = {...markedDates};
      delete newMarkedDates[dateString];
      setMarkedDates(newMarkedDates);
    } else {
      setMarkedDates({
        ...markedDates,
        [dateString]: {
          marked: true,
          dotColor: 'blue',
        },
      });
    }
  };

  console.log(markedDates);
  return (
    <View>
      <View>
        <Calendar
          // Đánh dấu ngày và bấm detail ngày
          onDayLongPress={({dateString}) => markDate(dateString)}
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={markedDates}
          markingType={'dot'}
        />
      </View>
        <Button title={selected} />
    </View>
  );
};

export default CalendarPicker;
