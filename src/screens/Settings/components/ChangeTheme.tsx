import { StyleSheet, Switch, Text, View } from 'react-native'
import React, {useState, useContext, useEffect} from 'react'

import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';

const ChangeTheme = () => {

    const theme = useContext(themeContext) as themeInterface

    const bg = theme.background;

    const [mode, setMode] = useState(false);

    useEffect(() => {
        
    }, [mode])

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.descriptionText, { color: theme.color }]}>Switch to change theme</Text>
        
        <Switch 
            value={mode} 
            onValueChange={(value) => {
            setMode(value)
            EventRegister.emit("changeTheme", value)
        }} />
    </View>
  )
}

export default ChangeTheme

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
    },

    descriptionText: {
        color: 'black',
        fontSize: 20,
    }

})