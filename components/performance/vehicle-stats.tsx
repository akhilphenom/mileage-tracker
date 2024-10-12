import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import React from 'react'
import { ThemedText } from '../themed-text'
import { VehicleChanger } from '../vehicle/vehicle-changer'
import VehicleMileagePerformance from './mileage'
import Expenses from './expenses'
import useStore from '@/store/store'

const VehicleStats = () => {
    const { width, height } = Dimensions.get('screen')
    const { users, currentUserId, currentSelectedVehicle } = useStore()
    const { vehicles } = users[currentUserId!];

    return (
        <View style={styles.container}>
            <ThemedText type='subtitle'>
                Choose the Vehicle
            </ThemedText>
            <VehicleChanger/>
            <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            >
                <View style={styles.scrollViewItem}>
                    <ThemedText type='subtitle' style={styles.textStyle}>
                        Money spent on Fuel
                    </ThemedText>
                    <Expenses width={width-60} height={200}/>
                </View>
                <View style={{height: 30}}></View>
                <View style={styles.scrollViewItem}>
                    <ThemedText type='subtitle' style={styles.textStyle}>
                        Vehicle Mileage Performance
                    </ThemedText>
                    <VehicleMileagePerformance width={width} height={280}/>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 20,
        alignItems: 'center',
        gap: 20,
    },
    scrollView: {
        width: '100%',
    },
    scrollViewItem: {
        width: '100%',
        gap: 10,
        alignItems: 'center',
    },
    textStyle: {
        width: '100%',
        textAlign: 'left'
    }
})

export default VehicleStats