import React from 'react-native'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import themeContext from '../../../../config/themeContext';
import { themeInterface } from '../../../../config/themeInterface';
import { useContext } from 'react';

export type Props = {
    percentage: any,
    name: any,
    cost: any,
    color: any
};

export default function Category({percentage, name, cost, color}: Props) {

    const theme = useContext(themeContext) as themeInterface

  return (
    <SafeAreaView>
        <TouchableOpacity style={[styles.container, { backgroundColor: theme.componentBackground }]}>
            <View style={styles.percentageNameContainer}>
                <Text style={{
                    fontSize: 18, 
                    paddingHorizontal: 10, 
                    borderRadius: 3,
                    color: 'white',
                    backgroundColor:color
                    }}>{percentage.toFixed(2)}%</Text>
                <Text style={[styles.nameText, { color: theme.color }]}>{name}</Text>
            </View>
            <View style={styles.costContainer}>
                <Text style={[styles.costText, { color: theme.color }]}>$ {cost}</Text>
            </View>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        borderWidth: 0.6,
        borderColor:'#EEEEEE',
        backgroundColor:'white',
        padding: 15,
    },
    percentageNameContainer:{
        flex: 1,
        flexDirection:'row',
        width: '15%',
        alignItems: 'center'
    },
    costContainer:{
        flex: 0,
        flexDirection:'row',
    },
    percentageText:{
        fontSize: 18,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderRadius: 3
    },
    costText:{
        fontSize: 18,
        color: 'grey',
        fontWeight: '500',
        paddingRight: 15
    },
    nameText:{
        fontSize: 18,
        color: 'grey',
        fontWeight: '500',
        paddingLeft: 15
    }
})