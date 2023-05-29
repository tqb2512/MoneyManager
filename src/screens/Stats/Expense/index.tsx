import { Select, View } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from './components/Chart'
import { useState } from 'react'


export default function Expense() {
  return (
    <SafeAreaView>
      <Chart/>
    </SafeAreaView>
  )
}