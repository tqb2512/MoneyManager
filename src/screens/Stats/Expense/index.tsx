import { Select, View } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from './components/Chart'
import { useState } from 'react'
import { ExpenseStatsProp } from '../../../navigation/types'

function ExpenseScreen(props: ExpenseStatsProp) {
  const { navigation } = props;
  return (
    <SafeAreaView>
      <Chart/>
    </SafeAreaView>
  )
}

export default React.memo(ExpenseScreen);