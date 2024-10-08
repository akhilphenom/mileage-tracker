import NoVehicles from '@/components/vehicle/no-vehicle'
import useStore from '@/store/store'
import VehicleCardItem from '../../../components/vehicle/card-item'
import PopOver from '../../../components/vehicle/add-popover'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

function Vehicles() {
  const ConditionalRender = () => {
    const { users, currentUserId } = useStore()
    const { vehicles } = users[currentUserId!];
    
    if (!vehicles.length) {
      return <NoVehicles />;
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={[...vehicles].reverse()}
            contentContainerStyle={styles.flatList}
            renderItem={({ item }) => (
              <VehicleCardItem {...item} />
            )}
          />
          <PopOver />
        </View>
      )
    }
  }
  
  return (
    <View style={{ flex: 1, justifyContent: 'flex-start' }}>
      <ConditionalRender/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    marginVertical: 10
  },
  flatList: {
    flex: 1
  }
})

export default Vehicles
