import { StyleSheet, View } from 'react-native'
import React from 'react'
import { themeColor } from '@/constants/colors'
import Header from './header'

interface IProps {
  children: JSX.Element,
  showBackIcon: boolean,
  backHandler?: () => void
}

const CurvedContainer = ({
  children,
  showBackIcon,
  backHandler,
}: IProps) => {
  return (
    <View style={{
      backgroundColor: themeColor,
      flex: 1
    }}>
      <Header iconColor={'#c8c8c8'} showBackIcon={showBackIcon} backHandler={backHandler} />
      <View style={styles.container}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#efefef',
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  }
})

export default CurvedContainer