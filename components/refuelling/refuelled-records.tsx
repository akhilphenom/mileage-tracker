import { View, StyleSheet } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import PopOver from './popover'
import useStore, { IRefuelingRecord, IVehicle } from '@/store/store'
import { ThemedText } from '../themed-text'
import { Picker } from '@react-native-picker/picker'
import { shadow } from '@/constants/styles'
import NoRefuellingRecords from './no-refuelling-records'
import RefuellingHistory from './refuelling-history'
import moment from 'moment'

type DateFilter = 'all-time' | 30 | 45 | 60

const RefuelledRecords = () => {
    const { users, currentUserId, currentSelectedVehicle, setSelectedVehicle: setCurrentSelectedVehicle } = useStore()
    const { vehicles } = users[currentUserId!];
    const [refuellingRecords, setRefuellingRecords] = useState<IRefuelingRecord[]>([]);

    const RefuellingRecords = memo(({ records }: { records: IRefuelingRecord[] }) => {
        const [filter, setFilter] = useState<DateFilter>(45);
        const filters: {
            label: string,
            value: DateFilter
        }[] = [
            { label: '30 days', value: 30 },
            { label: '45 days', value: 45 },
            { label: '60 days', value: 60 },
            { label: 'All time', value: 'all-time' },
        ]

        const filterDatesLastNDays = (data: IRefuelingRecord[], n: number) => {
            const today = moment();
            const nDaysAgo = moment().subtract(n, 'days');
        
            return data.filter(({ date }) => {
                const momentDate = moment(date);
                return momentDate.isBetween(nDaysAgo, today, undefined, '[]');
            }).sort((a, b) => moment(b.date).diff(moment(a.date)));
        };

        const onFilterChange = (value: DateFilter) => {
            setFilter(value);
            if(isFinite(Number(value)) && typeof Number(value) == 'number') {
                setRefuellingRecords(filterDatesLastNDays(records, Number(value)))
            } else {
                setRefuellingRecords([...records].sort((a, b) => moment(b.date).diff(moment(a.date))))
            }
        }

        const [refuellingRecords, setRefuellingRecords] = useState<IRefuelingRecord[]>(filterDatesLastNDays(records, 45));

        if(!refuellingRecords.length) {
            return <NoRefuellingRecords/>
        }
        
        return (
            <View style={styles.container}>
                <ThemedText 
                type='subtitle'
                style={{
                    textAlign: 'center',
                    marginTop: 20
                }}>
                    Date Range
                </ThemedText>
                <Picker
                selectedValue={filter}
                onValueChange={onFilterChange}
                >
                    {
                        filters.map(({ label, value }) => (
                            <Picker.Item label={label} value={value} key={value} />
                        ))
                    }
                </Picker>
                <View style={styles.historyContainer}>
                    <RefuellingHistory refuellingRecords={refuellingRecords}/>
                </View>
            </View>
        )
    })
    
    const VehicleChanger = () => {
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

    useEffect(() => {
        const vehicle = vehicles.find(({ _id }) => currentSelectedVehicle == _id)!
        setRefuellingRecords(vehicle.refuelingRecords!)
    }, [currentSelectedVehicle])

    return (
        <View style={{ flex: 1 }}>
            <VehicleChanger/>
            <RefuellingRecords records={refuellingRecords}/>
            <PopOver />
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
    container: {
        flex: 1,
        padding: 20
    },
    daysFilter: {
        width: 200
    },
    historyContainer: {
        flex: 1,
        marginHorizontal: 4,
        marginVertical: 6
    }
});


export default RefuelledRecords