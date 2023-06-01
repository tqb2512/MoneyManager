import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export type Props = {
    accountType: String
}

const AccountGroup:React.FC<Props> = ({ accountType }) => {
  return (
    <View style={styles.mainContainer}>

      <View style={styles.accountLabel}>
         <Text style={styles.totalElement}>{accountType}</Text>
         <Text style={styles.moneyText}>$ 35</Text>
      </View>
      
    {/* list accounts */}

        <TouchableOpacity style={styles.accountButton}>
            <Text style={styles.accountText}>AccountName</Text>
            <Text style={styles.moneyText}>$ 35</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
            <Text style={styles.accountText}>AccountName</Text>
            <Text style={styles.moneyText}>$ 69</Text>
        </TouchableOpacity>

      </View>
  )
}

export default AccountGroup

/* #7DCEA0 - green, #F1948A - red */

const styles = StyleSheet.create({

    mainContainer: {
        marginTop: 16
    },

    accountLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        paddingHorizontal: 16,
    },

    moneyText:{
        color: 'black', 
        alignSelf: 'center', 
        fontSize: 18, 
        fontWeight:'bold'
    },

    totalElement: {
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: "600"
    },

    accountText:{
        alignSelf: 'center',
        fontSize: 16,
        fontWeight: "400",
        color: 'black'
    },

    accountButton: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(229, 231, 235, 0.4)'
    },
})