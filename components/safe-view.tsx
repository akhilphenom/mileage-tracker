import React, { PropsWithChildren } from 'react'
import { SafeAreaView, View } from 'react-native'

function SafeView({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={{ flex: 1, zIndex: 2 }}>
      <View style={{ flex: 1 }}>{children}</View>
    </SafeAreaView>
  )
}

export default SafeView
