import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type ComponentProps = {
    categoryName: String,
    onSelect: 
}

const Categories: React.FC<ComponentProps> = ({ categoryName }) => {
  return (
    <View>
      <Text>Categories</Text>
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({})