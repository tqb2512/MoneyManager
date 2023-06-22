import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import {} from 'react-native-heroicons/outline'
import { SettingsScreenProp } from '../../navigation/types'

function Settings(props: SettingsScreenProp){

    const { navigation } = props;

  return (
    <View style={styles.mainContainer}>
        <View style={styles.titleHeader}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'grey', textAlign: 'center' }}>Settings</Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('change_currency') }}>
                <Image style={styles.img} source={require('../../../assets/settingImage/currency.png')} />
                <Text>Currency</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image style={styles.img} source={require('../../../assets/settingImage/export.png')} />
                <Text>Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image style={styles.img} source={require('../../../assets/settingImage/palette.png')} />
                <Text>Theme</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image style={styles.img} source={require('../../../assets/settingImage/help.png')} />
                <Text>Help</Text>
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