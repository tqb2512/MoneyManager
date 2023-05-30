import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryButton from './components/CategoryButton'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParams2 } from '../../navigation'
import { PencilIcon, TrashIcon } from 'react-native-heroicons/outline'
import { getAllCategories, getDBConnection } from '../../services/db-services'
import { Category } from '../../models/category'

export type Prop = {

}

const IncomeCategoryScreen = () => {

  const [CategoryList, setCategoryList] = useState<Category[]>([]);
  
  const navigation = useNavigation<NavigationProp<RootStackParams2>>()

  useEffect(() => {
    getDBConnection().then(db => {
      getAllCategories(db).then(categories => {
        setCategoryList(categories);
      });
    });
    console.log(CategoryList);
  }, [])

  return (
    <View style={styles.mainContainer}>
        {CategoryList.map((item, index) => (
                <Pressable onPress={() => navigation.navigate('EditIncomeCategory', {categoryName: item.name })}>
                  <CategoryButton 
                    key={index}
                    categoryType={item.name} 
                    categoryName={item.name}  />        
                </Pressable>
        )        
        )}

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