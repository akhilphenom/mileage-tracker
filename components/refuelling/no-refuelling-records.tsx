import { View, StyleSheet } from 'react-native'
import React from 'react'
import Clouds from '../svg/clouds'
import { ThemedText } from '../themed-text'
import HoveringFab from '../hovering-fab'
import PopOver from './popover'

const NoRefuellingRecords = () => {
    return (
        <View style={styles.container}>
            <Clouds/>
            <View style={styles.textContainer}>
                <ThemedText type='subtitle' style={[
                    styles.textStyle
                ]}>
                    No refuelling records yet!
                </ThemedText>
                <ThemedText style={[
                    styles.textStyle,
                    { paddingHorizontal: 50 }
                ]}>
                    Add a record using the + button below to begin your wealthcare journey
                </ThemedText>
            </View>
            <PopOver/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    textContainer: {
        margin: 10,
        gap: 10
    },
    textStyle: {
        textAlign: 'center'
    }
});

export default NoRefuellingRecords