import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Monthly from './components/Monthly'

const MonthlyScreen = () => {
  return (
    <Monthly month='5' year='2003' total='135' totalIncome='69' totalExpense='35' />
  )
}

export default MonthlyScreen

const styles = StyleSheet.create({})