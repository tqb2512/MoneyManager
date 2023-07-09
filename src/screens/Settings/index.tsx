import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React, { useContext } from 'react'
import {} from 'react-native-heroicons/outline'
import { SettingsScreenProp } from '../../navigation/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect } from 'react'
import { Language } from '../../models/language'
import en from '../../config/language/en'
import vi from '../../config/language/vi'

import themeContext from '../../config/themeContext'
import { themeInterface } from '../../config/themeInterface'

function Settings(props: SettingsScreenProp){

    const theme = useContext(themeContext) as themeInterface;

    const [languagePack, setLanguagePack] = React.useState<Language>({} as Language);

    const { navigation } = props;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            const getLanguageValue = async () => {
                const value = await AsyncStorage.getItem('language')
                if (value !== null) {
                    if (value === 'en') {
                        setLanguagePack(en);
                    } else {
                        setLanguagePack(vi);
                    }
                }
            }
            getLanguageValue()
        });
        return unsubscribe;
    }, [navigation]);


  return (
    <View style={[styles.mainContainer, { backgroundColor: theme.background }]}>
        <View style={styles.titleHeader}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.color, textAlign: 'center' }}>{languagePack.settings}</Text>
        </View>

        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate('change_currency') }}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/currency.png')} />
                <Text style={{ color: theme.color }}>{languagePack.currency}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/export.png')} />
                <Text style={{ color: theme.color }}>{languagePack.data}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate("change_theme")}}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/palette.png')} />
                <Text style={{ color: theme.color }}>{languagePack.theme}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => { navigation.navigate("language") }}>
                <Image style={[styles.img, { tintColor: theme.color }]} source={require('../../../assets/settingImage/language.png')} />
                <Text style={{ color: theme.color }}>{languagePack.language}</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default React.memo(Settings)

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
        width: '49%',
        alignItems: 'center',
        alignSelf: 'center'
    },

    img: {
        width: 64, 
        height: 64,
        marginBottom: 8,
    }
})