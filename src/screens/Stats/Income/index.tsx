import { View } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from './components/Chart'


export default function Expense() {
  return (
    <SafeAreaView>
      <Chart/>
    </SafeAreaView>
  )
}