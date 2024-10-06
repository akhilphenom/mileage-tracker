import { View, StyleSheet } from 'react-native'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import ImagePickerComponent, { ImagePickerRef } from '../image-picker/image-picker'
import { Picker } from '@react-native-picker/picker';
import { VehicleType } from '@/store/store';
import TextInput from '../text-input';

export interface VehicleActionsRef {
    getVehicleData: () => {
        imageBase64: string | null;
        vehicleName: string;
        selectedType: VehicleType | undefined;
        engineCC: string;
    };
}

const VehicleActions = forwardRef<VehicleActionsRef, {}>((props, ref) => {
    const types = [
        { label: '2 Wheeler', value: '2-wheeler' },
        { label: '3 Wheeler', value: '3-wheeler' },
        { label: '4 Wheeler', value: '4-wheeler' },
        { label: 'Other', value: 'other' },
    ]
    const imagePickerRef = useRef<ImagePickerRef>(null);
    const [selectedType, setSelectedType] = useState<VehicleType>()
    const vehicleName = useRef<string>('');
    const engineCC = useRef<string>('');

    useImperativeHandle(ref, () => ({
        getVehicleData: () => ({
            imageBase64: imagePickerRef.current?.getImageBase64() || null,
            vehicleName: vehicleName.current,
            selectedType,
            engineCC: engineCC.current,
        })
    }));

    return (
        <View style={styles.wrapper}>
            <ImagePickerComponent ref={imagePickerRef} />
            <View style={{
                gap: 10
            }}>
                <TextInput
                    placeholder="Vehicle Name *"
                    onChangeText={e => vehicleName.current = e}
                    style={styles.input}
                    showWarning={false}
                />
                <Picker
                    style={styles.pickerContainer}
                    selectedValue={selectedType}
                    onValueChange={(itemValue) =>
                        setSelectedType(itemValue)
                    }>
                    {
                        types.map(({ label, value }) => (
                            <Picker.Item label={label} value={value} key={value} />
                        ))
                    }
                </Picker>
                <TextInput
                    placeholder="Engine CC *"
                    onChangeText={e => engineCC.current = e}
                    style={styles.input}
                    showWarning={false}
                    textInputProps={{
                        keyboardType: 'number-pad'
                    }}
                />
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        gap: 10,
        justifyContent: 'flex-start'
    },
    input: {
        borderBottomWidth: 1,
        marginVertical: 10,
        padding: 8,
        backgroundColor: '#fff'
    },
    pickerContainer: {
        backgroundColor: '#fff'
    }
})

export default VehicleActions