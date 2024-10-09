import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { themeColor } from '@/constants/colors';
import { useStatusBar } from '@/hooks/use-statusbar.hook';
import { StatusBar } from 'expo-status-bar';
import CurvedContainer from '@/components/curved-container';
import { ThemedText } from '@/components/themed-text';
import SafeView from '@/components/safe-view';
import { useLocalSearchParams, useRouter } from 'expo-router';
import ActionButtons from '@/components/action-buttons';
import RefuellingRecordActions, { RefuellingActionsRef, RefuellingFormValues } from '@/components/refuelling/actions';
import useStore, { IRefuelingRecord } from '@/store/store';

export type RefuellingMode = 'add' | 'edit'

interface IProps {
    mode: RefuellingMode
}

const ModifyRefuellingRecord = ({
    mode = 'add'
}: IProps) => {
    useStatusBar('default');
    const router = useRouter();
    
    const params = useLocalSearchParams();
    params?.mode && (mode = params.mode as RefuellingMode)

    const { 
        users, currentUserId,
        currentSelectedVehicle, currentRefuellingRecord, 
        setSelectedRefuellingRecord, addRefuelingRecord, editRefuelingRecord,
    } = useStore();

    const formInitValues = {
        date: new Date(),
        odometerStart: '',
        odometerEnd: '',
        fuelConsumed: '',
        fuelPrice: ''
    }
    const refuellingRecordRef = useRef<RefuellingActionsRef>(null);

    const [formValues, setFormValues] = useState<RefuellingFormValues>({ ...formInitValues })
    const [errors, setErrors] = useState<RefuellingFormValues>({ ...formInitValues })

    const validate = (data: RefuellingFormValues) => {
        const { date, odometerStart, odometerEnd, fuelConsumed, fuelPrice } = data;
        if (
            !date || Number(odometerStart)<0 || Number(odometerEnd)<0 
            || Number(odometerEnd)<Number(odometerStart) || Number(fuelConsumed)<=0 || Number(fuelPrice)<0
        ) {
            return false;
        }
        return true;
    }

    const backHandler = () => {
        setSelectedRefuellingRecord(null);
        router.setParams({ mode: null });
        router.back();
    }

    const onCancelHandler = () => {
        backHandler();
    }

    const onSaveHandler = async () => {
        const data = refuellingRecordRef.current?.getRefuellingRecordData()!;
        const { date, odometerStart, odometerEnd, fuelConsumed, fuelPrice } = data
        setFormValues({
            date,
            fuelConsumed: String(fuelConsumed),
            fuelPrice: String(fuelPrice),
            odometerStart: String(odometerStart),
            odometerEnd: String(odometerEnd),
        })
        
        if(!validate(data)) {
            //pending alert
            return;
        }
        
        const payload: Omit<IRefuelingRecord, '_id'> = {
            date,
            odometerStart: Number(odometerStart),
            odometerEnd: Number(odometerEnd),
            fuelConsumed: Number(fuelConsumed),
            fuelPrice: Number(fuelPrice),
        }

        if(mode == 'add') {
            addRefuelingRecord(currentSelectedVehicle!, payload)
        } else if(mode == 'edit') {
            editRefuelingRecord(currentSelectedVehicle!, currentRefuellingRecord!,payload)
        } else { }

        backHandler();
    }

    useEffect(() => {
        if(currentRefuellingRecord) {
            const { vehicles } = users[currentUserId!];
            const { refuelingRecords } = vehicles.find(({ _id }) => _id == currentSelectedVehicle)!;
            const { date, odometerStart, odometerEnd, fuelConsumed, fuelPrice } = refuelingRecords.find(({ _id}) => _id == currentRefuellingRecord)!
            setFormValues({
                date,
                fuelConsumed: String(fuelConsumed),
                fuelPrice: String(fuelPrice),
                odometerStart: String(odometerStart),
                odometerEnd: String(odometerEnd),
            })
        }
    }, [currentRefuellingRecord])

    return (
        <>
            <StatusBar backgroundColor={themeColor} />
            <SafeView>
                <CurvedContainer backHandler={backHandler} showBackIcon={true}>
                    <KeyboardAvoidingView style={{flex: 1}}>
                        <View style={styles.innerContainer}>
                            <ThemedText
                                style={{
                                    textAlign: 'center',
                                    fontSize: 22
                                }}>
                                {mode == 'add'? 'Add': 'Edit'} Refuelling Record
                            </ThemedText>
                            <View style={styles.refuellingInputsContainer}>
                                <RefuellingRecordActions mode={mode} ref={refuellingRecordRef} formValues={formValues} errors={errors}/>
                            </View>
                        </View>
                        <ActionButtons 
                        onSaveHandler={onSaveHandler}
                        onCancelHandler={onCancelHandler}
                        />
                    </KeyboardAvoidingView>
                </CurvedContainer>
            </SafeView>
        </>
    )
}

const styles = StyleSheet.create({
    innerContainer: {
        marginTop: 30,
        marginHorizontal: 10,
        flex: 1,
        gap: 20,
    },
    refuellingInputsContainer: {
        flex: 1,
        height: 'auto',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }
})

export default ModifyRefuellingRecord