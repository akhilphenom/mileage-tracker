import VehicleStats from '@/components/performance/vehicle-stats';
import NoVehicles from '@/components/vehicle/no-vehicle';
import useStore from '@/store/store';
import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

function Performance() {
  const { users, currentUserId, currentSelectedVehicle, setSelectedVehicle } = useStore()
  const { vehicles } = users[currentUserId!];

  useEffect(() => {
    if (!currentSelectedVehicle && vehicles.length) {
      setSelectedVehicle(vehicles[0]._id)
    }
  }, [currentSelectedVehicle, vehicles])

  const ConditionalRender = () => {
    if (!vehicles?.length) {
      return <NoVehicles />;
    } else {
      return <VehicleStats />
    }
  }

  return (
    <View style={styles.container}>
      <ConditionalRender />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start' 
  }
});

export default Performance