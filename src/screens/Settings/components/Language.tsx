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

    React.useEffect(() => {
        const getLanguageValue = async () => {
            const value = await AsyncStorage.getItem('language')
            if (value !== null) {
                if (value === 'en') {
                    setLanguagePack(en);
                } else if (value === 'vi') {
                    setLanguagePack(vi);
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

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.componentBackground }]} onPress={() => changeLanguage("en")}>
        <Image style={styles.img} source={require('../../../../assets/flagImage/united-kingdom.png')} />
        <Text style={[styles.text, { color: theme.color }]}>English</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, { backgroundColor: theme.componentBackground }]} onPress={() => changeLanguage("vi")}>
        <Image style={styles.img} source={require('../../../../assets/flagImage/vietnam.png')} />
        <Text style={[styles.text, { color: theme.color }]}>Tiếng Việt</Text>
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
      },
      button: {
        flexDirection: 'row',
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
