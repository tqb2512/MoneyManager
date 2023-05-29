import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export type Props = {
    accountType: String

}

const AccountGroup:React.FC<Props> = ({ accountType }) => {
  return (
    <View style={styles.mainContainer}>

      <View style={styles.accountLabel}>
         <Text style={{fontWeight: '600', fontSize: 16}}>{accountType}</Text>
         <Text>$35</Text>
      </View>
    {/* list accounts */}

        <TouchableOpacity style={styles.accountButton}>
            <Text>AccountName</Text>
            <Text>$35</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.accountButton}>
            <Text>AccountName</Text>
            <Text>$69</Text>
        </TouchableOpacity>

      </View>
  )
}

export default AccountGroup

const styles = StyleSheet.create({
    mainContainer: {
        marginTop: 16
    },

    accountLabel: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        margin: 8,
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