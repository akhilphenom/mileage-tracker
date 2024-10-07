import PopOver from '@/components/vehicle/add-popover';
import VehicleCardItem from '@/components/vehicle/card-item';
import NoVehicles from '@/components/vehicle/no-vehicle';
import useStore, { IRefuelingRecord } from '@/store/store';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

export default function Refuelling() {

  const conditionalRender = () => {
    const { users, currentUserId, currentSelectedVehicle } = useStore()
    const { vehicles } = users[currentUserId!];
    const [refuellingRecords, setRefuellingRecords] = useState<IRefuelingRecord[]>([]);

    useEffect(() => {
      if(currentSelectedVehicle) {
        const vehicle = vehicles.find(({_id}) => currentSelectedVehicle)
        console.log(vehicle)
        setRefuellingRecords(vehicle?.refuelingRecords!)
      }
    }, [currentSelectedVehicle])

    if (!vehicles.length) {
      return <NoVehicles />;
    } else if (!currentSelectedVehicle) {
      
    } else {
      return (
        <>
          <FlatList
            data={[...vehicles].reverse()}
            style={{ flex: 1 }}
            renderItem={({ item }) => (
              <VehicleCardItem {...item} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 5 }} />}
          />
          <PopOver />
        </>
      )
    }  
  }

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      {conditionalRender()}
    </View>
  )
}

const styles = StyleSheet.create({

});
