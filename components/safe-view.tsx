import React, { PropsWithChildren } from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function SafeView({ children }: PropsWithChildren) {
  return (
    <SafeAreaView style={{
      flex: 1, zIndex: 2 
    }}>
      <View style={{ flex: 1 }}>
        {children}
      </View>
    </SafeAreaView>
  )
}

export default SafeView
