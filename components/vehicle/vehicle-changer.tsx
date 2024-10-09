import { shadow } from "@/constants/styles";
import useStore, { IVehicle } from "@/store/store";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import { View, StyleSheet } from "react-native";

export const VehicleChanger = () => {
    const { users, currentUserId, currentSelectedVehicle, setSelectedVehicle: setCurrentSelectedVehicle } = useStore()
    const { vehicles } = users[currentUserId!];
    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle['_id']>(currentSelectedVehicle ?? vehicles[0]?._id);
    const pickerValues = vehicles.map(item => ({
        label: item.name,
        value: item._id
    }))

    const onVehicleChange = (vehicle: IVehicle['_id']) => {
        setSelectedVehicle(vehicle)
        setCurrentSelectedVehicle(vehicle)
    }
    
    return (
        <View style={styles.pickerContainer}>
            <Picker
                selectedValue={selectedVehicle}
                onValueChange={onVehicleChange}>
                {
                    pickerValues.map(({ label, value }) => (
                        <Picker.Item label={label} value={value} key={value} />
                    ))
                }
            </Picker>
        </View>
    )
}


const styles = StyleSheet.create({
    pickerContainer: {
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'white',
        ...shadow
    },
});