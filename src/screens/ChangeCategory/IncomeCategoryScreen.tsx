import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CategoryButton from './components/CategoryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams2 } from '../../navigation'
import { PencilIcon, TrashIcon } from 'react-native-heroicons/outline'

export type Prop = {

}

const IncomeCategoryScreen = () => {
  
  const navigation = useNavigation<NavigationProp<RootStackParams2>>()

  return (
    <View style={styles.mainContainer}>
      <Pressable onPress={() => navigation.navigate('EditIncomeCategory', {categoryName: 'Salary'})}>
        <CategoryButton categoryType='income' categoryName='Salary' />        
      </Pressable>
    </View>
  )
}

export default IncomeCategoryScreen

const styles = StyleSheet.create({
    mainContainer: {

     },
    saveButton: {
      backgroundColor: '#46CDCF',
      borderRadius: 4,
      padding: 10,
      width: '90%',
      marginTop: 48,
      alignItems: 'center',
      alignSelf: 'center',
    },
    icon: {
      marginLeft: 8,
      marginRight: 8,
    },
})