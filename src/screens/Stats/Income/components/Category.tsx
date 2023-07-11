import React from 'react-native'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import themeContext from '../../../../config/themeContext';
import { themeInterface } from '../../../../config/themeInterface';
import { useContext } from 'react';
import { Language, CategoryList } from '../../../../models/language';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../../../../config/language/en';
import vi from '../../../../config/language/vi';
import { Currency } from '../../../../models/currency';
import { useEffect } from 'react';
import { useState } from 'react';

export type Props = {
    percentage: any,
    name: any,
    cost: any,
    color: any
};

export default function Category({ percentage, name, cost, color }: Props) {

    const theme = useContext(themeContext) as themeInterface

    const [languagePack, setLanguagePack] = useState<Language>({} as Language);
    const [currency, setCurrency] = useState<Currency>({} as Currency);
    const [loaded, setLoaded] = useState<boolean>(false);

    useEffect(() => {

        AsyncStorage.getItem('language').then(language => {
            setLoaded(false);
            if (language == 'vi') {
                setLanguagePack(vi);
            } else {
                setLanguagePack(en);
            }
            setLoaded(true);
        })
        AsyncStorage.getItem('currency').then(currency => {
            setCurrency(JSON.parse(currency || '{}'));
        })

    }, [])

    return (
        <SafeAreaView>
            <TouchableOpacity style={[styles.container, { backgroundColor: theme.componentBackground }]}>
                <View style={styles.percentageNameContainer}>
                    <Text style={{
                        fontSize: 18,
                        paddingHorizontal: 10,
                        borderRadius: 3,
                        color: 'white',
                        backgroundColor: color
                    }}>{percentage.toFixed(2)}%</Text>
                    <Text style={[styles.nameText, { color: theme.color }]}>{loaded == true ? languagePack.categories[CategoryList.indexOf(name.toLowerCase())][1] : ''}</Text>
                </View>
                <View style={styles.costContainer}>
                    <Text style={[styles.costText, { color: theme.color }]}>{currency.symbol} {cost}</Text>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: 0.6,
        borderColor: '#EEEEEE',
        backgroundColor: 'white',
        padding: 15,
    },
    percentageNameContainer: {
        flex: 1,
        flexDirection: 'row',
        width: '15%',
        alignItems: 'center'
    },
    costContainer: {
        flex: 0,
        flexDirection: 'row',
    },
    percentageText: {
        fontSize: 18,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderRadius: 3
    },
    costText: {
        fontSize: 18,
        color: 'grey',
        fontWeight: '500',
        paddingRight: 15
    },
    nameText: {
        fontSize: 18,
        color: 'grey',
        fontWeight: '500',
        paddingLeft: 15
    }
})