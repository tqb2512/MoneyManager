import { View } from 'native-base'
import React from 'react'
import { Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Chart from './components/Chart'
import { IncomeStatsProp } from '../../../navigation/types'


function IncomeScreen(props: IncomeStatsProp) {
  const { navigation } = props;
  return (
    <SafeAreaView>
      <Chart/>
    </SafeAreaView>
  )
}

export default React.memo(IncomeScreen);