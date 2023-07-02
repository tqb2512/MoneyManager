import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import {} from 'react-native-heroicons/outline'
import { SettingsScreenProp } from '../../navigation/types'

import themeContext from '../../config/themeContext'
import { themeInterface } from '../../config/themeInterface'

function Settings(props: SettingsScreenProp){

    const theme = useContext(themeContext) as themeInterface;

    const { navigation } = props;

  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
        <View style={styles.titleHeader}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.color, textAlign: 'center' }}>Settings</Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('change_currency') }}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/currency.png')} />
                <Text style={{ color: theme.color }}>Currency</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/export.png')} />
                <Text style={{ color: theme.color }}>Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("change_theme")}}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/palette.png')} />
                <Text style={{ color: theme.color }}>Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/help.png')} />
                <Text style={{ color: theme.color }}>Help</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: 'white',
    },

    titleHeader: {
        // width: "80%"
        marginTop: 8,
        marginBottom: 24,
    },

    buttonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: '5%',
        justifyContent: 'center',
    },

    button: {
        padding: 20,
        width: '33.33%',
        alignItems: 'center',
        alignSelf: 'center'
    },

    img: {
        width: 48, 
        height: 48,
        marginBottom: 8,
    }
})