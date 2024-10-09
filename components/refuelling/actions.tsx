import { View, StyleSheet } from 'react-native'
import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Picker } from '@react-native-picker/picker';
import useStore, { IRefuelingRecord, IVehicle, VehicleType } from '@/store/store';
import TextInput from '../text-input';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { ThemedText } from '../themed-text';

export type RefuellingFormValues = {
    date: Date;
    odometerStart: string;
    odometerEnd: string;
    fuelConsumed: string;
    fuelPrice: string;
}

export interface RefuellingActionsRef {
    getRefuellingRecordData: () => RefuellingFormValues;
}

const RefuellingRecordActions = forwardRef((
    { formValues, errors, mode }: { formValues: RefuellingFormValues, errors: RefuellingFormValues, mode: 'add' | 'edit' },
    ref: React.ForwardedRef<RefuellingActionsRef>
) => {
    const { users, currentUserId, currentSelectedVehicle, setSelectedVehicle: setCurrentSelectedVehicle } = useStore()
    const { vehicles } = users[currentUserId!];

    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle['_id']>(currentSelectedVehicle ?? vehicles[0]?._id);
    const [currentVehicleName, setCurrentVehicleName] = useState<string | null>(null);
    const pickerValues = vehicles.map(item => ({
        label: item.name,
        value: item._id
    }))

    const [date, setDate] = useState<Date>(formValues.date);
    const [odometerStart, setOdometerStart] = useState(formValues.odometerStart);
    const [odometerEnd, setOdometerEnd] = useState(formValues.odometerEnd);
    const [fuelConsumed, setFuelConsumed] = useState(formValues.fuelConsumed);
    const [fuelPrice, setFuelPrice] = useState(formValues.fuelPrice);

    const onDateChange = (event: DateTimePickerEvent, date?: Date | undefined) => {
        const { type, nativeEvent: { timestamp, utcOffset } } = event;
        setDate(date!)
    }

    const onVehicleChange = (vehicle: IVehicle['_id']) => {
        setSelectedVehicle(vehicle)
        setCurrentSelectedVehicle(vehicle)
    }

    useImperativeHandle(ref, () => ({
        getRefuellingRecordData: () => ({
            date,
            odometerStart,
            odometerEnd,
            fuelConsumed,
            fuelPrice
        })
    }));

    useEffect(() => {
        if(currentSelectedVehicle) {
            const { name } = vehicles.find(({ _id }) => currentSelectedVehicle == _id)!
            setCurrentVehicleName(name!)
        }
    }, [currentSelectedVehicle])

    useEffect(() => {
        if(!currentSelectedVehicle) {
            setCurrentSelectedVehicle(vehicles[0]._id)
        }
    }, [])

    return (
        <View style={styles.wrapper}>
            <View style={styles.row}>
                <ThemedText style={{ marginVertical: 'auto', flex: 1, textAlign: 'right' }}>
                    Vehicle Name:
                </ThemedText>
                {
                    mode == 'add' ?
                    <Picker
                        enabled={mode == 'add'} //didn't work in ios
                        style={styles.pickerContainer}
                        selectedValue={selectedVehicle}
                        onValueChange={onVehicleChange}>
                        {
                            pickerValues.map(({ label, value }) => (
                                <Picker.Item label={label} value={value} key={value} />
                            ))
                        }
                    </Picker> : 
                    <View style={{flex: 1}}>
                        <ThemedText>{currentVehicleName}</ThemedText>
                    </View>
                }
            </View>
            <View style={styles.row}>
                <ThemedText style={{
                    flex: 1,
                    textAlign: 'right'
                }}>
                    Refuelling Date:
                </ThemedText>
                <RNDateTimePicker style={{ flex: 1 }} onChange={onDateChange} value={date} />
            </View>
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <ThemedText>Odometer Details</ThemedText>
                    <View style={{
                        gap: 10, 
                        flexDirection: 'row'
                    }}>
                        <TextInput
                            placeholder="Start Reading"
                            value={odometerStart}
                            onChangeText={setOdometerStart}
                            style={styles.input}
                            showWarning={false}
                            textInputProps={{
                                keyboardType: 'number-pad'
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                        />
                        <TextInput
                            placeholder="End Reading"
                            value={odometerEnd}
                            onChangeText={setOdometerEnd}
                            style={styles.input}
                            showWarning={false}
                            textInputProps={{
                                keyboardType: 'number-pad'
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <ThemedText>Fuel Details</ThemedText>
                    <View style={{
                        gap: 10, 
                        flexDirection: 'row',
                    }}>
                        <TextInput
                            placeholder="Consumed (in L)"
                            value={fuelConsumed}
                            onChangeText={setFuelConsumed}
                            style={styles.input}
                            showWarning={false}
                            textInputProps={{
                                keyboardType: 'number-pad'
                            }}
                            containerStyle={{
                                flex: 1
                            }}
                        />
                        <TextInput
                            placeholder="Price (in $)"
                            value={fuelPrice}
                            onChangeText={setFuelPrice}
                            style={styles.input}
                            showWarning={false}
                            textInputProps={{
                                keyboardType: 'number-pad'
                            }}
                            containerStyle={{ flex: 1 }}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    wrapper: {
        width: '100%',
        flex: 1,
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column'
    },
    inputContainer: {
        gap: 10,
        width: '100%'
    },
    input: {
        borderBottomWidth: 1,
        marginVertical: 10,
        padding: 8,
        backgroundColor: '#fff'
    },
    pickerContainer: {
        width: 200
    },
    column: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 15
    },
    container: {
        flex: 1,
        alignItems: 'flex-start',
        width: '100%',
        padding: 20,
        gap: 20
    }
})

export default RefuellingRecordActions