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
                    <ThemedText type='subtitle'>
                        Money spent on Fuel
                    </ThemedText>
                    <Expenses width={width} height={280}/>
                </View>
                <View style={styles.scrollViewItem}>
                    <ThemedText type='subtitle'>
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
        flex: 1,
        paddingHorizontal: 30,
        width: '100%',
    },
    scrollViewItem: {
        width: '100%',
        gap: 10,
        alignItems: 'center'
    }
})

export default VehicleStats