import { View, StyleSheet, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { themeColor } from '@/constants/colors';
import { useStatusBar } from '@/hooks/use-statusbar.hook';
import { StatusBar } from 'expo-status-bar';
import CurvedContainer from '@/components/curved-container';
import { ThemedText } from '@/components/themed-text';
import SafeView from '@/components/safe-view';
import { useRouter } from 'expo-router';
import VehicleActions, { VehicleActionsRef } from '../../components/vehicle/actions'
import { useVehicleCreation } from '@/hooks/use-vehicle-creation.hook';
import ActionButtons from '@/components/action-buttons';

const AddVehicle = () => {
    useStatusBar('default');

    const router = useRouter();
    const { 
        handleCancelVehicleCreation, 
        handleStartVehicleCreation,
        handleUpdateVehicle
    } = useVehicleCreation();
    const vehicleActions = useRef<VehicleActionsRef>(null);

    const backHandler = () => {
        handleCancelVehicleCreation();
        router.back();
    }

    const onCancelHandler = () => {
        backHandler();
    }

    const onSaveHandler = async () => {
        const { imageBase64, engineCC, selectedType, vehicleName } = vehicleActions.current!.getVehicleData()
        handleUpdateVehicle({
            engineCC: Number(engineCC), 
            type: selectedType,
            name: vehicleName,
            imageUrl: imageBase64
        })
        if(Number(engineCC)>0 && selectedType?.length && vehicleName.trim().length) {
            router.push('bike-confetti')
        }
    }

    useEffect(() => {
        handleStartVehicleCreation()
    }, [])

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
                                Add Vehicle
                            </ThemedText>
                            <VehicleActions ref={vehicleActions}/>
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
    footer: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        gap: 20
    }
})

export default AddVehicle