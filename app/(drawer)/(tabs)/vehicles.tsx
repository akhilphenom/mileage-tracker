import NoVehicles from '@/components/vehicle/no-vehicle'
import useStore from '@/store/store'
import VehicleCardItem from '../../../components/vehicle/card-item'
import PopOver from '../../../components/vehicle/add-popover'
import React from 'react'
import { FlatList, View } from 'react-native'

function Vehicles() {
  const conditionalRender = () => {
    const { users, currentUserId } = useStore()
    const { vehicles } = users[currentUserId!];
    if (!vehicles.length) {
      return <NoVehicles />;
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

export default Vehicles
