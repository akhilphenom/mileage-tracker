import NoRefuellingRecords from '@/components/refuelling/no-refuelling-records';
import RefuelledRecords from '@/components/refuelling/refuelled-records';
import NoVehicles from '@/components/vehicle/no-vehicle';
import useStore from '@/store/store';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Refuelling() {

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
    } else if (!currentSelectedVehicle) {
      return <NoRefuellingRecords />
    } else {
      return <RefuelledRecords />
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
