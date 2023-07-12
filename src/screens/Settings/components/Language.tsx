import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useContext } from 'react';
import {LanguageProp} from '../../../navigation/types';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { CheckCircleIcon } from 'react-native-heroicons/solid'
import themeContext from '../../../config/themeContext';
import { themeInterface } from '../../../config/themeInterface';
import { Language as LanguageModel } from '../../../models/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../../../config/language/en';
import vi from '../../../config/language/vi';

function Language(props: LanguageProp) {
  
    const {navigation} = props;
    const theme = useContext(themeContext) as themeInterface 
    const [languagePack, setLanguagePack] = React.useState<LanguageModel>({} as LanguageModel);
    const [currentLanguage, setCurrentLanguage] = React.useState<String>('')

    React.useEffect(() => {
        const getLanguageValue = async () => {
            const value = await AsyncStorage.getItem('language')
            if (value !== null) {
                if (value === 'en') {
                    setLanguagePack(en);
                    setCurrentLanguage('en')
                } else if (value === 'vi') {
                    setLanguagePack(vi);
                    setCurrentLanguage('vi')
                }
            }
        }
        getLanguageValue()
    }, []);


    const changeLanguage = async (language: string) => {
        await AsyncStorage.setItem('language', language);
        if (language === 'en') {
            await AsyncStorage.setItem('languagePack', 'en');
            setLanguagePack(en);
        } else if (language === 'vi') {
            await AsyncStorage.setItem('languagePack', 'vi');
            setLanguagePack(vi);
        }
    }
                      

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View
        style={[
          styles.navigateHeader,
          {backgroundColor: theme.componentBackground},
        ]}>
        <View style={styles.backButton}>
          <ChevronLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            size={20}
            color={theme.color}
          />
          <Text style={[styles.accountNameTxt, {color: theme.color}]}>
            Change Language
          </Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.componentBackground }]} onPress={() => {changeLanguage("en"); setCurrentLanguage('en')}}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.img} source={require('../../../../assets/flagImage/united-kingdom.png')} />
          <Text style={[styles.text, { color: theme.color }]}>English</Text>
        </View>
        {currentLanguage === 'en' ? <CheckCircleIcon style={{ alignSelf: 'center', marginStart: 12 }} size={20} color='#1056B4' /> : null}
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.componentBackground }]} onPress={() => {changeLanguage("vi"); setCurrentLanguage('vi')}}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={styles.img} source={require('../../../../assets/flagImage/vietnam.png')} />
          <Text style={[styles.text, { color: theme.color }]}>Tiếng Việt</Text>
        </View>
        {currentLanguage === 'vi' ? <CheckCircleIcon style={{ alignSelf: 'center', marginStart: 12 }} size={20} color='#1056B4' /> : null}
      </TouchableOpacity>


    </SafeAreaView>
  );
}

export default Language;

const styles = StyleSheet.create({
    navigateHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 12,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
      },
    
      backButton: {
        flexDirection: 'row',
        alignItems: 'center',
      },

      accountNameTxt: {
        marginLeft: 24,
        fontSize: 18,
        color: 'black',  
        fontWeight: '600',
      },
      button: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12, 
        borderBottomWidth: 1,
        borderBottomColor: 'grey'
      },

      text: {
        marginStart: 36,
        fontWeight: '500', 
        fontSize: 16,
        alignSelf: 'center',
      },
      
      img: {
        width: 48,
        height: 32,
        borderRadius: 4, 
      },
});
